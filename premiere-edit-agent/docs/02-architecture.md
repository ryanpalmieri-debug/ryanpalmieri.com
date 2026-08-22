# 02 — System Architecture

## 1. Components

```
┌────────────────────────────── macOS ──────────────────────────────┐
│                                                                   │
│  ┌───────────── Adobe Premiere Pro (25.2+) ─────────────┐         │
│  │                                                      │         │
│  │   UXP Panel  "Edit Agent"  (TypeScript)              │         │
│  │   • pipeline UI: start run, per-stage status, review │         │
│  │   • executes ALL in-Premiere operations:             │         │
│  │     bins / import / transcription / sequence         │         │
│  │     building / markers / OTIO snapshot export        │         │
│  │   • startup capability probe                         │         │
│  └───────────────▲──────────────────────────────────────┘         │
│                  │ localhost WebSocket (JSON-RPC style)           │
│  ┌───────────────▼──────────────────────────────────────┐         │
│  │   Companion Service  (Python 3.11+, FastAPI)         │         │
│  │   • pipeline orchestrator & job queue                │         │
│  │   • media inventory (ffprobe), non-destructive       │         │
│  │   • sync engine (timecode + waveform correlation)    │         │
│  │   • whisper fallback transcription                   │         │
│  │   • editorial analysis (Anthropic API)               │         │
│  │   • slate rendering, paper cut generation            │         │
│  │   • workspace/data store (_EditAgent/ on disk)       │         │
│  │   • learning: snapshot store, diff engine (future)   │         │
│  └───────────────▲──────────────────────────────────────┘         │
│                  │ HTTPS                                          │
└──────────────────┼────────────────────────────────────────────────┘
                   ▼
             Anthropic API (editorial analysis only —
             media never leaves the machine; only transcripts
             and project materials are sent)
```

**Division of labor rule:** the panel is a *thin executor* for Premiere operations;
the companion is the *brain*. The companion owns pipeline state, sequencing decisions,
and all data. The panel receives small, explicit commands ("create these bins",
"place clip X at t with in/out", "export OTIO of sequence S") and reports results.
This keeps every stage restartable and testable without Premiere where possible.

Why Python for the companion: the audio DSP (numpy/scipy correlation), Whisper
ecosystem (faster-whisper), and ffmpeg tooling are strongest there; the Anthropic
Python SDK is first-class. The panel must be TypeScript regardless (UXP). Packaging
for non-developer install (bundled runtime + ffmpeg) is a roadmap phase.

## 2. Communication protocol

- Companion runs a localhost server (fixed port, configurable). Panel connects out
  via WebSocket (UXP manifest network permission); no inbound connection to Premiere.
- Message shape: `{id, kind: "command"|"result"|"event"|"progress", stage, payload}`.
- The panel advertises its **capability matrix** on connect (results of feature-probing
  the UXP API). The companion gates stages on required capabilities.
- If the companion isn't running, the panel shows a one-click "Start companion" hint
  (open the app); auto-start via login item is a packaging-phase feature.

## 3. Pipeline stages as independent modules

Each stage is a module with declared **inputs, outputs, and invalidation keys**.
Outputs are versioned artifacts in the workspace (see 03-data-model). A stage re-runs
only when explicitly requested or when an upstream artifact it consumed has changed
(content hashes, not timestamps). This is what makes *Regenerate Selects* /
*Regenerate Rough Cut* / *Reanalyze Transcript* cheap: they re-run one module against
cached upstream artifacts.

| # | Stage | Runs in | Consumes → Produces |
|---|---|---|---|
| 1 | **Ingest** | companion | source drive (read-only) → `inventory.json` (every file: probe data, hashes, classification video/audio/other, embedded TC, BWF metadata) |
| 2 | **Organize** | panel | inventory → Premiere bin structure per 04-editorial-spec; media imported *in place* (originals never moved/renamed; optional managed-copy mode later); `organize.json` maps file → projectItem |
| 3 | **Sync** | companion (math) + panel (placement) | inventory → `sync.json` (camera↔WAV pairs, offsets, method, confidence, drift); panel builds one `01_STRINGOUT_<SUBJECT>_v###` per interview: video + muted scratch on A1, production audio at offset on A2+. Failures → REVIEW bin + report, never guessed |
| 4 | **Transcribe** | panel (Premiere STT) or companion (Whisper fallback) | stringout inputs → normalized Adobe-format `transcript_<clip>.json` per production WAV, imported back into Premiere either way; speaker roles resolved in stage 5 |
| 5 | **Analyze** | companion (Claude) | transcripts + project materials (script/outline/questions/criteria) → `analysis.json`: speaker roles, per-passage topic/section mapping, candidate selects with scores per standing criteria, reasons, alternates |
| 6 | **Selects build** | companion (slates, ordering) + panel (assembly) | analysis → `selects_edl.json` → `02_SELECTS_MASTER_v###` with section slates, handles, markers; plus `papercut.md`/`.pdf` |
| 7 | **Rough cut** | companion (Claude, two-pass) + panel (assembly) | analysis + selects + format template → `roughcut_edl.json` → `03_ROUGHCUT_<FORMAT>_v###`; snapshot exported immediately (learning baseline) |

Default workflow is **fully automatic** (stages 1→7 chained); every stage is also
individually invokable from the panel. Optional checkpoint mode is a post-V1 flag on
the orchestrator, not a structural change.

### Stage detail notes

