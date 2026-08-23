#!/usr/bin/env python3
"""
Tightening demo on real footage: T_112 take 1, per-line clips, dead air
removed, gaps collapsed to a rhythm gap. Word-level timing (the only roll we
have it for) -> frame-accurate cuts. Import and compare against the raw take.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent.parent / "companion"))
import xml.etree.ElementTree as ET  # noqa: E402

from editagent.fcp7 import load_inventory  # noqa: E402
from editagent.ranking import rank_lines  # noqa: E402
from editagent.sync import pair_by_timecode, synced  # noqa: E402
from editagent.tighten import dead_air_removed, tighten  # noqa: E402
from editagent.transcript import load_transcript  # noqa: E402
from editagent.xml_builder import XML_HEADER, _rate, _sub  # noqa: E402

FPS = 23.976

SCRIPT = (
    "For 20 years, I've called Woodburn home. "
    "This is my community. "
    "I know my neighbors, I know their struggles, and I know what rising taxes "
    "are doing to families trying to get ahead. "
    "Salem keeps passing the cost down to us, and nothing is getting better."
)


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

    inv = load_inventory(str(base / "RAW_DUMP.xml"))
    d = next(x for x in synced(pair_by_timecode(inv))
             if x.audio.name == "SCENE_T_112.wav")
    t = load_transcript(str(base.parent / "fixtures" / "transcript_SCENE_T_112.json")
                        if (base.parent / "fixtures").exists()
                        else "transcript_SCENE_T_112.json", d.audio.name)

    ranked = rank_lines(SCRIPT, {d.audio.name: t})
    ranges = []
    for i in sorted(ranked):
        best = next(c for c in ranked[i] if c.excluded is None)
        ranges.append((best.word_start, best.word_end))
    cut = tighten(t, ranges)

    total_f = round(cut.duration * FPS) + 12
    cam, wav, off = d.video, d.audio, (d.offset_frames or 0) / FPS
    cam.reset_definition_state()
    wav.reset_definition_state()

    root = ET.Element("xmeml", {"version": "4"})
    project = _sub(root, "project")
    _sub(project, "name", "EditAgent_TightenDemo")
    children = _sub(project, "children")
    seq = _sub(children, "sequence", id="agent-td-1")
    _sub(seq, "name", "TIGHTEN_DEMO_T112")
    _sub(seq, "duration", total_f)
    _rate(seq, 24, True)
    media_el = _sub(seq, "media")
    vmedia = _sub(media_el, "video")
    vformat = _sub(vmedia, "format")
    schar = _sub(vformat, "samplecharacteristics")
    _rate(schar, 24, True)
    _sub(schar, "width", 4096)
    _sub(schar, "height", 2304)
    _sub(schar, "pixelaspectratio", "square")
    v1 = _sub(vmedia, "track")
    amedia = _sub(media_el, "audio")
    atracks = [_sub(amedia, "track") for _ in range(wav.audio_channels)]

    for i, (tl0, ln) in enumerate(cut.timeline()):
        f_in, f_out = round(tl0 * FPS), round((tl0 + ln.duration) * FPS)
        clip_el(v1, f"td-v-{i}", cam, f_in, f_out, ln.src_in + off, "video")
        for ch in range(1, wav.audio_channels + 1):
            clip_el(atracks[ch - 1], f"td-a{ch}-{i}", wav, f_in, f_out,
                    ln.src_in, "audio", channel=ch)
    for tr in [v1] + atracks:
        _sub(tr, "enabled", "TRUE")
        _sub(tr, "locked", "FALSE")

    m = _sub(seq, "marker")
    _sub(m, "name", "TIGHTENED")
    _sub(m, "comment",
         f"take 1 radio-cut: {dead_air_removed(t, cut):.1f}s dead air removed; "
         f"per-line clips, {cut.rhythm_gap}s rhythm gaps, word-accurate bounds")
    _sub(m, "in", 0)
    _sub(m, "out", -1)

    ET.indent(root)
    (out_dir / "TIGHTEN_DEMO_T112.xml").write_text(
        XML_HEADER + ET.tostring(root, encoding="unicode"), encoding="utf-8")
    print(f"tightened {cut.duration:.2f}s from raw "
          f"{cut.lines[-1].src_out - cut.lines[0].src_in:.2f}s "
          f"({dead_air_removed(t, cut):.2f}s removed), {len(cut.lines)} line clips")
    print("wrote TIGHTEN_DEMO_T112.xml")


if __name__ == "__main__":
    main()
