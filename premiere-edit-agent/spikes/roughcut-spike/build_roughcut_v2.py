#!/usr/bin/env python3
"""
Rough cut v2 — multi-take, line-by-line assembly (per pref_user_001).

Editor correction on v1: never a single-take spine. The cut alternates takes
and camera setups so edits read as style, following the reference spot's
shape (long open on candidate, 2-3.5s alternating cutaways, long close).

Takes used (from the ranked selects + producer favorites):
  Alpha take 3  (T_114 / C033)  open            ★producer, "really strong"
  Baker take 2  (T_118 / C037)  middle          "really strong", full reset read
  Alpha take 4  (T_115 / C034)  Salem -> close  ★producer

Output: 03_ROUGHCUT_30_v002 XML.
"""

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent.parent / "companion"))
import xml.etree.ElementTree as ET  # noqa: E402

from editagent.align import tokenize_script  # noqa: E402
from editagent.fcp7 import load_inventory  # noqa: E402
from editagent.sync import pair_by_timecode, synced  # noqa: E402
from editagent.timecode import tc_to_frames  # noqa: E402
from editagent.xml_builder import XML_HEADER, _rate, _sub  # noqa: E402

FPS = 23.976
SEQ_TB = 24

LINES = [
    "I'm Noemi Legaspi.",
    "For 20 years, I've called Woodburn home.",
    "This is my community. I know my neighbors. I know their struggles.",
    "And I know what rising taxes are doing to families trying to get ahead.",
    "Salem keeps passing the costs down to us, and nothing is getting better.",
    "I'm running to change that because as a small business owner, "
    "I know a lot more about Oregon's economy than any politician.",
]

# take id -> (wav roll, read block in RAW_DUMP timeline TC)
TAKES = {
    "A3": ("SCENE_T_114.wav", ("00:25:28:22", "00:25:58:09")),
    "A4": ("SCENE_T_115.wav", ("00:26:20:15", "00:26:50:17")),
    "B2": ("SCENE_T_118.wav", ("00:28:37:23", "00:29:10:17")),
}


def take_line_times(raw_txt, block, region_start_sec):
    """Per-line [start,end] in WAV seconds for one take's read block."""
    text = Path(raw_txt).read_text(encoding="utf-8-sig")
    s0 = tc_to_frames(block[0], SEQ_TB) / FPS
    e0 = tc_to_frames(block[1], SEQ_TB) / FPS
    m = re.search(re.escape(block[0]) + r".*?\n.*?\n(.*?)(?=\n\n)", text, re.S)
    toks = tokenize_script(" ".join(m.group(1).split()))
    per_word = (e0 - s0) / len(toks)

    def find_seq(needle, start_at):
        n = tokenize_script(needle)
        for j in range(start_at, len(toks) - len(n) + 1):
            hits = sum(1 for a, b in zip(n, toks[j:j + len(n)]) if a == b)
            if hits >= max(1, int(len(n) * 0.7)):
                return j, j + len(n)
        raise ValueError(f"line not found: {needle[:40]!r}")

    out, cursor = [], 0
    for line in LINES:
        probe = line if "Legaspi" not in line else "I'm"
        j0, j1 = find_seq(probe, cursor)
        if "Legaspi" in line:
            j1 = j0 + 3
        out.append(((s0 + j0 * per_word) - region_start_sec,
                    (s0 + j1 * per_word) - region_start_sec))
        cursor = j1
    return out


def region_starts(xml_path):
    root = ET.parse(xml_path).getroot()

    def t(el, p, d=""):
        e = el.find(p)
        return e.text if e is not None and e.text else d
    out = {}
    for tr in root.find("sequence/media").findall("audio/track"):
        for c in tr.findall("clipitem"):
            n = t(c, "name")
            if n.lower().endswith(".wav"):
                out[n] = int(t(c, "start", "0")) / FPS
    return out


def clip_el(track, cid, media, tl_in_f, tl_out_f, src_in_sec, mediatype, channel=None):
    src_fps = media.timebase * 1000 / 1001 if media.ntsc else media.timebase
    dur_sec = (tl_out_f - tl_in_f) / FPS
    c = _sub(track, "clipitem", id=cid)
    _sub(c, "name", media.name)
    _sub(c, "enabled", "TRUE")
    _sub(c, "duration", tl_out_f - tl_in_f)
    _rate(c, media.timebase, media.ntsc)
    _sub(c, "start", tl_in_f)
    _sub(c, "end", tl_out_f)
    _sub(c, "in", round(src_in_sec * src_fps))
    _sub(c, "out", round((src_in_sec + dur_sec) * src_fps))
    c.append(media.xml_ref())
    st = _sub(c, "sourcetrack")
    _sub(st, "mediatype", mediatype)
    if channel is not None:
        _sub(st, "trackindex", channel)
    return c


