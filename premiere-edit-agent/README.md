# Premiere Edit Agent

An AI assistant editor for Adobe Premiere Pro, built for documentary and commercial
interview workflows. It automates the pipeline from raw media to a first editorial pass:

```
Ingest → Organize → Sync → Transcribe → Analyze → Selects → Rough Cut
```

and is designed from day one to **learn the editor's style** by comparing its output
against the editor's revisions (AI Rough Cut → Revised Cut → Final Approved Cut).

## Status

**Phase 0 — Technical feasibility & architecture.** No application code yet.
This folder currently contains the complete design documentation. See the roadmap
for the build phases.

## What it does (V1 scope)

1. **Organize & Sync** — inventories a source drive non-destructively, builds a
   standardized Premiere project structure, syncs separate production audio to camera
   files (timecode first, waveform second, never a silent guess), and creates one
   synced stringout sequence per interview.
2. **Transcribe & Selects** — transcribes via Premiere's built-in Speech-to-Text
   (local Whisper as fallback), labels speakers, analyzes transcripts against the
   project's script/outline/criteria with the Claude API, and builds a master selects
   sequence (`02_SELECTS_MASTER_v001`) with section slates, markers, and a written
   paper cut.
3. **Rough Cut** — assembles a genuine first editorial pass (`03_ROUGHCUT_*_v001`)
   for a chosen format (:30/:60 commercial, teaser, trailer, sizzle, short/long/feature
   doc, custom) — dialogue only in V1, but with real structure, pacing, pause handling,
   and intentional openings/endings.
4. **Editorial learning (data model now, feature later)** — every generated sequence
   is snapshotted; future versions diff the editor's revisions into structured edit
   events and promote repeated patterns into per-format editorial preferences.

## Architecture in one paragraph

A **UXP panel** inside Premiere Pro (TypeScript; Premiere 25.2+ required) performs all
in-app operations — bins, import, transcription, sequence building, markers, snapshot
export. A **local companion service** (Python) does everything Premiere can't:
media inspection (ffprobe), waveform sync (cross-correlation), Whisper fallback
transcription, Claude API editorial analysis, slate rendering, the paper cut document,
and the on-disk project workspace/data store. The panel and companion talk over
localhost WebSocket; the user experiences them as one tool.

## Documentation

| Doc | Contents |
|---|---|
| [docs/01-feasibility.md](docs/01-feasibility.md) | API research findings, evidence, risks, and fallback strategies |
| [docs/02-architecture.md](docs/02-architecture.md) | System components, pipeline modules, orchestration, communication |
| [docs/03-data-model.md](docs/03-data-model.md) | Workspace layout and all schemas, including the editorial learning model |
| [docs/04-editorial-spec.md](docs/04-editorial-spec.md) | Bin/sequence naming, slates, markers, selects criteria, format structures |
| [docs/05-roadmap.md](docs/05-roadmap.md) | Phased implementation plan with verification spikes |

## Environment requirements (current understanding)

- macOS, Adobe Premiere Pro **25.2 or newer** (exact installed version to be confirmed;
  a capability probe at startup verifies each API the tool needs — see feasibility doc)
- Python 3.11+ and ffmpeg for the companion service (bundled in a later packaging phase)
- An Anthropic API key for editorial analysis
