# 03 — Data Model

All artifacts are JSON on disk in a per-project workspace, human-readable and
git-friendly. JSON Schemas for each will live in `/premiere-edit-agent/schemas/`
and are the single contract shared by the panel, the companion, and the Claude
structured-output definitions.

## 1. Workspace layout

Created next to the Premiere project file:

```
<ProjectName>_EditAgent/
├── project.json              # manifest: settings, project type, stage states
├── materials/                # user-provided script / outline / questions / criteria
├── inventory/inventory.json
├── sync/sync.json
├── transcripts/<clipId>.json         # normalized Adobe transcript format
├── analysis/analysis_v###.json
├── edls/selects_edl_v###.json
├── edls/roughcut_<format>_edl_v###.json
├── papercuts/papercut_v###.md|pdf
├── slates/*.mov                      # rendered slate media
├── snapshots/<seqGuid>/<timestamp>_<kind>.otio.json   # kind: generated|revised|final
├── learning/edit_events.jsonl
├── learning/preferences.json
└── logs/
```

## 2. Common conventions

- **IDs**: every entity has a stable `id` (uuid). Premiere objects are referenced by
  their Premiere GUIDs (`projectItemGuid`, `sequenceGuid`) plus a human-readable name.
- **Time**: seconds as float64 in artifact files, always paired with an explicit
  `timebase` context; frame-accurate conversion happens only at assembly time using
  the sequence frame rate. Word-level references use `{clipId, wordStart, wordEnd}`
  (indices into the transcript) — the **transcript anchor** — so content survives
  retiming and is diff-attributable.
- **Provenance block** on every artifact:

```json
"provenance": {
  "generatedAt": "2026-08-22T20:00:00Z",
  "generator": "companion@0.1.0",
  "inputs": {"inventory": "sha256:…", "transcript:clip123": "sha256:…"},
  "model": "claude-opus-5",
  "promptVersion": "selects/v3"
}
```

## 3. Pipeline artifacts (abridged shapes)

**inventory.json** — one record per source file:

```json
{
  "id": "med_…", "path": "/Volumes/SSD/DAY1/A001C003.mp4", "hash": "sha256:…",
  "kind": "video|audio|other", "container": "mp4", "codec": "xavc",
  "durationSec": 1834.2, "frameRate": 23.976, "audioChannels": 2,
  "embeddedTimecode": "01:22:10:14", "bwf": {"timeReferenceSamples": 123456789, "iXML": {...}},
  "grouping": {"shootDay": "DAY1", "cardOrFolder": "A001", "subjectGuess": null}
}
```

**sync.json** — one record per camera-clip↔audio pairing decision:

```json
{
  "videoId": "med_a", "audioId": "med_b",
  "status": "synced|flagged|unmatched",
  "method": "timecode|waveform|slate_assisted",
  "offsetSec": 12.4821, "driftPpm": 0.4,
  "confidence": 0.97, "threshold": 0.85,
  "flagReason": null
}
```

**analysis_v###.json** — speaker roles + scored passages:

```json
{
  "speakers": [{"transcriptSpeakerId": "uuid", "role": "INTERVIEWEE|INTERVIEWER|OTHER|UNKNOWN",
                "displayName": "Subject", "confidence": 0.98, "evidence": "asks no questions; first-person narrative"}],
  "sections": [{"id": "sec_childhood", "title": "CHILDHOOD", "sourceOfSection": "outline|inferred", "order": 1}],
  "passages": [{
    "id": "pas_…", "anchor": {"clipId": "med_b", "wordStart": 812, "wordEnd": 964},
    "quote": "…", "speaker": "uuid", "sectionId": "sec_childhood", "topics": ["father", "first memory"],
    "scores": {"relevance": 5, "completeThought": 5, "clarity": 4, "quotability": 5,
               "emotionalWeight": 5, "specificity": 4, "authenticity": 5, "concision": 3,
               "delivery": 4, "storyAdvancement": 5, "redundancy": 1},
    "status": "select|alternate|reject", "alternateOf": null,
    "reason": "most specific and emotional account of the first memory",
    "scriptRef": {"materialId": "script_v2", "line": 41}   // commercials: fidelity mapping
  }]
}
```

## 4. EDL — the assembly contract

One format for both selects and rough cuts; consumed by the panel's SequenceEditor
builder **or** the FCPXML fallback builder interchangeably.

