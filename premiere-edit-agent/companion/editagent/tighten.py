"""Radio-cut tightening: turn a take into per-line clips with dead air removed.

The difference between an assembly and an edit (editor correction,
2026-08-23): within a take, every line becomes its own clip trimmed to its
words plus a small breath pad, and the gaps between lines collapse to a
deliberate rhythm gap instead of the subject's natural (slow) pauses.

Requires word-level timing — this is why block-level transcripts can only
produce assemblies. Pads/gaps are configurable per project and will be tuned
by the learning system from the editor's revisions.
"""

from __future__ import annotations

from dataclasses import dataclass

from .transcript import Transcript

# Defaults (seconds). Conservative: never clip into a word.
PRE_PAD = 0.15    # room before the first word (part of an intake breath)
POST_PAD = 0.14   # tail after the last word (consonant decay)
RHYTHM_GAP = 0.25  # silence kept between lines on the timeline


@dataclass
class TightenedLine:
    line_index: int
    word_start: int
    word_end: int
    src_in: float   # media seconds, padded
    src_out: float
    text: str

    @property
    def duration(self) -> float:
        return self.src_out - self.src_in


@dataclass
class TightenedCut:
    lines: list[TightenedLine]
    rhythm_gap: float

    @property
    def duration(self) -> float:
        if not self.lines:
            return 0.0
        return (sum(ln.duration for ln in self.lines)
                + self.rhythm_gap * (len(self.lines) - 1))

    def timeline(self) -> list[tuple[float, TightenedLine]]:
        """[(timeline_start_sec, line), ...] with collapsed gaps."""
        out, t = [], 0.0
        for ln in self.lines:
            out.append((t, ln))
            t += ln.duration + self.rhythm_gap
        return out


def tighten(
    t: Transcript,
    line_word_ranges: list[tuple[int, int]],
    pre_pad: float = PRE_PAD,
    post_pad: float = POST_PAD,
    rhythm_gap: float = RHYTHM_GAP,
) -> TightenedCut:
    """Per-line clips from inclusive word ranges, dead air removed.

    Pads are clamped so a clip never overlaps the neighboring line's words
    (when lines are adjacent in the same take, the available silence is split
    between the outgoing tail and the incoming breath).
    """
    lines: list[TightenedLine] = []
    for i, (ws, we) in enumerate(line_word_ranges):
        w0, w1 = t.words[ws], t.words[we]
        src_in = w0.start - pre_pad
        src_out = w1.end + post_pad
        if ws > 0:
            prev_end = t.words[ws - 1].end
            src_in = max(src_in, prev_end + min(pre_pad, (w0.start - prev_end) / 2))
        if we + 1 < len(t.words):
            next_start = t.words[we + 1].start
            src_out = min(src_out, next_start - min(post_pad, (next_start - w1.end) / 2))
        src_in = max(0.0, min(src_in, w0.start))
        src_out = max(src_out, w1.end)
        lines.append(TightenedLine(
            line_index=i, word_start=ws, word_end=we,
            src_in=src_in, src_out=src_out,
            text=t.text(ws, we + 1),
        ))
    return TightenedCut(lines=lines, rhythm_gap=rhythm_gap)


def dead_air_removed(t: Transcript, cut: TightenedCut) -> float:
    """Seconds of silence removed vs. playing the raw span start-to-end."""
    if not cut.lines:
        return 0.0
    raw = cut.lines[-1].src_out - cut.lines[0].src_in
    return raw - cut.duration
