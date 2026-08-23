#!/usr/bin/env python3
"""
Edit Agent — Phase 1 sync-assembly spike.

Reads a RAW dump FCP7 XML (a sequence containing every camera clip and every
production WAV, untrimmed) exported from Premiere, pairs camera clips to WAVs by
jammed-timecode overlap, and generates an importable FCP7 XML that creates one
synced source sequence per camera clip in the editor's convention:

    <clipfile>.movMulticam
      V1     : camera clip
      A1..An : production poly-WAV channels placed at the sync offset
      An+1.. : camera scratch audio channels

Camera clips with no overlapping WAV are reported as REVIEW and excluded, never
silently guessed.

Usage:
    python3 generate_sync_xml.py RAW_DUMP.xml -o SYNC_IMPORT_TEST.xml
"""

import argparse
import copy
import sys
import xml.etree.ElementTree as ET


def txt(el, path, default=""):
    e = el.find(path)
    return e.text if e is not None and e.text else default


def tc_to_frames(tc: str, fps: int) -> int:
    h, m, s, f = map(int, tc.replace(";", ":").split(":"))
    return ((h * 3600 + m * 60 + s) * fps) + f


def sub(parent, tag, text=None, **attrs):
    e = ET.SubElement(parent, tag, attrs)
    if text is not None:
        e.text = str(text)
    return e


class MediaFile:
    def __init__(self, file_el):
        self.el = copy.deepcopy(file_el)  # verbatim file definition, path included
        self.id = file_el.get("id")
        self.name = txt(file_el, "name")
        self.path = txt(file_el, "pathurl")
        self.duration = int(txt(file_el, "duration", "0"))
        self.timebase = int(txt(file_el, "rate/timebase", "24"))
        self.tc = txt(file_el, "timecode/string")
        self.tc_frames = tc_to_frames(self.tc, self.timebase) if self.tc else None
        self.has_video = file_el.find("media/video") is not None
        # Total audio channels: a poly WAV appears as N mono <audio> blocks, a
        # camera file as one <audio> block with <channelcount>2.
        self.audio_channels = sum(
            int(txt(a, "channelcount", "1") or "1")
            for a in file_el.findall("media/audio")
        )
        self._defined = False

    def ref(self):
        """Full definition on first use, id-only reference afterwards."""
        if self._defined:
            return ET.Element("file", {"id": self.id})
        self._defined = True
        return copy.deepcopy(self.el)


def load_inventory(raw_path):
    root = ET.parse(raw_path).getroot()
    files = {}
    for fe in root.iter("file"):
        fid = fe.get("id")
        if fe.find("pathurl") is None:  # reference-only repeat
            continue
        if fid not in files:
            files[fid] = MediaFile(fe)
    videos = [f for f in files.values() if f.has_video]
    audios = [f for f in files.values() if not f.has_video]
    videos.sort(key=lambda f: f.name)
    audios.sort(key=lambda f: f.name)
    return videos, audios


def pair_by_timecode(videos, audios):
    """Pair each camera clip with the WAV whose TC range overlaps it most."""
    pairs, unmatched = [], []
    for v in videos:
        if v.tc_frames is None:
            unmatched.append((v, "no embedded timecode"))
            continue
        best = None
        for a in audios:
            if a.tc_frames is None:
                continue
            overlap = min(v.tc_frames + v.duration, a.tc_frames + a.duration) - max(
                v.tc_frames, a.tc_frames
            )
            if overlap > 0 and (best is None or overlap > best[1]):
                best = (a, overlap)
        if best is None:
            unmatched.append((v, "no WAV overlaps its timecode"))
        else:
            a = best[0]
            pairs.append((v, a, a.tc_frames - v.tc_frames))
    return pairs, unmatched


def rate_el(parent, timebase, ntsc="TRUE"):
    r = sub(parent, "rate")
    sub(r, "timebase", timebase)
    sub(r, "ntsc", ntsc)
    return r


