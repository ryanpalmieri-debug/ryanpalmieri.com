# Phase 1 — Verification Spikes

These small tests prove the risky assumptions from `docs/01-feasibility.md` on the
actual target machine before we harden the real implementation. Total hands-on time:
roughly 30–45 minutes (plus transcription time for one clip).

**Use a throwaway Premiere project** containing one real interview camera clip
(FX3/XAVC or a ProRes proxy) and its matching production WAV. Spike 3 creates a
test sequence in it.

## A. Capability probe panel (Spikes 1–4, inside Premiere)

One-time setup:

1. Confirm Premiere Pro is **25.2 or newer** (Premiere Pro → About Premiere Pro).
   Update via Creative Cloud if older.
2. Install the **UXP Developer Tool** (UDT) from the Creative Cloud app
   (or from Adobe's developer site), version 2.1+.
3. Get this repo folder onto the Mac (clone the repo or download the branch as a zip).
4. Open UDT → **Add Plugin** → choose
   `premiere-edit-agent/spikes/capability-probe/manifest.json` → **Load**.
   With Premiere running, the panel appears under **Window → UXP Plugins →
   Edit Agent Capability Probe**.

Then, in the panel, top to bottom:

| Button | What it does | What to look at |
|---|---|---|
| **1. Capability report** | Read-only. Detects Premiere/UXP versions and feature-tests every API the tool needs | The log lists any `MISSING:` lines |
| **2. Transcribe selected clip** | Select the **production WAV** in the Project panel first. Triggers Premiere's Speech-to-Text, exports the transcript JSON, saves it | Does it run at all? Are there ≥2 speakers? Are filler words tagged? How long did it take? |
| **3. Assembly test** | Select the **camera clip** first. Creates `SPIKE_ASSEMBLY_…` and performs 50 scripted edits with markers | Speed (ms/edit in the log), correctness (contiguous 1.5 s cuts, markers every 10th), and whether Cmd-Z undoes in grouped steps |
| **4 / 4b. Export OTIO / FCPXML** | Exports the active sequence (use the spike sequence, then re-run after hand-trimming a couple of clips) | Do the files contain the track items? (I'll analyze the files — just save them) |
| **Save full report** | Writes `edit-agent-capability-report.json` | **Send this file back**, plus the transcript JSON and the OTIO/XML exports |

If a button errors, that's a finding, not a problem — the report captures it, and
each risk already has a fallback path designed.

## B. Sync spike (Spike 5, in Terminal)

Tests waveform sync math on real material — no Premiere involved.

```bash
brew install ffmpeg           # if not installed
cd premiere-edit-agent/spikes/sync-spike
python3 -m venv .venv && source .venv/bin/activate
pip install numpy
python3 sync_spike.py /path/to/CAMERA_CLIP.mp4 /path/to/PRODUCTION.wav
```

It prints the detected offset, a confidence score, a drift estimate, and a JSON
block — **paste the JSON back** (or save it to a file). If you can, run it on 2–3
different camera/WAV pairs, ideally including one difficult one (noisy room,
distant scratch mic).

## C. What to send back

1. `edit-agent-capability-report.json` (from the panel)
2. The exported transcript JSON
3. The OTIO and FCPXML exports (both from the untouched spike sequence and after
   you hand-trim/rearrange a few clips in it — the "after" pair is what validates
   the learning-system snapshot approach)
4. The sync spike JSON output(s)
5. Anything that felt broken or slow, in your own words

With those in hand, the feasibility matrix gets finalized (Premiere STT vs. Whisper,
SequenceEditor vs. FCPXML builder) and Phase 2 implementation starts on solid ground.
