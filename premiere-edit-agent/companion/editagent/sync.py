"""Camera-clip ↔ production-audio pairing and sync-offset computation.

Sync hierarchy (per project requirements): trustworthy matching timecode first,
waveform correlation second, slate-assist third, and everything below the
confidence bar is flagged for review — never silently guessed.

This module implements the timecode stage; the waveform stage plugs in behind
the same SyncDecision shape (see `method`/`confidence`).
"""

from __future__ import annotations

from dataclasses import dataclass, asdict

from .fcp7 import Inventory, MediaFile

# A timecode pairing is only trusted when the ranges genuinely overlap; the
# waveform stage refines/validates the offset when audio access is available.
TIMECODE_CONFIDENCE = 0.9


@dataclass
class SyncDecision:
    video: MediaFile
    audio: MediaFile | None
    status: str  # "synced" | "flagged"
    method: str | None  # "timecode" | "waveform" | "slate_assisted" | None
    offset_frames: int | None  # audio start relative to video start (may be < 0)
    overlap_frames: int | None
    confidence: float | None
    flag_reason: str | None = None

    def to_record(self) -> dict:
        d = asdict(self)
        d["video"] = self.video.name
        d["audio"] = self.audio.name if self.audio else None
        return d


def pair_by_timecode(inventory: Inventory) -> list[SyncDecision]:
    """Pair every camera clip with the WAV whose timecode range overlaps it
    most. Clips with no overlap (or no timecode) are flagged."""
    decisions: list[SyncDecision] = []
    for v in inventory.videos:
        if v.tc_frames is None:
            decisions.append(SyncDecision(
                video=v, audio=None, status="flagged", method=None,
                offset_frames=None, overlap_frames=None, confidence=None,
                flag_reason="no embedded timecode on camera clip",
            ))
            continue
        best: tuple[MediaFile, int] | None = None
        for a in inventory.audios:
            if a.tc_frames is None:
                continue
            overlap = (min(v.tc_frames + v.duration, a.tc_frames + a.duration)
                       - max(v.tc_frames, a.tc_frames))
            if overlap > 0 and (best is None or overlap > best[1]):
                best = (a, overlap)
        if best is None:
            decisions.append(SyncDecision(
                video=v, audio=None, status="flagged", method=None,
                offset_frames=None, overlap_frames=None, confidence=None,
                flag_reason="no production audio overlaps its timecode",
            ))
        else:
            a, overlap = best
            decisions.append(SyncDecision(
                video=v, audio=a, status="synced", method="timecode",
                offset_frames=a.tc_frames - v.tc_frames,
                overlap_frames=overlap, confidence=TIMECODE_CONFIDENCE,
            ))
    return decisions


def synced(decisions: list[SyncDecision]) -> list[SyncDecision]:
    return [d for d in decisions if d.status == "synced"]


def flagged(decisions: list[SyncDecision]) -> list[SyncDecision]:
    return [d for d in decisions if d.status == "flagged"]
