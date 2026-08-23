#!/usr/bin/env python3
"""
Full Function-2 pass from a whole-sequence text transcript (block-level TC).

Inputs: RAW_DUMP.xml (timeline layout + media), RAW_DUMP.txt (Premiere text
transcript of that sequence). Only the WAV half of the timeline is analyzed
(clean audio); the camera-scratch half duplicates it.

Pipeline: parse blocks -> map to WAV regions -> detect script reads (A and B)
with n-gram coverage -> merge into takes -> attach slate take numbers and
director reactions -> rank (gates + praise + producer boost + pace) -> emit
02_SELECTS_MASTER_v002 XML + full paper cut.

Precision note: block-level TC only; in/out points are word-proportional
estimates within blocks (±1-2s), covered by handles.
"""

import argparse
import re
import sys
from difflib import SequenceMatcher
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent.parent / "companion"))
from editagent.align import tokenize_script  # noqa: E402
from editagent.fcp7 import load_inventory  # noqa: E402
from editagent.selects import Select, build_selects_sequence  # noqa: E402
from editagent.sync import pair_by_timecode, synced  # noqa: E402
from editagent.timecode import tc_to_frames  # noqa: E402

FPS = 23.976

SCRIPTS = {
    "A": ("I'm Noemi Legaspi. For 20 years, I've called Woodburn home. "
          "This is my community. I know my neighbors. I know their struggles. "
          "And I know what rising taxes are doing to families trying to get "
          "ahead. Salem keeps passing the costs down to us, and nothing is "
          "getting better. I'm running to change that because as a small "
          "business owner, I know a lot more about Oregon's economy than any "
          "politician."),
    # Most scene-B takes start straight at "I'm a small business owner";
    # the name appears in only a few, so it is not part of the reference.
    "B": ("I'm a small business owner, a mental health counselor, and "
          "daughter of Mexican immigrants. I've spent two decades protecting "
          "Oregon families. You deserve someone who's fighting for you, not "
          "the insiders."),
}

PRAISE = re.compile(
    r"outstanding|really strong|very strong|super strong|very,? very nice"
    r"|that's the one|this is the one|that's the point|dope|awesome"
    r"|i like it|nice and still|very nice|i'm good,? i'm happy", re.I)

SLATE = re.compile(r"take\s+(one|two|three|four|five|six|1|2|3|4|5|6)\b[.,]?\s*(mark|marc)", re.I)
NUMS = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6}


def parse_blocks(path):
    text = Path(path).read_text(encoding="utf-8-sig")
    blocks = []
    pat = re.compile(
        r"(\d\d:\d\d:\d\d:\d\d)\s*-\s*(\d\d:\d\d:\d\d:\d\d)\n(.*?)\n(.*?)(?=\n\n|\Z)",
        re.S)
    for m in pat.finditer(text):
        s = tc_to_frames(m.group(1), 24) / FPS
        e = tc_to_frames(m.group(2), 24) / FPS
        blocks.append({"start": s, "end": e, "text": " ".join(m.group(4).split())})
    return blocks


def wav_regions(xml_path):
    import xml.etree.ElementTree as ET
    root = ET.parse(xml_path).getroot()

    def t(el, p, d=""):
        e = el.find(p)
        return e.text if e is not None and e.text else d
    seen = {}
    for tr in root.find("sequence/media").findall("audio/track"):
        for c in tr.findall("clipitem"):
            name = t(c, "name")
            if not name.lower().endswith(".wav"):
                continue
            key = (name, int(t(c, "start", "0")))
            seen[key] = {"name": name, "tl_start": int(t(c, "start", "0")) / FPS,
                         "tl_end": int(t(c, "end", "0")) / FPS,
                         "src_in": int(t(c, "in", "0")) / FPS}
    return sorted(seen.values(), key=lambda r: r["tl_start"])


def region_for(regions, t):
    for r in regions:
        if r["tl_start"] <= t < r["tl_end"]:
            return r
    return None


def coverage(script_tokens_set, grams, tokens, ngram=4):
    """(matched script positions, first/last matched token index in tokens)."""
    hits, first, last = set(), None, None
    for j in range(len(tokens) - ngram + 1):
        win = tuple(tokens[j:j + ngram])
        if win in grams:
            for k in range(ngram):
                hits.add(grams[win] + k)
            if first is None:
                first = j
            last = j + ngram - 1
    return hits, first, last


