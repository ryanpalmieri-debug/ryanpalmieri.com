"""FCP7 XML generation: synced source sequences in the editor's convention.

Validated end-to-end on Premiere 26.3 (2026-08-23): the generated project XML
imported cleanly, media auto-linked, and all synced sequences were created.
Golden reference for the target structure: fixtures/Selects_Sync_Sequence.xml.

Sequence layout per synced camera clip (`<clipfile>.movMulticam`):
    V1     camera clip
    A1..An production poly-WAV channels placed at the sync offset
    An+1.. camera scratch audio channels
"""

from __future__ import annotations

import xml.etree.ElementTree as ET

from .fcp7 import MediaFile
from .sync import SyncDecision

XML_HEADER = '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE xmeml>\n'


def _sub(parent: ET.Element, tag: str, text=None, **attrs) -> ET.Element:
    e = ET.SubElement(parent, tag, attrs)
    if text is not None:
        e.text = str(text)
    return e


def _rate(parent: ET.Element, timebase: int, ntsc: bool) -> None:
    r = _sub(parent, "rate")
    _sub(r, "timebase", timebase)
    _sub(r, "ntsc", "TRUE" if ntsc else "FALSE")


def _clipitem(track, cid, media: MediaFile, start, end, in_, out,
              mediatype, timebase, ntsc, channel=None):
    c = _sub(track, "clipitem", id=cid)
    _sub(c, "name", media.name)
    _sub(c, "enabled", "TRUE")
    _sub(c, "duration", end - start)
    _rate(c, timebase, ntsc)
    _sub(c, "start", start)
    _sub(c, "end", end)
    _sub(c, "in", in_)
    _sub(c, "out", out)
    c.append(media.xml_ref())
    st = _sub(c, "sourcetrack")
    _sub(st, "mediatype", mediatype)
    if channel is not None:
        _sub(st, "trackindex", channel)
    return c


def build_synced_sequence(seq_id: str, decision: SyncDecision) -> ET.Element:
    """One synced source sequence for a synced SyncDecision."""
    assert decision.status == "synced" and decision.audio is not None
    video, wav, offset = decision.video, decision.audio, decision.offset_frames or 0
    timebase, ntsc = video.timebase, video.ntsc

    cam_dur = video.duration
    if offset >= 0:
        wav_start, wav_in = offset, 0
    else:  # audio rolled before camera: trim the WAV head
        wav_start, wav_in = 0, -offset
    wav_end = wav_start + (wav.duration - wav_in)
    seq_dur = max(cam_dur, wav_end)

    seq = ET.Element("sequence", {"id": seq_id})
    _sub(seq, "name", f"{video.name}Multicam")
    _sub(seq, "duration", seq_dur)
    _rate(seq, timebase, ntsc)
    media = _sub(seq, "media")

    vmedia = _sub(media, "video")
    vformat = _sub(vmedia, "format")
    schar = _sub(vformat, "samplecharacteristics")
    _rate(schar, timebase, ntsc)
    if video.width and video.height:
        _sub(schar, "width", video.width)
        _sub(schar, "height", video.height)
        _sub(schar, "pixelaspectratio", "square")
    vtrack = _sub(vmedia, "track")
    _clipitem(vtrack, f"{seq_id}-v1", video, 0, cam_dur, 0, cam_dur,
              "video", timebase, ntsc)
    _sub(vtrack, "enabled", "TRUE")
    _sub(vtrack, "locked", "FALSE")

    amedia = _sub(media, "audio")
    n = 0
    for ch in range(1, max(1, wav.audio_channels) + 1):
        n += 1
        atrack = _sub(amedia, "track")
        _clipitem(atrack, f"{seq_id}-a{n}", wav, wav_start, wav_end,
                  wav_in, wav.duration, "audio", timebase, ntsc, channel=ch)
        _sub(atrack, "enabled", "TRUE")
        _sub(atrack, "locked", "FALSE")
    for ch in range(1, max(1, video.audio_channels) + 1):
        n += 1
        atrack = _sub(amedia, "track")
        _clipitem(atrack, f"{seq_id}-a{n}", video, 0, cam_dur, 0, cam_dur,
                  "audio", timebase, ntsc, channel=ch)
        _sub(atrack, "enabled", "TRUE")
        _sub(atrack, "locked", "FALSE")
    return seq


def build_sync_project(decisions: list[SyncDecision],
                       project_name: str = "EditAgent_Sync") -> str:
    """Full importable project XML containing one synced sequence per synced
    decision. Flagged decisions are excluded (they go to the review report)."""
    for d in decisions:  # fresh document: reset first-use/reference tracking
        d.video.reset_definition_state()
        if d.audio:
            d.audio.reset_definition_state()

    root = ET.Element("xmeml", {"version": "4"})
    project = _sub(root, "project")
    _sub(project, "name", project_name)
    children = _sub(project, "children")
    n = 0
    for d in decisions:
        if d.status != "synced":
            continue
        n += 1
        children.append(build_synced_sequence(f"agent-mc-{n}", d))
    ET.indent(root)
    return XML_HEADER + ET.tostring(root, encoding="unicode")
