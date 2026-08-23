# 04 — Editorial Spec

The referenced "project brief" was not available in this repository or in any
retrievable artifact, so this document **defines** the bin structure, naming, and
format structures as the working standard. Everything here is configuration-backed
(overridable per project) — amend this file to change the defaults.

## 1. Premiere bin structure (created by Organize)

```
PROJECT ROOT
├── 00_SEQUENCES
│   ├── 01_STRINGOUTS        # synced interview stringouts
│   ├── 02_SELECTS           # 02_SELECTS_MASTER_v###
│   └── 03_ROUGHCUTS         # 03_ROUGHCUT_<FORMAT>_v###
├── 01_MEDIA
│   ├── VIDEO/<SHOOTDAY>/<CARD>     # mirrors source structure; media referenced in place
│   └── AUDIO/<SHOOTDAY>
├── 02_AGENT
│   ├── SLATES               # rendered slate media
│   └── REVIEW               # flagged sync pairs, unknown speakers, unmatched files
└── 99_ORIGINAL_STRUCTURE    # optional smart-bin views of the drive as delivered
```

Originals are never moved, renamed, or written to on the source drive. Labels:
agent-generated sequences get a fixed color label; flagged items get red.

## 2. Naming

- Stringouts: `01_STRINGOUT_<SUBJECT>_<SHOOTDAY?>_v###` — one per interview subject
  (or per subject+day when a subject spans days).
- Selects: `02_SELECTS_MASTER_v###` (single master across all interviews).
- Rough cuts: `03_ROUGHCUT_<FORMAT>_<TARGET>_v###`, e.g. `03_ROUGHCUT_TRAILER_2M_v001`.
- Versions never overwrite; regeneration increments `v###`.
- Subject names come from folder hints/materials when confident, else `SUBJECT_A`,
  `SUBJECT_B`… pending one-click rename in the panel (rename propagates to markers
  and paper cut on next regeneration).

## 3. Sync units and stringout layout

Matches the editor's existing convention (validated against a real project export,
`fixtures/Selects_Sync_Sequence.xml`):

- **Per-clip multicam source sequence** `<clipfile>.movMulticam` for every camera
  clip with matched production audio: V1 = camera clip; A1–A6 = production poly-WAV
  channels placed at the computed sync offset (as many channels as the WAV carries);
  A7+ = camera scratch audio (kept for verification, muted in downstream cuts).
  Created via generated FCP7 XML import; stored in a `MULTICAMS` bin per shoot day.
- **Stringout** `01_STRINGOUT_<SUBJECT>_v###`: that interview's multicam clips
  placed back-to-back in source order.
- Sequence markers at take boundaries and at flagged-sync regions; unmatched or
  low-confidence clips land in `02_AGENT/REVIEW`, never silently placed.

## 4. Selects sequence

- Ordered by section; a **5-second slate** precedes each section:
  `SECTION — DESCRIPTION` (e.g. `CHILDHOOD — FIRST MEMORY OF HIS FATHER`), rendered
  media (white on black, project-configurable), placed on V1 like any clip.
- Handles: 3–5 s pre-roll, ~2 s post-roll where media allows; clamped so adjacent
  selects from the same take don't overlap (handle yields before content does).
- Every select carries a clip marker: `topic | speaker | "exact quote" | source clip |
  source TC | rank+confidence | reason selected`.
- Within a section: strongest first, alternates immediately after their primary,
  marker-labeled `ALT of <id>`.
- **Paper cut** generated alongside (`papercuts/`): per section, every select with quote,
  speaker, source TC, score summary, reason — plus a "strong alternates" appendix.

## 5. Standing select criteria

Scored 1–5 each (see analysis schema): relevance to script/story, complete thought,
clarity, quotability, emotional weight, specificity, authenticity, concision,
strong delivery, story advancement, redundancy (inverse). Weighting by project type:

- **Commercials (:30/:60)**: script fidelity dominates — passages are matched to
  script lines; the fidelity mapping outranks standalone quote quality.
  **Within** script-faithful candidates, ranking is delivery-first
  (editor instruction, 2026-08-23, `fixtures/preferences.json` pref_user_001):
  for flat/wooden subjects, the best read of each line is the most energetic and
  fluid one — the edit manufactures excitement with music and B-roll — and the
  cut assembles line-by-line from the best take of each line across all clips,
  never by favoring one full take. Delivery is measured per take
  (`companion/editagent/delivery.py`: pace, pause ratio, stumbles, fillers,
  clarity), with audio prosody scoring (pitch range, loudness dynamics) planned
  as a Phase 3 refinement.
- **Documentaries**: editorial/story quality carries more weight; fidelity to outline
  is a guide, not a constraint.
- Project-specific materials (script, outline, treatment, questions, topic list) are
  always the primary criteria; standing criteria rank within them.

## 6. Format structures (rough cut templates)

Templates are starting points, not straitjackets: the structure pass may deviate when
the material argues for it, and must record its reasoning when it does.

| Format | Target | Structure |
|---|---|---|
| `:30 commercial` | 30s | script order, near-exact fidelity; trims only within lines |
| `:60 commercial` | 60s | as :30 with room for one authenticity beat |
| `teaser` | 30–60s | cold-open hook → 2–3 escalating fragments → withheld-answer button |
| `trailer` | 90–150s | hook → world/character setup → conflict → escalation montage → turn → curiosity-gap ending |
| `sizzle` | 2–5m | hook → thesis → strongest-moments run (contrast-ordered) → emotional peak → memorable close |
| `short_documentary` | 5–15m | hook (cold open) → setup → character/context → conflict → escalation → turn/revelation → resolution/insight → closing button |
| `long_documentary` | 20–60m | as short doc with multi-act escalation and breathing room |
| `feature_documentary` | 60m+ | act-structured; V1 produces per-act assemblies + an overall order |
| `custom` | user-set | user describes structure in materials; agent maps beats to it |

Documentary guidance: favor emotional/provocative cold opens over explanatory ones;
trailer/teaser guidance: prioritize hook strength, escalation, contrast, emotion,
curiosity, and a memorable ending — think like a trailer editor, not a summarizer.

## 7. Rough-cut editorial rules (V1, dialogue-only)

- A real editorial pass, not a stringout: intentional opening and ending, beat-driven
  order, escalation and emotional progression across the piece.
- Remove redundancy across speakers/takes (best telling survives; others become ALTs
  in the selects, not the cut).
- Pauses: **preserve** deliberate/emotional pauses (flagged in `pauseDecisions`);
  **remove** hesitation, filler (transcript `filler` tags), false starts, and
  restated-question setup language.
- Word-level trims must respect breaths: cut points snap to word boundaries with a
  small configurable pad (default 80 ms) and never clip into an audible intake before
  a kept line.
- No B-roll, music, graphics, titles, lower thirds, or placeholders for any of them.
