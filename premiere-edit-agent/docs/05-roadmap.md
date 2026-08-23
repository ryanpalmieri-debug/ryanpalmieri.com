# 05 — Roadmap

Phases are ordered so that the riskiest unknowns are retired first and every phase
ends with something usable in a real edit. Do not start Phase 2+ implementation
hardening until the Phase 1 spikes pass or their fallbacks are invoked.

## Phase 0 — Design (this document set) ✅

Feasibility research, architecture, data model, editorial spec.

## Phase 1 — Environment spikes (on the target Mac, ~days) — in progress

Status 2026-08-23: capability probe ran on Premiere 26.3.0 (26/27 APIs present;
`Transcript.transcribeClipProjectItem` missing — member dump pending). Sync spike
**passed end-to-end**: TC pairing validated against real multicams and a generated
FCPXML imported cleanly, creating all 18 synced sequences with media auto-linked.
Remaining: transcription member dump (probe v0.2 button 1), assembly spike,
OTIO snapshot spike.

Small throwaway UXP panel + scripts proving on the actual installed Premiere version:

1. **Capability probe**: enumerate the `ppro` API surface; confirm every call in the
   feasibility matrix; record exact Premiere/UXP versions. (Also finally answers the
   open "exact Premiere version" question.)
2. **Transcription spike**: `Transcript.transcribeClipProjectItem` on a real FX3 clip
   + production WAV — options, language, speaker output, queueing, export JSON shape.
   *Fallback trigger*: if steering/quality is inadequate → commit to faster-whisper path.
3. **Assembly spike**: build a 200-event sequence via `SequenceEditor` transactions —
   correctness, speed, undo behavior. *Fallback trigger*: instability → FCPXML builder
   becomes the primary assembly path.
4. **Snapshot spike**: `exportAsOpenTimelineIO` round-trip on a hand-edited sequence;
   verify track items, source refs, and timing survive with enough fidelity to diff.
5. **Companion sync spike**: waveform correlation on real FX3 scratch vs. WAV pairs;
   tune confidence threshold on genuine material.

Deliverable: updated feasibility matrix with pass/fail per API + chosen paths.

## Phase 2 — Foundation + Function 1 (Ingest/Organize/Sync/Transcribe)

- Workspace + schemas; companion service skeleton (FastAPI, job queue, WebSocket);
  panel skeleton (connect, capability matrix, stage status UI).
- Ingest (ffprobe inventory, hashing, grouping heuristics).
- Organize (bin structure, in-place import, labels).
- Sync engine (TC → waveform → slate-assist → flag) + stringout builder.
- Transcription (Premiere-first, Whisper fallback, normalized JSON, re-import).
- **Usable milestone**: point at an SSD, get organized project + synced stringouts +
  transcripts in the Text panel.

## Phase 3 — Function 2 (Analyze + Selects)

- Materials intake (script/outline/questions; PDF/docx/txt parsing).
- Claude analysis pipeline (chunking, caching, structured outputs, speaker roles).
- Selects EDL builder, slate renderer, master selects assembly, markers, paper cut.
- Panel affordances: edit criteria, fix speaker roles, Regenerate Selects.
- **Usable milestone**: `02_SELECTS_MASTER_v001` + paper cut from real criteria.

## Phase 4 — Function 3 (Rough Cut)

- Format templates; two-pass structure/sequencing prompts; pause-decision engine on
  word gaps + filler tags; EDL assembly (chosen builder from Phase 1).
- Full-pipeline orchestration (one-click run) + Regenerate Rough Cut.
- Snapshot-on-generate (learning baseline) ships here at the latest.
- **Usable milestone**: a genuinely watchable first pass in each core format.

## Phase 5 — Learning capture (read-only learning)

- Checkpoint capture (panel button + project-close hook), snapshot store.
- Diff engine → edit events; review UI showing "what you changed vs. the AI".
- No behavior change yet — observation only, building the corpus.

## Phase 6 — Learning application

- Pattern aggregation + promotion rules (thresholds, per-format scoping).
- Preferences file + panel review/veto UI; "remember this" explicit instructions.
- Preference injection into analysis/rough-cut prompts with provenance tracking.

## Phase 7 — Packaging & polish

- Signed companion app bundle (embedded Python runtime + ffmpeg), login-item
  auto-start, panel distribution, onboarding flow, checkpoint-mode option,
  managed-copy ingest option, multicam source sequences if the API has matured.

## Deferred (explicitly out of V1)

B-roll and placeholders, music, graphics/titles/lower thirds, multicam source
sequences, cloud transcription providers, collaborative/multi-editor learning.