def clipitem(track, cid, name, start, end, in_, out, file_ref, mediatype, channel=None):
    c = sub(track, "clipitem", id=cid)
    sub(c, "name", name)
    sub(c, "enabled", "TRUE")
    sub(c, "duration", end - start)
    rate_el(c, 24)
    sub(c, "start", start)
    sub(c, "end", end)
    sub(c, "in", in_)
    sub(c, "out", out)
    c.append(file_ref)
    st = sub(c, "sourcetrack")
    sub(st, "mediatype", mediatype)
    if channel is not None:
        sub(st, "trackindex", channel)
    return c


def build_multicam_sequence(seq_id, video, wav, offset):
    """One synced source sequence in the editor's convention."""
    cam_dur = video.duration
    if offset >= 0:
        wav_start, wav_in = offset, 0
    else:  # WAV rolled before camera: trim its head instead of negative placement
        wav_start, wav_in = 0, -offset
    wav_end = wav_start + (wav.duration - wav_in)
    seq_dur = max(cam_dur, wav_end)

    seq = ET.Element("sequence", {"id": seq_id})
    sub(seq, "name", f"{video.name}Multicam")
    sub(seq, "duration", seq_dur)
    rate_el(seq, 24)
    media = sub(seq, "media")

    # --- video ---
    vmedia = sub(media, "video")
    vformat = sub(vmedia, "format")
    schar = sub(vformat, "samplecharacteristics")
    rate_el(schar, 24)
    sub(schar, "width", 4096)
    sub(schar, "height", 2304)
    sub(schar, "pixelaspectratio", "square")
    vtrack = sub(vmedia, "track")
    clipitem(vtrack, f"{seq_id}-v1", video.name, 0, cam_dur, 0, cam_dur,
             video.ref(), "video")
    sub(vtrack, "enabled", "TRUE")
    sub(vtrack, "locked", "FALSE")

    # --- audio: WAV channels, then camera scratch channels ---
    amedia = sub(media, "audio")
    n = 0
    for ch in range(1, max(1, wav.audio_channels) + 1):
        n += 1
        atrack = sub(amedia, "track")
        clipitem(atrack, f"{seq_id}-a{n}", wav.name, wav_start, wav_end,
                 wav_in, wav.duration, wav.ref(), "audio", channel=ch)
        sub(atrack, "enabled", "TRUE")
        sub(atrack, "locked", "FALSE")
    for ch in range(1, max(1, video.audio_channels) + 1):
        n += 1
        atrack = sub(amedia, "track")
        clipitem(atrack, f"{seq_id}-a{n}", video.name, 0, cam_dur,
                 0, cam_dur, video.ref(), "audio", channel=ch)
        sub(atrack, "enabled", "TRUE")
        sub(atrack, "locked", "FALSE")
    return seq


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("raw_dump")
    ap.add_argument("-o", "--out", default="SYNC_IMPORT_TEST.xml")
    args = ap.parse_args()

    videos, audios = load_inventory(args.raw_dump)
    print(f"inventory: {len(videos)} camera clips, {len(audios)} WAVs")
    pairs, unmatched = pair_by_timecode(videos, audios)

    root = ET.Element("xmeml", {"version": "4"})
    project = sub(root, "project")
    sub(project, "name", "EditAgent_Sync_Test")
    children = sub(project, "children")

    fps = 24000 / 1001
    for i, (v, a, off) in enumerate(pairs, 1):
        children.append(build_multicam_sequence(f"agent-mc-{i}", v, a, off))
        print(f"  {v.name:30s} + {a.name:18s} offset {off:5d} frames "
              f"({off / fps:6.2f}s)")
    for v, why in unmatched:
        print(f"  REVIEW: {v.name} — {why}")

    ET.indent(root)
    body = ET.tostring(root, encoding="unicode")
    with open(args.out, "w", encoding="utf-8") as fh:
        fh.write('<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE xmeml>\n')
        fh.write(body)
    print(f"\nwrote {args.out}: {len(pairs)} synced sequences, "
          f"{len(unmatched)} flagged for review")
    return 0


if __name__ == "__main__":
    sys.exit(main())
