"""Selects sequence generation: place chosen takes into an importable sequence.

A Select is an editorial decision expressed in WAV time (the transcript's
timebase). The builder converts to camera time via the sync offset, applies
handles, verifies camera coverage (a take with no camera media is excluded and
reported, never silently placed), and emits an FCP7 XML sequence with the
camera on V1 and the production-WAV channels on A1..An, plus a marker per
select carrying the quote and reason.
"""

from __future__ import annotations

import xml.etree.ElementTree as ET
from dataclasses import dataclass

from .sync import SyncDecision
from .xml_builder import XML_HEADER, _clipitem, _rate, _sub


@dataclass
class Select:
    label: str            # e.g. "SELECT 1" / "ALT of SELECT 1"
    sync: SyncDecision    # which camera+WAV pair this take lives in
    wav_in_sec: float     # content bounds in WAV time (no handles)
    wav_out_sec: float
    quote: str
    reason: str
    rank: int = 1
    pre_handle_sec: float = 3.0
    post_handle_sec: float = 2.0


@dataclass
class ExcludedSelect:
    select: Select
    why: str


def _fps(timebase: int, ntsc: bool) -> float:
    return timebase * 1000 / 1001 if ntsc else float(timebase)


def build_selects_sequence(
    selects: list[Select],
    sequence_name: str = "02_SELECTS_MASTER_v001",
) -> tuple[str, list[ExcludedSelect]]:
    """Returns (project XML string, excluded selects with reasons)."""
    placed: list[tuple[Select, int, int, int]] = []  # sel, wav_in_f, wav_out_f, cam_in_f
    excluded: list[ExcludedSelect] = []

    for sel in selects:
        d = sel.sync
        video, wav, offset = d.video, d.audio, d.offset_frames or 0
        fps = _fps(video.timebase, video.ntsc)
        wav_in_f = max(0, round((sel.wav_in_sec - sel.pre_handle_sec) * fps))
        wav_out_f = min(wav.duration, round((sel.wav_out_sec + sel.post_handle_sec) * fps))
        # camera source frame for a WAV frame: cam = wav + offset
        cam_in_f, cam_out_f = wav_in_f + offset, wav_out_f + offset
        if cam_in_f < 0 or cam_out_f > video.duration:
            # trim handles into coverage before giving up
            cam_in_f = max(cam_in_f, 0)
            cam_out_f = min(cam_out_f, video.duration)
            content_cam_in = round(sel.wav_in_sec * fps) + offset
            content_cam_out = round(sel.wav_out_sec * fps) + offset
            if content_cam_in < 0 or content_cam_out > video.duration:
                excluded.append(ExcludedSelect(
                    sel, f"no camera coverage: take lies outside {video.name} "
                         f"({video.duration} frames)"))
                continue
            wav_in_f, wav_out_f = cam_in_f - offset, cam_out_f - offset
        placed.append((sel, wav_in_f, wav_out_f, cam_in_f))

    if not placed:
        raise ValueError("no selects with camera coverage")

    first_video = placed[0][0].sync.video
    timebase, ntsc = first_video.timebase, first_video.ntsc

    for sel, *_ in placed:  # deterministic file def emission
        sel.sync.video.reset_definition_state()
        sel.sync.audio.reset_definition_state()

    root = ET.Element("xmeml", {"version": "4"})
    project = _sub(root, "project")
    _sub(project, "name", "EditAgent_Selects")
    children = _sub(project, "children")
    seq = _sub(children, "sequence", id="agent-selects-1")
    _sub(seq, "name", sequence_name)
    _rate(seq, timebase, ntsc)
    media = _sub(seq, "media")

    vmedia = _sub(media, "video")
    vformat = _sub(vmedia, "format")
    schar = _sub(vformat, "samplecharacteristics")
    _rate(schar, timebase, ntsc)
    if first_video.width and first_video.height:
        _sub(schar, "width", first_video.width)
        _sub(schar, "height", first_video.height)
        _sub(schar, "pixelaspectratio", "square")
    vtrack = _sub(vmedia, "track")

    max_wav_ch = max(p[0].sync.audio.audio_channels for p in placed)
    amedia = _sub(media, "audio")
    atracks = [_sub(amedia, "track") for _ in range(max_wav_ch)]

    t = 0
    n = 0
    marker_info = []
    for sel, wav_in_f, wav_out_f, cam_in_f in placed:
        n += 1
        length = wav_out_f - wav_in_f
        video, wav = sel.sync.video, sel.sync.audio
        _clipitem(vtrack, f"sel-{n}-v", video, t, t + length,
                  cam_in_f, cam_in_f + length, "video", timebase, ntsc)
        for ch in range(1, wav.audio_channels + 1):
            _clipitem(atracks[ch - 1], f"sel-{n}-a{ch}", wav, t, t + length,
                      wav_in_f, wav_out_f, "audio", timebase, ntsc, channel=ch)
        marker_info.append((t, sel))
        t += length

    _sub(seq, "duration", t)
    for start, sel in marker_info:
        m = _sub(seq, "marker")
        _sub(m, "name", f"{sel.label} (rank {sel.rank})")
        _sub(m, "comment",
             f'{sel.quote} | {sel.reason} | src {sel.sync.video.name}')
        _sub(m, "in", start)
        _sub(m, "out", -1)

    for tr in [vtrack] + atracks:
        _sub(tr, "enabled", "TRUE")
        _sub(tr, "locked", "FALSE")

    ET.indent(root)
    return XML_HEADER + ET.tostring(root, encoding="unicode"), excluded
