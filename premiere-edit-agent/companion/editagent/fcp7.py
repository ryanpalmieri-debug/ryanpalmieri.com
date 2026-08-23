"""FCP7 XML (xmeml) parsing: media inventory extraction.

A "RAW dump" is a sequence exported from Premiere that contains every camera
clip and every production WAV untrimmed; its <file> definitions carry path,
duration, frame rate, embedded timecode, and audio channel layout — a full
media inventory without touching the source drive.
"""

from __future__ import annotations

import copy
import xml.etree.ElementTree as ET
from dataclasses import dataclass, field

from .timecode import tc_to_frames


def _txt(el: ET.Element, path: str, default: str = "") -> str:
    e = el.find(path)
    return e.text if e is not None and e.text else default


@dataclass
class MediaFile:
    """One media file as described by an FCP7 <file> definition."""

    id: str
    name: str
    path: str
    duration: int  # frames at `timebase`
    timebase: int
    ntsc: bool
    tc: str | None
    has_video: bool
    audio_channels: int
    width: int | None
    height: int | None
    element: ET.Element = field(repr=False)  # verbatim definition, for XML reuse
    _defined: bool = field(default=False, repr=False)

    @property
    def tc_frames(self) -> int | None:
        return tc_to_frames(self.tc, self.timebase) if self.tc else None

    def xml_ref(self) -> ET.Element:
        """Full <file> definition on first use, id-only reference afterwards
        (FCP7 convention). Call order therefore matters within one document."""
        if self._defined:
            return ET.Element("file", {"id": self.id})
        self._defined = True
        return copy.deepcopy(self.element)

    def reset_definition_state(self) -> None:
        self._defined = False


@dataclass
class Inventory:
    videos: list[MediaFile]
    audios: list[MediaFile]

    def all_files(self) -> list[MediaFile]:
        return self.videos + self.audios


def load_inventory(xml_path: str) -> Inventory:
    root = ET.parse(xml_path).getroot()
    files: dict[str, MediaFile] = {}
    for fe in root.iter("file"):
        fid = fe.get("id") or ""
        if fe.find("pathurl") is None:  # reference-only repeat of an earlier def
            continue
        if fid in files:
            continue
        audio_channels = sum(
            int(_txt(a, "channelcount", "1") or "1")
            for a in fe.findall("media/audio")
        )
        files[fid] = MediaFile(
            id=fid,
            name=_txt(fe, "name"),
            path=_txt(fe, "pathurl"),
            duration=int(_txt(fe, "duration", "0") or 0),
            timebase=int(_txt(fe, "rate/timebase", "24") or 24),
            ntsc=_txt(fe, "rate/ntsc") == "TRUE",
            tc=_txt(fe, "timecode/string") or None,
            has_video=fe.find("media/video") is not None,
            audio_channels=audio_channels,
            width=int(_txt(fe, "media/video/samplecharacteristics/width", "0") or 0) or None,
            height=int(_txt(fe, "media/video/samplecharacteristics/height", "0") or 0) or None,
            element=fe,
        )
    videos = sorted((f for f in files.values() if f.has_video), key=lambda f: f.name)
    audios = sorted((f for f in files.values() if not f.has_video), key=lambda f: f.name)
    return Inventory(videos=videos, audios=audios)
