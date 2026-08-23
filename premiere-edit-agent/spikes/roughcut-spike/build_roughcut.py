#!/usr/bin/env python3
"""
Function-3 spike: rough cut of the Noemi :30 ("I know").

Inputs:
  RAW_DUMP.xml       interview media + sync offsets
  RAW_DUMP.txt       whole-shoot transcript (block TC) -> take-3 line timing
  BROLL_DUMP.xml     b-roll media (stock matched to the script's Pond5 IDs)

Editorial plan (script visual column + pacing learned from the reference spot
26SPBC4C002H_Commonsense.mov: ~6.8s open on camera, 2-3.5s cutaways, long
close with tag):

  V1  Noemi take 3 (T_114/C033) continuous — the spine
  V2  cutaways: I-5 aerial (community) -> camera b-roll (families, REPLACE
      candidate) -> rising-taxes stock (Salem line) -> capitol (politician +
      PAC tag hold)
  A1-A6  production WAV channels of take 3

Output: 03_ROUGHCUT_30_v001 XML + notes.
"""

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent.parent / "companion"))
from editagent.align import tokenize_script  # noqa: E402
from editagent.fcp7 import load_inventory  # noqa: E402
from editagent.sync import pair_by_timecode, synced  # noqa: E402
from editagent.timecode import tc_to_frames  # noqa: E402
from editagent.xml_builder import XML_HEADER, _rate, _sub  # noqa: E402
import xml.etree.ElementTree as ET  # noqa: E402

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

TAKE3_BLOCK = ("00:25:28:22", "00:25:58:09")  # WAV-half read block, roll T_114
T114_TL_START_MIN = None  # resolved from RAW_DUMP.xml


def line_times(raw_txt_path):
    """Word-proportional [start,end] seconds (timeline of RAW_DUMP) per line."""
    text = Path(raw_txt_path).read_text(encoding="utf-8-sig")
    s0 = tc_to_frames(TAKE3_BLOCK[0], SEQ_TB) / FPS
    e0 = tc_to_frames(TAKE3_BLOCK[1], SEQ_TB) / FPS
    pat = re.compile(re.escape(TAKE3_BLOCK[0]) + r".*?\n.*?\n(.*?)(?=\n\n)", re.S)
    block_text = " ".join(pat.search(text).group(1).split())
    toks = tokenize_script(block_text)
    per_word = (e0 - s0) / len(toks)

    def find_seq(needle, start_at):
        n = tokenize_script(needle)
        for j in range(start_at, len(toks) - len(n) + 1):
            hits = sum(1 for a, b in zip(n, toks[j:j + len(n)]) if a == b)
            if hits >= max(1, int(len(n) * 0.7)):
                return j, j + len(n)
        raise ValueError(f"line not found in take: {needle[:40]!r}")

    out, cursor = [], 0
    for line in LINES:
        # her name is often mis-transcribed; anchor line 1 on its neighbors
        probe = line if "Legaspi" not in line else "I'm"
        j0, j1 = find_seq(probe, cursor)
        if "Legaspi" in line:
            j1 = j0 + 3  # "I'm Noemi <name>"
        out.append((s0 + j0 * per_word, s0 + j1 * per_word))
        cursor = j1
    return out


def region_tl_start(xml_path, wav_name):
    root = ET.parse(xml_path).getroot()

    def t(el, p, d=""):
        e = el.find(p)
        return e.text if e is not None and e.text else d
    for tr in root.find("sequence/media").findall("audio/track"):
        for c in tr.findall("clipitem"):
            if t(c, "name") == wav_name:
                return int(t(c, "start", "0")) / FPS
    raise ValueError(wav_name)


def clip_el(track, cid, media, tl_in_f, tl_out_f, src_in_sec, mediatype, channel=None):
    """Clipitem: timeline frames at sequence 23.976; source in/out in the
    media's own frame rate (FCP7 convention; Premiere conforms)."""
    src_fps = media.timebase * 1000 / 1001 if media.ntsc else media.timebase
    dur_sec = (tl_out_f - tl_in_f) / FPS
    in_f = round(src_in_sec * src_fps)
    out_f = round((src_in_sec + dur_sec) * src_fps)
    c = _sub(track, "clipitem", id=cid)
    _sub(c, "name", media.name)
    _sub(c, "enabled", "TRUE")
    _sub(c, "duration", tl_out_f - tl_in_f)
    _rate(c, media.timebase, media.ntsc)
    _sub(c, "start", tl_in_f)
    _sub(c, "end", tl_out_f)
    _sub(c, "in", in_f)
    _sub(c, "out", out_f)
    c.append(media.xml_ref())
    st = _sub(c, "sourcetrack")
    _sub(st, "mediatype", mediatype)
    if channel is not None:
        _sub(st, "trackindex", channel)
    return c