def main():
    base = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(".")
    out_dir = Path(sys.argv[2]) if len(sys.argv) > 2 else Path(".")
    raw_xml, raw_txt = str(base / "RAW_DUMP.xml"), str(base / "RAW_DUMP.txt")
    broll_xml = str(base / "BROLL_DUMP.xml")

    inv = load_inventory(raw_xml)
    sync = {d.audio.name: d for d in synced(pair_by_timecode(inv))}
    rstarts = region_starts(raw_xml)

    takes = {}
    for tid, (wavname, block) in TAKES.items():
        d = sync[wavname]
        takes[tid] = {
            "sync": d,
            "lines": take_line_times(raw_txt, block, rstarts[wavname]),
        }

    broll = load_inventory(broll_xml)
    stock = {}
    for v in broll.videos:
        if "338270285" in v.name:
            stock["aerial"] = v
        elif "340021519" in v.name:
            stock["taxes"] = v
        elif "shutterstock" in v.name.lower():
            stock["capitol"] = v
    community = next(v for v in broll.videos if v.name == "A173_05121814_C013.mov")

    pad = 0.4
    tag_hold = 2.5

    # Audio/on-camera segments: (take, wav_in, wav_out) at line boundaries
    a3, a4, b2 = takes["A3"], takes["A4"], takes["B2"]
    segs = [
        ("A3", a3, a3["lines"][0][0] - pad, a3["lines"][2][0]),   # L0-L1
        ("B2", b2, b2["lines"][2][0], b2["lines"][4][0]),         # L2-L3
        ("A4", a4, a4["lines"][4][0], a4["lines"][5][1] + pad),   # L4-L5
    ]

    # timeline positions of the segments
    tl = 0.0
    seg_tl = []
    for tid, tk, w_in, w_out in segs:
        seg_tl.append((tid, tk, w_in, w_out, tl))
        tl += (w_out - w_in)
    vo_end = tl
    total_f = round((vo_end + tag_hold) * FPS)

    def line_tl(seg_idx, line_idx, frac=0.0):
        tid, tk, w_in, w_out, t0 = seg_tl[seg_idx]
        a, b = tk["lines"][line_idx]
        return t0 + (a - w_in) + frac * (b - a)

    # V2 cutaways (script visual column x reference pacing)
    cutaways = [
        (stock["aerial"], line_tl(1, 2, 0.30), line_tl(1, 3, 0.0), 2.0,
         "aerial over 'I know my neighbors, I know their struggles' (script)"),
        (community, line_tl(1, 3, 0.05), line_tl(1, 3, 0.95), 4.0,
         "community b-roll over 'rising taxes...get ahead' — REPLACE with preferred shot"),
        (stock["taxes"], line_tl(2, 4, 0.0), line_tl(2, 4, 0.55), 1.0,
         "rising-taxes stock hides the audio take-change; reveal on camera at "
         "'and nothing is getting better'"),
        (stock["capitol"], line_tl(2, 5, 0.80), vo_end + tag_hold, 1.5,
         "capitol over 'than any politician' + PAC tag hold (script)"),
    ]

    # --- build XML ---
    for m in ([tk["sync"].video for tk in takes.values()]
              + [tk["sync"].audio for tk in takes.values()]
              + [c[0] for c in cutaways]):
        m.reset_definition_state()

    root = ET.Element("xmeml", {"version": "4"})
    project = _sub(root, "project")
    _sub(project, "name", "EditAgent_RoughCut")
    children = _sub(project, "children")
    seq = _sub(children, "sequence", id="agent-rc-2")
    _sub(seq, "name", "03_ROUGHCUT_30_v002")
    _sub(seq, "duration", total_f)
    _rate(seq, SEQ_TB, True)
    media_el = _sub(seq, "media")
    vmedia = _sub(media_el, "video")
    vformat = _sub(vmedia, "format")
    schar = _sub(vformat, "samplecharacteristics")
    _rate(schar, SEQ_TB, True)
    _sub(schar, "width", 4096)
    _sub(schar, "height", 2304)
    _sub(schar, "pixelaspectratio", "square")

    # V1: one on-camera clip per segment (real edits at line boundaries)
    v1 = _sub(vmedia, "track")
    for i, (tid, tk, w_in, w_out, t0) in enumerate(seg_tl):
        d = tk["sync"]
        cam_in = w_in + (d.offset_frames or 0) / FPS
        if i < len(seg_tl) - 1:
            end_f = round((t0 + (w_out - w_in)) * FPS)
        else:
            # hold through the tag, but never past the camera's media end —
            # the capitol b-roll on V2 covers the remainder
            cam_end_tl = t0 + (d.video.duration / FPS - cam_in)
            end_f = min(total_f, round(cam_end_tl * FPS))
        clip_el(v1, f"rc2-v1-{tid}", d.video, round(t0 * FPS), end_f, cam_in, "video")
    _sub(v1, "enabled", "TRUE")
    _sub(v1, "locked", "FALSE")

    v2 = _sub(vmedia, "track")
    for i, (m, t_in, t_out, src_in, why) in enumerate(cutaways):
        clip_el(v2, f"rc2-v2-{i}", m, round(t_in * FPS),
                min(round(t_out * FPS), total_f), src_in, "video")
    _sub(v2, "enabled", "TRUE")
    _sub(v2, "locked", "FALSE")

    amedia = _sub(media_el, "audio")
    max_ch = max(tk["sync"].audio.audio_channels for tk in takes.values())
    for ch in range(1, max_ch + 1):
        atr = _sub(amedia, "track")
        for tid, tk, w_in, w_out, t0 in seg_tl:
            clip_el(atr, f"rc2-a{ch}-{tid}", tk["sync"].audio,
                    round(t0 * FPS), round((t0 + (w_out - w_in)) * FPS),
                    w_in, "audio", channel=ch)
        _sub(atr, "enabled", "TRUE")
        _sub(atr, "locked", "FALSE")

    marks = [
        (0, "OPEN — Alpha take 3 ★",
         "'I'm Noemi Legaspi / For 20 years' — producer favorite, director "
         "'really strong'; long open per reference spot"),
        (round(seg_tl[1][4] * FPS), "CUT — Baker take 2",
         "setup change on 'This is my community' makes the take-change an "
         "intentional edit; director 'really strong'"),
        (round(cutaways[0][1] * FPS), "B-ROLL: aerial", cutaways[0][4]),
        (round(cutaways[1][1] * FPS), "B-ROLL: community (REPLACE)", cutaways[1][4]),
        (round(seg_tl[2][4] * FPS), "AUDIO CUT — Alpha take 4 ★ (hidden)",
         "take-change to producer-favorite take 4 hidden under taxes stock; "
         "on-camera reveal at 'and nothing is getting better'"),
        (round(cutaways[3][1] * FPS), "B-ROLL: capitol -> PAC tag", cutaways[3][4]),
        (round(vo_end * FPS), "PAC TAG GRAPHIC HERE",
         "'Paid for by Noemi Legaspi PAC' — 2.5s hold"),
        (0, "ALTS", "line-level alternates in 02_SELECTS_MASTER_v002: "
         "A5 (T_116 'really strong'), A2 (T_113 'Outstanding')"),
    ]
    for f, name, comment in marks:
        m = _sub(seq, "marker")
        _sub(m, "name", name)
        _sub(m, "comment", comment)
        _sub(m, "in", max(0, f))
        _sub(m, "out", -1)

    ET.indent(root)
    (out_dir / "ROUGHCUT_30_v002.xml").write_text(
        XML_HEADER + ET.tostring(root, encoding="unicode"), encoding="utf-8")

    print(f"total {total_f / FPS:.1f}s  (VO {vo_end:.1f}s + tag {tag_hold}s)")
    for tid, tk, w_in, w_out, t0 in seg_tl:
        d = tk["sync"]
        print(f"  seg {tid}: tl {t0:5.2f}-{t0 + (w_out - w_in):5.2f}s  "
              f"{d.video.name} / {d.audio.name}  wav {w_in:.2f}-{w_out:.2f}s")
    for m, t_in, t_out, src_in, why in cutaways:
        print(f"  V2 {m.name[:36]:38s} tl {t_in:5.2f}-{min(t_out, total_f / FPS):5.2f}s")
    print("wrote ROUGHCUT_30_v002.xml")


if __name__ == "__main__":
    main()