**Sync (3).** Hierarchy per spec: (a) trustworthy matching timecode — both sides carry
TC and the overlap sanity-checks against a quick waveform correlation; (b) waveform —
GCC-PHAT on downsampled mono, confidence = peak prominence, head/tail windows to detect
drift; (c) slate/clap assist — transient detection narrows the search window when
correlation is ambiguous; (d) below threshold → flagged. Every accepted sync stores
method + confidence; every rejected one stores why.

**Transcribe (4).** The **production WAV** is transcribed (best audio), not the camera
clip and not the sequence (unsupported). Transcript timebase = WAV time; the sync
offset maps any word to camera-clip time and to stringout-sequence time. Premiere STT
is attempted first (`Transcript.transcribeClipProjectItem`, awaited per clip, queued
in batches); if the capability probe or the Phase-1 spike disqualifies it, the
companion transcribes with faster-whisper and imports the same JSON format so
Premiere's Text panel stays populated.

**Analyze (5).** Claude receives: the normalized transcript(s) (word timing + filler
tags + confidence preserved), the project materials, the standing criteria, the
project type, and (future) active learned preferences for that format. It returns
structured JSON only (schema-enforced): speaker role assignments with evidence;
passages segmented into complete thoughts; per-passage scores on the standing
criteria; section/topic assignment; select/alternate/reject status with reasons.
Long interviews are chunked with overlap and then reconciled in a merge pass;
prompt caching keeps the transcript prefix cheap across selects and rough-cut passes.

**Selects build (6).** Deterministic code (not the model) converts chosen passages to
timeline events: word timestamps → source ranges; handles 3–5 s pre / ~2 s post,
clamped to media bounds and trimmed against neighboring selects; section ordering per
the project materials; slates rendered by the companion (ffmpeg drawtext, 5 s,
`SECTION — DESCRIPTION`) and imported as ordinary media; markers carry topic, speaker,
quote, source clip + TC, rank/confidence, reason.

**Rough cut (7).** Two model passes, then deterministic assembly:
*Pass A — structure*: choose/adapt the format template (04-editorial-spec), assign
beats, pick opening and ending candidates, set a duration budget per beat.
*Pass B — sequencing*: per beat, order passages, choose between alternate takes,
specify trims at word granularity, and mark pause decisions (keep an emotional pause,
cut hesitation/filler/restated setup) using the word-gap and filler-tag data.
The output is a `roughcut_edl.json` of intent — every cut carries a `rationale` and a
`beat` reference (this is what the learning diff later attributes changes to). The
panel (or the FCPXML fallback builder) then assembles it mechanically. Dialogue only
in V1: no B-roll, music, graphics, or placeholders for them.

## 4. Regeneration & versioning

- Generated sequences are never overwritten: regeneration produces `v002`, `v003`…
  and never touches sequences the agent didn't create.
- `Regenerate Selects` re-runs 5(partially)+6 with edited criteria; `Regenerate Rough
  Cut` re-runs 7 (optionally with a different format); `Reanalyze Transcript` re-runs 5.
  None of them re-ingest, re-sync, or re-transcribe unless those artifacts are stale.
- Every artifact records the versions/hashes of its inputs (see 03-data-model
  provenance block), so staleness is decidable and explainable in the UI.

## 5. Editorial learning hooks (V1 ships the data, not the feature)

V1 responsibilities — cheap now, priceless later:

1. **Snapshot on generate**: immediately after building any sequence, the panel
   exports OTIO + the agent stores the generating EDL (intent, rationales, transcript
   anchors). Snapshot = `(otio, edl, provenance)`.
2. **Snapshot on demand**: a panel button ("Checkpoint my cut") and a project-close
   hook export OTIO of agent-created sequences' descendants — capturing the editor's
   revised and final states. Sequences are matched by stored sequence GUIDs.
3. **Anchor everything to transcript coordinates** (clip GUID + word range), not just
   timecode, so future diffs can say *what content* was trimmed, not just how many frames.

The diff engine, edit-event extraction, and preference promotion are specified in
03-data-model §5–6 and scheduled in the roadmap. Two hard rules from the spec are
architectural invariants: a single correction never changes global behavior, and
preferences persist only via repeated observed patterns or explicit instruction.

## 6. Claude API usage

- **Model**: `claude-opus-5` for all editorial analysis (adaptive thinking on;
  effort raised for rough-cut structure passes). Model choice is a config value —
  the analysis provider is modular per the requirements.
- **Structured outputs** (`output_config.format` / `messages.parse`) for every
  machine-consumed response — selects and EDLs must validate against schema, with
  automatic retry on mismatch.
- **Prompt caching** on the transcript + project-materials prefix: selects, rough cut,
  and regenerations reuse the same cached prefix; criteria/instructions go after the
  cache breakpoint.
- **Streaming** for long passes so the panel can show live progress.
- Only text leaves the machine: transcripts, project materials, criteria. Never media.
  A per-project "local only" flag can disable cloud analysis entirely (degrades to
  manual selects tooling); transcription is already local-first.

## 7. Isolation & future extraction

Self-contained under `/premiere-edit-agent`: `panel/` (UXP TypeScript app),
`companion/` (Python package with its own `pyproject.toml`), `docs/`, `schemas/`
(shared JSON Schemas — the contract between panel, companion, and Claude prompts).
Nothing imports from, or is imported by, the surrounding website repo; extraction to
a standalone repo is a `git mv`.
