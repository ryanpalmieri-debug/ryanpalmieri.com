# 01 — Technical Feasibility

Research date: 2026-08-22. Primary evidence: Adobe's official UXP sample repository
([AdobeDocs/uxp-premiere-pro-samples](https://github.com/AdobeDocs/uxp-premiere-pro-samples)),
whose `premiere-api` sample panel exercises the shipping UXP API surface. Source files
cited below were inspected directly.

## 1. Platform choice: UXP, not CEP/ExtendScript

- Premiere Pro extensibility has moved to **UXP** (Unified Extensibility Platform).
  ExtendScript/CEP support ends **September 2026** — building on it now would be dead
  on arrival. All Premiere-side code will be a UXP panel.
- Minimum Premiere version: Adobe's own samples declare **25.1.0–25.2.0** as their
  minimums. We set the tool's baseline at **Premiere Pro 25.2**, and recommend the
  current release since the UXP API is still growing. The exact installed version on
  the target machine is unconfirmed; see "Capability probe" below for how the tool
  handles version drift safely.
- UXP panels are TypeScript/JavaScript, load via Adobe's UXP Developer Tool during
  development, and appear under **Window → UXP Plugins**. Manifest permissions grant
  network access (localhost WebSocket to the companion) and file system access.

## 2. Confirmed capabilities (verified in Adobe's sample source)

Everything the pipeline needs on the Premiere side exists in the shipping UXP API:

| Need | API (from sample source) | Sample file |
|---|---|---|
| Trigger built-in Speech-to-Text on a clip | `ppro.Transcript.transcribeClipProjectItem(clip)` | `transcript.ts` |
| Check/export/import transcripts | `Transcript.hasTranscript`, `exportToJSON`, `importFromJSON` + `createImportTextSegmentsAction` | `transcript.ts` |
| Create bins, smart bins, rename/move/remove | `FolderItem.createBinAction`, `createSmartBinAction`, `createRenameBinAction`, move/remove actions | `projectPanel.ts` |
| Import media files | `project.importFiles(paths)` (also `importSequences`, AE components) | `import.ts` |
| Create sequences | `createSequence`, `createSequenceFromMedia`, `createSubsequence` | `sequence.ts` |
| Sequence settings / frame rate | get/set video settings, `FrameRate.createWithValue` | `sequence.ts` |
| Set clip source in/out before placement | `ClipProjectItem.createSetInPointAction` / `createSetOutPointAction` | `projectPanel.ts` |
| Insert/overwrite clips into a timeline at a time, on chosen V/A tracks | `SequenceEditor.createInsertProjectItemAction`, `createOverwriteItemAction` | `sequenceEditor.ts` |
| Clone/remove track items (ripple delete) | `createCloneTrackItemAction`, `createRemoveItemsAction` | `sequenceEditor.ts` |
| Trim placed track items (adjust in/out on the timeline) | track item start/end actions; handle math demonstrated in `addHandlesToTrackItem` | `sequence.ts` |
| Read a sequence's tracks and track items | `sequence.getVideoTrack(n)` → track items with times, names, source refs | `sequence.ts` |
| Markers with type, time, duration, comments | `ppro.Markers.getMarkers`, `Marker` create actions (comment/chapter/weblink) | `markers.ts` |
| Color labels on project items | `Constants.ProjectItemColorLabel` | `projectPanel.ts` |
| Insert MOGRTs | `SequenceEditor.insertMogrtFromPath` | `sequenceEditor.ts` |
| Export a sequence as AAF / FCP XML / **OpenTimelineIO** | `ProjectConverter.exportAAF` / `exportAsFinalCutProXML` / `exportAsOpenTimelineIO` | `projectConverter.ts` |
| Undo-safe batched edits | `project.lockedAccess` + `project.executeTransaction(compoundAction)` | throughout |

Two of these deserve emphasis:

- **Programmatic transcription is real.** The older community understanding
  ("no APIs around captions/transcription") predates the UXP rollout. The current API
  both *initiates* transcription and round-trips the transcript as JSON.
- **`exportAsOpenTimelineIO` is the learning system's foundation.** Every sequence the
  agent generates — and every revision the editor makes — can be captured as a
  machine-readable OTIO snapshot and diffed. No custom sequence-serialization needed.

## 3. The Adobe transcript JSON format

The samples repo ships the full schema
(`sample-panels/premiere-api/assets/transcript_format_spec.json`). Relevant properties:

- **Speakers**: first-class array of `{id: uuid, name}`; every segment references a
  speaker. Supports our INTERVIEWEE / INTERVIEWER / UNKNOWN labeling (plus more).
- **Word-level timing**: every word has `start`, `duration`, `confidence` (0–1),
  `eos` (end-of-sentence flag), and `tags` including `"filler"` — Premiere itself
  tags hesitation words. This is directly usable for pause/filler analysis in the
  rough cut ("remove hesitation, preserve emotional pauses").
- **Language codes**: fixed enum (en-us etc.); `??-??` for unknown.

Because the format is documented and importable, the **Whisper fallback produces the
same artifact**: companion-side transcription is converted into this JSON and imported
via `Transcript.createImportTextSegmentsAction`, so the transcript also appears in
Premiere's own Text panel regardless of which engine produced it. All downstream
stages consume one normalized transcript format.

## 4. Known gaps and their fallbacks

| Gap | Impact | Fallback / mitigation |
|---|---|---|
| No API found for Premiere's own "Synchronize"/merge-clips or multicam-source creation | Can't ask Premiere to waveform-sync for us | **Companion does the sync math itself** (see §5) and the panel places clips at computed offsets on stacked tracks. This is strictly better: we get confidence scores and never silently guess. True multicam *source sequences* are out of V1 scope; stacked-track stringouts cover the editorial need. |
| `transcribeClipProjectItem` options (language, speaker-detection toggle) are not documented in the sample; behavior on sequences is explicitly unsupported | Transcription targets must be clips (we transcribe the production WAV — the best audio — not the synced sequence) | Phase-1 spike verifies options and speaker output on the target machine. If Premiere's engine can't be steered adequately → **local Whisper** (faster-whisper, word timestamps) + diarization, normalized to the Adobe JSON. |
| Speaker *identification* quality (who is the interviewer?) is unknown for Premiere STT | Speaker roles matter for selects | Roles are assigned by the analysis layer regardless of engine: Claude classifies each speaker from content (questions vs. answers) with per-speaker evidence; low confidence → UNKNOWN, surfaced for one-click correction in the panel. |
| Slates need on-screen text, but V1 forbids titles/graphics APIs and MOGRT text-param setting is unverified | Selects sequence requires 5-second section slates | Companion **renders slate media** (ffmpeg `drawtext` → ProRes/PNG), panel imports and places them like any clip. Zero dependency on Premiere titling. MOGRT path kept as a later nicety. |
| UXP API is young; the exact installed Premiere version is unconfirmed; methods may be missing/renamed on older builds | Any single API could be absent at runtime | **Capability probe**: on startup the panel feature-tests every API it needs and reports a capability matrix to the companion. Each pipeline stage declares required capabilities and refuses cleanly (with an explanation) rather than failing mid-run. |
| Sequence-building APIs could prove unreliable for long assemblies (beta-quality edge cases) | Rough cut assembly could stall | **FCPXML escape hatch**: the companion can generate the entire sequence as FCP7 XML and import it via `importFiles` / `importSequences`. Premiere has imported FCP7 XML reliably for a decade. The EDL data model (03) is deliberately renderer-agnostic so either builder can execute it. |
| Long-running UXP operations can block Premiere's UI | Poor UX during big assemblies | All edits batched in `executeTransaction` chunks; progress streamed to the panel; heavy computation lives in the companion, never the panel. |

## 5. Companion-side feasibility (no Premiere involvement)

All standard, mature tech:

- **Media inspection**: `ffprobe` JSON output → codec, resolution, frame rate, audio
  channels, embedded timecode track, duration. BWF WAV `bext` chunks (time reference =
  samples since midnight) and iXML metadata read directly for audio timecode/slate info.
- **Waveform sync**: decode audio to mono downsampled PCM (ffmpeg), then GCC-PHAT /
  normalized cross-correlation to find the offset of camera scratch audio within the
  production WAV. Confidence = peak-to-second-peak ratio; drift detected by correlating
  windows at the head and tail (sample-clock drift → flag, and note Premiere's audio
  conform tolerance). This is the same technique as PluralEyes/audio-offset-finder.
  Sync hierarchy implemented exactly as specified: matching timecode → waveform →
  slate/clap assist → **flag for review**; a below-threshold match is never placed
  silently (it lands in a review bin + report instead).
- **Fallback transcription**: `faster-whisper` (local, word timestamps); optional
  diarization stage; output normalized to Adobe transcript JSON.
- **Editorial analysis**: Anthropic API (see 02-architecture §6 for model and API
  feature choices). Transcripts + project materials fit comfortably in modern context
  windows (1M tokens); prompt caching keeps repeated passes over the same transcript
  cheap; structured outputs guarantee machine-readable selects/EDL decisions.
- **Slate rendering / paper cut**: ffmpeg drawtext; Markdown → PDF for the paper cut.

## 6. Verdict

**The full V1 pipeline is feasible today** on Premiere 25.2+ with a UXP panel +
companion architecture. No stage depends on an unverified capability without a
designed fallback. The two items requiring a hands-on spike on the target machine
before implementation hardening:

1. `Transcript.transcribeClipProjectItem` options/behavior (language, speakers, queueing).
2. `SequenceEditor` behavior at assembly scale (hundreds of edits in transactions).

Both spikes are scheduled as Phase 1 in the roadmap, and both have committed fallbacks
(Whisper; FCPXML import).