def token_diff(script_text, take_tokens):
    a = tokenize_script(script_text)
    sm = SequenceMatcher(a=a, b=take_tokens, autojunk=False)
    flubs = []
    for op, i1, i2, j1, j2 in sm.get_opcodes():
        if op == "replace" and i2 - i1 <= 3 and j2 - j1 <= 3:
            flubs.append(f"said {' '.join(take_tokens[j1:j2])!r} for "
                         f"{' '.join(a[i1:i2])!r}")
        elif op == "delete" and i2 - i1 <= 4:
            flubs.append(f"dropped {' '.join(a[i1:i2])!r}")
    return flubs


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("raw_dump_xml")
    ap.add_argument("raw_dump_txt")
    ap.add_argument("-o", "--out_dir", default=".")
    args = ap.parse_args()
    out = Path(args.out_dir)

    inv = load_inventory(args.raw_dump_xml)
    sync_by_wav = {d.audio.name: d for d in synced(pair_by_timecode(inv))}
    regions = wav_regions(args.raw_dump_xml)
    wav_half_start = regions[0]["tl_start"]
    blocks = [b for b in parse_blocks(args.raw_dump_txt)
              if b["end"] > wav_half_start]

    grams = {}
    for scene, text in SCRIPTS.items():
        toks = tokenize_script(text)
        g = {}
        for i in range(len(toks) - 3):
            g.setdefault(tuple(toks[i:i + 4]), i)
        grams[scene] = (g, len(toks))

    # 1. score each block against both scripts
    scored = []
    for b in blocks:
        toks = tokenize_script(b["text"])
        best = None
        for scene, (g, slen) in grams.items():
            hits, first, last = coverage(set(), g, toks)
            if hits and (best is None or len(hits) > best[1]):
                best = (scene, len(hits), hits, first, last, slen)
        if best and best[1] >= 8:  # meaningful read content in this block
            scene, nhits, hits, first, last, slen = best
            dur = b["end"] - b["start"]
            per_word = dur / max(1, len(toks))
            scored.append({
                "scene": scene, "block": b, "tokens": toks,
                "cov": len(hits) / slen, "hits": hits,
                "in": b["start"] + (first or 0) * per_word,
                "out": b["start"] + ((last or 0) + 1) * per_word,
            })

    # 2. merge consecutive read-blocks of the same scene (reads spanning blocks)
    takes = []
    for s in scored:
        prev = takes[-1] if takes else None
        if (prev and prev["scene"] == s["scene"]
                and s["block"]["start"] - prev["end_block"] < 2.0
                and prev["cov"] < 0.9):
            prev["hits"] |= s["hits"]
            prev["cov"] = len(prev["hits"]) / grams[s["scene"]][1]
            prev["out"] = s["out"]
            prev["end_block"] = s["block"]["end"]
            prev["tokens"] += s["tokens"]
        else:
            takes.append({**{k: s[k] for k in ("scene", "cov", "hits", "in", "out", "tokens")},
                          "start_block": s["block"]["start"],
                          "end_block": s["block"]["end"]})

    # 3. attach region, slate take number, praise, pace
    all_text = [(b["start"], b["end"], b["text"]) for b in blocks]
    for t in takes:
        mid = (t["in"] + t["out"]) / 2
        t["region"] = region_for(regions, mid)
        t["take_number"] = None
        for s0, e0, txt_ in all_text:  # nearest slate in the 25s before the read
            if t["in"] - 25 < s0 <= t["in"] + 2:
                m = list(SLATE.finditer(txt_))
                if m:
                    n = m[-1].group(1).lower()
                    t["take_number"] = NUMS.get(n, int(n) if n.isdigit() else None)
        t["praise"] = None
        for s0, e0, txt_ in all_text:  # reaction within 15s after the read
            if t["out"] - 2 <= s0 < t["out"] + 15:
                m = PRAISE.search(txt_)
                if m:
                    t["praise"] = m.group(0)
                    break
        t["pace"] = len(t["tokens"]) / max(0.1, t["out"] - t["in"])
        t["flubs"] = token_diff(SCRIPTS[t["scene"]], t["tokens"]) if t["cov"] >= 0.9 else []

    # 4. rank per scene (draft weights per docs/06; producer favorites boost)
    # Producer favorites: scene-1 alpha takes 3 & 4 = rolls T_114 / T_115.
    producer_rolls = {"SCENE_T_114.wav", "SCENE_T_115.wav"}
    for t in takes:
        gate_ok = t["cov"] >= 0.9 and t["region"] and t["region"]["name"] in sync_by_wav
        t["gate_ok"] = gate_ok
        t["producer"] = bool(t["region"] and t["region"]["name"] in producer_rolls)
        t["score"] = round(
            (0.5 * min(1.0, t["cov"]))
            + (0.25 if t["praise"] else 0)
            + (0.15 if t["producer"] else 0)
            + 0.1 * min(1.0, max(0.0, (t["pace"] - 1.8) / 1.4)), 3)

    ranked = {s: sorted([t for t in takes if t["scene"] == s],
                        key=lambda t: (not t["gate_ok"], -t["score"]))
              for s in SCRIPTS}

    # 5. build selects: ALL gate-passing takes per scene, best first
    sels = []
    for scene in ("A", "B"):
        for rank, t in enumerate([x for x in ranked[scene] if x["gate_ok"]], 1):
            r = t["region"]
            d = sync_by_wav[r["name"]]
            wav_in = (t["in"] - r["tl_start"]) + r["src_in"]
            wav_out = (t["out"] - r["tl_start"]) + r["src_in"]
            label = (f"SCENE {scene} — TAKE {t['take_number'] or '?'}"
                     + (" ★PRODUCER" if t["producer"] else "")
                     + (f" [{t['praise']}]" if t["praise"] else ""))
            sels.append(Select(
                label=label, sync=d, rank=rank,
                wav_in_sec=wav_in, wav_out_sec=wav_out,
                quote=(SCRIPTS[scene][:60] + "…"),
                reason=(f"cov {t['cov']:.0%}, pace {t['pace']:.1f} w/s"
                        + (f", director: {t['praise']!r}" if t["praise"] else "")
                        + (", producer favorite" if t["producer"] else "")),
                pre_handle_sec=2.0, post_handle_sec=1.5,
            ))

    xml, excluded = build_selects_sequence(sels, "02_SELECTS_MASTER_v002")
    (out / "SELECTS_MASTER_v002.xml").write_text(xml, encoding="utf-8")

    lines = ["# Paper Cut — Noemi :30 (all takes, both scenes)", ""]
    for scene in ("A", "B"):
        lines += [f"## Scene {scene}: \"{SCRIPTS[scene][:70]}…\"", ""]
        for t in ranked[scene]:
            r = t["region"]
            wav = r["name"] if r else "?"
            cam = sync_by_wav[wav].video.name if wav in sync_by_wav else "?"
            status = "PLACED" if t["gate_ok"] else "excluded (incomplete/flubbed)"
            lines += [
                f"### Take {t['take_number'] or '?'} — {wav} / {cam} — "
                f"score {t['score']} — {status}",
                f"- coverage {t['cov']:.0%}, pace {t['pace']:.1f} w/s"
                + (f", director: \"{t['praise']}\"" if t["praise"] else "")
                + (", ★ producer favorite" if t["producer"] else ""),
                f"- WAV {(t['in'] - r['tl_start']):.1f}s–{(t['out'] - r['tl_start']):.1f}s"
                if r else "- unmapped",
            ]
            if t["flubs"]:
                lines += ["- flubs: " + "; ".join(t["flubs"][:4])]
            lines += [""]
    (out / "papercut_v002.md").write_text("\n".join(lines), encoding="utf-8")

    for scene in ("A", "B"):
        print(f"\nScene {scene}:")
        for t in ranked[scene]:
            r = t["region"]
            print(f"  take {str(t['take_number'] or '?'):>2s} {r['name'] if r else '?':16s} "
                  f"cov {t['cov']:4.0%} pace {t['pace']:4.1f} score {t['score']:5.3f} "
                  f"{'★' if t['producer'] else ' '} {t['praise'] or ''}"
                  f"{' GATE-FAIL' if not t['gate_ok'] else ''}")
    print(f"\nexcluded at build: {[e.why for e in excluded]}")
    print("wrote SELECTS_MASTER_v002.xml and papercut_v002.md")


if __name__ == "__main__":
    main()