```json
{
  "sequenceName": "03_ROUGHCUT_TRAILER_v001",
  "kind": "selects|roughcut",
  "format": "trailer", "targetDurationSec": 150,
  "settings": {"frameRate": 23.976, "width": 3840, "height": 2160},
  "events": [{
    "idx": 0, "type": "slate|clip",
    "source": {"projectItemGuid": "…", "mediaId": "med_a"},
    "sourceInSec": 812.40, "sourceOutSec": 838.11,
    "anchor": {"clipId": "med_b", "wordStart": 812, "wordEnd": 964},
    "audio": {"productionMediaId": "med_b", "offsetSec": 12.4821},
    "tracks": {"video": 0, "audio": [1]},
    "beat": "hook", "sectionId": "sec_childhood",
    "pauseDecisions": [{"afterWord": 950, "action": "preserve|tighten|remove", "gapSec": 1.8, "why": "emotional beat"}],
    "rationale": "opens on the most provocative line; withholds context",
    "markers": [{"type": "comment", "name": "HOOK", "comment": "…quote/speaker/TC/rank/reason…"}]
  }]
}
```

Design intent: the EDL captures editorial **decisions with reasons**, not just cuts.
`beat`, `anchor`, `pauseDecisions`, and `rationale` exist so the learning diff can
attribute the editor's changes to a decision the AI made.

## 5. Editorial learning: snapshots, diffs, edit events

**Snapshot** = `{sequenceGuid, kind: generated|revised|final, capturedAt, otio, edlRef}`.
`generated` is written at build time; `revised`/`final` come from on-demand or
project-close captures of agent-created sequences (matched by GUID).

**Diff engine** (companion, deterministic): aligns two snapshots' track items via
source clip + overlapping source ranges + transcript anchors, then emits **edit
events** (`learning/edit_events.jsonl`), each tagged with project id, project type
/format, sequence kind transition (AI→revised, revised→final), and the original EDL
event + rationale it touches. Event taxonomy (from the requirements, normative):

```
clip_removed | clip_added | take_swapped            (same anchor topic, different passage)
head_trimmed | tail_trimmed | clip_extended          {deltaSec, trimmedContent: words|silence|filler}
reordered   | beat_moved | section_removed | section_expanded | section_shortened
pause_tightened | pause_preserved | pause_removed    {gapSecBefore, gapSecAfter}
quote_replaced | opening_changed | ending_changed
```

Example event:

```json
{"event": "head_trimmed", "projectType": "short_documentary", "transition": "ai_to_revised",
 "seq": "03_ROUGHCUT_…_v001", "edlIdx": 4, "deltaSec": -1.1,
 "trimmedContent": {"kind": "words", "text": "So, I guess, you know,", "tags": ["filler"]},
 "aiRationale": "kept the wind-up for authenticity"}
```

## 6. Preference model

`learning/preferences.json` — observations are aggregated into candidate patterns;
patterns become **active** only by threshold or explicit instruction:

```json
{
  "patterns": [{
    "id": "pref_head_trim",
    "statement": "Trims 0.5–1.5s of setup/filler from the head of interview responses",
    "scope": {"projectTypes": ["short_documentary", "long_documentary"], "beat": null},
    "status": "candidate|active|user_pinned|user_rejected",
    "support": {"events": 14, "projects": 3, "firstSeen": "…", "lastSeen": "…",
                "evidence": ["evt_ids…"]},
    "promotion": {"rule": "events>=8 && projects>=2", "promotedAt": null},
    "application": "prompt_directive",
    "directive": "Trim response heads past restated-question/setup language; keep first content word within ~0.5s."
  }],
  "explicit": [{
    "id": "pref_user_1", "instruction": "Never cut into a breath before an emotional line",
    "source": "user", "scope": {"projectTypes": ["*"]}, "status": "user_pinned"
  }]
}
```

Invariants (from requirements, enforced in code):

1. A single event can create only a `candidate`; promotion requires the support rule
   (repeated events across ≥2 projects) — thresholds configurable, conservative by default.
2. Explicit user instructions ("remember this") become `user_pinned` immediately and
   outrank inferred patterns on conflict.
3. Preferences are scoped by project type first; a commercial pattern never leaks
   into documentary behavior unless observed there too.
4. The file is human-readable and user-editable; the panel exposes review/veto
   (`user_rejected` suppresses a pattern permanently).
5. **Application is transparent**: when a generation uses active preferences, the
   EDL provenance lists their ids, so any output can be traced to the preferences
   that shaped it.

Active preferences are injected into stage-5/7 prompts as a per-format directive
block (after the cached transcript prefix, so caching survives preference churn).

## 7. project.json (manifest)

```json
{
  "projectName": "…", "premiereProject": "/path/Project.prproj",
  "projectType": "short_documentary", "targetDurationSec": 600,
  "materials": [{"id": "script_v2", "path": "materials/script.pdf", "kind": "script"}],
  "settings": {"transcription": "premiere|whisper|auto", "cloudAnalysis": true,
               "handles": {"preSecMin": 3, "preSecMax": 5, "postSec": 2},
               "syncConfidenceThreshold": 0.85},
  "stages": {"ingest": {"state": "done", "artifact": "inventory/inventory.json", "hash": "…"},
             "sync": {"state": "flagged", "flags": 2}, "...": {}},
  "sequences": {"generated": [{"guid": "…", "name": "02_SELECTS_MASTER_v001", "edl": "edls/…"}]}
}
```