def main():
    base = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(".")
    raw_xml = str(base / "RAW_DUMP.xml")
    raw_txt = str(base / "RAW_DUMP.txt")
    broll_xml = str(base / "BROLL_DUMP.xml")
    out_dir = Path(sys.argv[2]) if len(sys.argv) > 2 else Path(".")

    inv = load_inventory(raw_xml)
    d114 = next(d for d in synced(pair_by_timecode(inv))
                if d.audio.name == "SCENE_T_114.wav")
    cam, wav, offset_f = d114.video, d114.audio, d114.offset_frames

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

    tl0 = region_tl_start(raw_xml, wav.name)
    lines_tl = line_times(raw_txt)
    lines_wav = [(a - tl0, b - tl0) for a, b in lines_tl]

    pad = 0.5  # breath before "I'm Noemi"
    vo_in = lines_wav[0][0] - pad
    vo_out = lines_wav[-1][1] + 0.4
    tag_hold = 2.5  # silent hold for the PAC tag graphic
    total_f = round((vo_out - vo_in + tag_hold) * FPS)

    def tl_f(wav_sec):  # wav seconds -> timeline frames
        return round((wav_sec - vo_in) * FPS)

    L = lines_wav
    # Cutaway plan (script visual column x reference pacing 2-3.5s):
    cutaways = [
        ("aerial", stock["aerial"], L[2][0], min(L[2][0] + 3.2, L[2][1]), 2.0,
         "I-5/Woodburn aerial over 'This is my community' (script)"),
        ("community", community, L[3][0] + 1.0, L[3][0] + 3.6, 4.0,
         "camera b-roll over 'families trying to get ahead' — REPLACE with "
         "preferred community shot"),
        ("taxes", stock["taxes"], L[4][0], L[4][0] + 3.0, 1.0,
         "rising-taxes stock over 'Salem keeps passing the costs' (script)"),
        ("capitol", stock["capitol"], L[5][1] - 2.2, vo_out + tag_hold, 1.5,
         "capitol over 'than any politician' + PAC tag hold (script)"),
    ]

    root = ET.Element("xmeml", {"version": "4"})
    project = _sub(root, "project")
    _sub(project, "name", "EditAgent_RoughCut")
    children = _sub(project, "children")
    seq = _sub(children, "sequence", id="agent-rc-1")
    _sub(seq, "name", "03_ROUGHCUT_30_v001")
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

    for m in [cam, wav] + [c[1] for c in cutaways]:
        m.reset_definition_state()

    # V1: talent spine, one continuous clip
    v1 = _sub(vmedia, "track")
    cam_src_in = vo_in + offset_f / FPS
    clip_el(v1, "rc-v1", cam, 0, total_f, cam_src_in, "video")
    _sub(v1, "enabled", "TRUE")
    _sub(v1, "locked", "FALSE")

    # V2: cutaways
    v2 = _sub(vmedia, "track")
    for i, (key, m, w_in, w_out, src_in, why) in enumerate(cutaways):
        clip_el(v2, f"rc-v2-{i}", m, tl_f(w_in), min(tl_f(w_out), total_f),
                src_in, "video")
    _sub(v2, "enabled", "TRUE")
    _sub(v2, "locked", "FALSE")

    # A1-A6: production WAV
    amedia = _sub(media_el, "audio")
    for ch in range(1, wav.audio_channels + 1):
        atr = _sub(amedia, "track")
        clip_el(atr, f"rc-a{ch}", wav, 0, round((vo_out - vo_in) * FPS),
                vo_in, "audio", channel=ch)
        _sub(atr, "enabled", "TRUE")
        _sub(atr, "locked", "FALSE")

    marks = [
        (0, "OPEN — on camera",
         "Take 3 (producer fav + 'really strong'); open on candidate per "
         "reference spot pacing (~6.8s before first cutaway)"),
        (tl_f(L[2][0]), "CUTAWAY: aerial", cutaways[0][5]),
        (tl_f(L[3][0] + 1.0), "CUTAWAY: community (REPLACE)", cutaways[1][5]),
        (tl_f(L[4][0]), "CUTAWAY: rising taxes", cutaways[2][5]),
        (tl_f(L[5][1] - 2.2), "CUTAWAY: capitol -> PAC tag", cutaways[3][5]),
        (round((vo_out - vo_in) * FPS), "PAC TAG GRAPHIC HERE",
         "'Paid for by Noemi Legaspi PAC' — graphic/VO not in V1 scope; "
         "2.5s hold reserved"),
        (0, "ALTS", "VO alternates: take 2 (T_113, director 'Outstanding'), "
         "take 5 (T_116, 'really strong'); swap spine via selects sequence"),
    ]
    for f, name, comment in marks:
        m = _sub(seq, "marker")
        _sub(m, "name", name)
        _sub(m, "comment", comment)
        _sub(m, "in", max(0, f))
        _sub(m, "out", -1)

    ET.indent(root)
    (out_dir / "ROUGHCUT_30_v001.xml").write_text(
        XML_HEADER + ET.tostring(root, encoding="unicode"), encoding="utf-8")

    print(f"take 3 VO: wav {vo_in:.2f}-{vo_out:.2f}s  total {total_f/FPS:.1f}s")
    for i, (a, b) in enumerate(lines_wav):
        print(f"  L{i}: {a:6.2f}-{b:6.2f}s  {LINES[i][:60]}")
    for key, m, w_in, w_out, src_in, why in cutaways:
        print(f"  V2 {key:9s} {w_in - vo_in:5.2f}-{w_out - vo_in:5.2f}s  {m.name[:40]}")
    print("wrote ROUGHCUT_30_v001.xml")


if __name__ == "__main__":
    main()
