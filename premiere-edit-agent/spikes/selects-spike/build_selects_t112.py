#!/usr/bin/env python3
"""
Function-2 spike: build 02_SELECTS_MASTER_v001 from the takes in SCENE_T_112.

The editorial choices here (take boundaries, ranking, reasons) play the role
of the AI analysis layer, but every boundary is derived from transcript word
data — the same anchors the production pipeline uses.

Usage:  python3 build_selects_t112.py RAW_DUMP.xml TRANSCRIPT.json -o OUT_DIR
"""

import argparse
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent.parent / "companion"))
from editagent.fcp7 import load_inventory  # noqa: E402
from editagent.selects import Select, build_selects_sequence  # noqa: E402
from editagent.sync import pair_by_timecode, synced  # noqa: E402
from editagent.transcript import load_transcript  # noqa: E402


def word_after(t, text, search_from=0):
    """Index of the first word matching `text` at or after `search_from`."""
    for w in t.words[search_from:]:
        if w.text == text:
            return w.index
    raise ValueError(f"word not found: {text!r}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("raw_dump")
    ap.add_argument("transcript")
    ap.add_argument("-o", "--out_dir", default=".")
    args = ap.parse_args()
    out = Path(args.out_dir)

    inventory = load_inventory(args.raw_dump)
    decisions = pair_by_timecode(inventory)
    d112 = next(d for d in synced(decisions) if d.audio.name == "SCENE_T_112.wav")
    t = load_transcript(args.transcript, "SCENE_T_112.wav")

    # Take 1 — the full performance: "I'm Noemi ..." right after "action."
    # through "... running to change." (she is cut off there; director: "You're good")
    i_action = word_after(t, "action.")
    i_start = i_action + 1
    i_change = word_after(t, "change.", i_start)
    take1 = Select(
        label="SELECT 1", sync=d112, rank=1,
        wav_in_sec=t.words[i_start].start, wav_out_sec=t.words[i_change].end,
        quote="I'm Noemi Legaspi. For 20 years, I've called Woodburn home... "
              "I'm running to change.",
        reason="Only full read on this roll; clean delivery start to 'change'",
    )

    # Take 2 — the pickup of the closing line after "You're good."
    i_good = word_after(t, "good.", i_change)
    i_pick = i_good + 1
    i_pol = word_after(t, "politician.", i_pick)
    take2 = Select(
        label="SELECT 2", sync=d112, rank=1,
        wav_in_sec=t.words[i_pick].start, wav_out_sec=t.words[i_pol].end,
        quote="I know a lot more about Oregon's economy than any politician.",
        reason="Pickup of the closing line; pairs with SELECT 1 tail",
    )

    # Alternate — partial re-read near end of roll ("For 20 years ... I know.")
    i_this = word_after(t, "This.", i_pol)
    i_alt_start = i_this + 1
    i_alt_end = word_after(t, "know.", word_after(t, "neighbors,", i_alt_start))
    alt = Select(
        label="ALT of SELECT 1", sync=d112, rank=2,
        wav_in_sec=t.words[i_alt_start].start, wav_out_sec=t.words[i_alt_end].end,
        quote="For 20 years, I've called Woodburn home. This is my community...",
        reason="Prompter-practice partial; audio only if camera was cut",
    )

    xml, excluded = build_selects_sequence([take1, take2, alt])
    xml_path = out / "SELECTS_T112_TEST.xml"
    xml_path.write_text(xml, encoding="utf-8")
    print(f"wrote {xml_path}")
    for ex in excluded:
        print(f"EXCLUDED {ex.select.label}: {ex.why}")

    lines = ["# Paper Cut — SCENE_T_112 (Noemi :30)", ""]
    for sel in (take1, take2, alt):
        status = next((f"EXCLUDED — {e.why}" for e in excluded if e.select is sel),
                      "placed")
        lines += [
            f"## {sel.label} (rank {sel.rank}) — {status}",
            f"- source: {sel.sync.video.name} + {sel.sync.audio.name}",
            f"- WAV time: {sel.wav_in_sec:.2f}s – {sel.wav_out_sec:.2f}s",
            f"- quote: {sel.quote}",
            f"- reason: {sel.reason}", "",
        ]
    (out / "papercut_T112.md").write_text("\n".join(lines), encoding="utf-8")
    print(f"wrote {out / 'papercut_T112.md'}")


if __name__ == "__main__":
    main()
