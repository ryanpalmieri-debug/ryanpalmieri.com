"""Script-to-transcript alignment: find every scripted read inside a roll.

Production audio rolls mix slates, crew direction, and multiple takes of the
same script. This module finds the spans of a transcript that match reference
script text using overlapping n-gram matching, which naturally handles the
same line being read many times (unlike a single global alignment).

Editor ruling (2026-08-23): the authoritative script is what was actually read
on camera (the prompter copy), so the reference text is reconstructed from the
best full takes and per-project materials.
"""

from __future__ import annotations

import re
from dataclasses import dataclass

from .transcript import Transcript

_WORD_RE = re.compile(r"[a-z0-9']+")


def normalize_token(text: str) -> str:
    """Lowercase, punctuation-stripped token ('' for non-lexical entries)."""
    m = _WORD_RE.findall(text.lower().replace("’", "'"))
    return "".join(m)


def tokenize_script(script_text: str) -> list[str]:
    return [t for t in (normalize_token(w) for w in script_text.split()) if t]


@dataclass
class ReadSpan:
    """A contiguous region of the transcript that tracks the script."""

    word_start: int  # transcript word indices (inclusive)
    word_end: int
    time_start: float
    time_end: float
    script_start: int  # matched script token range (inclusive)
    script_end: int
    matched_words: int

    @property
    def duration(self) -> float:
        return self.time_end - self.time_start

    def coverage_of(self, script_len: int) -> float:
        return (self.script_end - self.script_start + 1) / script_len


def find_read_spans(
    transcript: Transcript,
    script_text: str,
    ngram: int = 4,
    max_gap_words: int = 10,
) -> list[ReadSpan]:
    """Return transcript spans that match the script, one span per read/take.

    A transcript word is script-anchored when it participates in any n-gram
    shared with the script. Anchored words at most `max_gap_words` apart merge
    into one span (tolerating stumbles, restarts, and recognition errors).
    """
    script_tokens = tokenize_script(script_text)
    if len(script_tokens) < ngram or not transcript.words:
        return []

    grams: dict[tuple[str, ...], list[int]] = {}
    for i in range(len(script_tokens) - ngram + 1):
        grams.setdefault(tuple(script_tokens[i:i + ngram]), []).append(i)

    norm = [normalize_token(w.text) for w in transcript.words]
    # anchored[i] = script position matched by transcript word i (first wins)
    anchored: dict[int, int] = {}
    for j in range(len(norm) - ngram + 1):
        window = tuple(norm[j:j + ngram])
        if "" in window:
            continue
        positions = grams.get(window)
        if not positions:
            continue
        for k in range(ngram):
            anchored.setdefault(j + k, positions[0] + k)

    if not anchored:
        return []

    spans: list[ReadSpan] = []
    indices = sorted(anchored)
    start = prev = indices[0]
    for j in indices[1:] + [None]:
        if j is not None and j - prev <= max_gap_words:
            prev = j
            continue
        in_span = [i for i in indices if start <= i <= prev]
        s_positions = [anchored[i] for i in in_span]
        t0, t1 = transcript.slice_bounds(start, prev)
        spans.append(ReadSpan(
            word_start=start, word_end=prev,
            time_start=t0, time_end=t1,
            script_start=min(s_positions), script_end=max(s_positions),
            matched_words=len(in_span),
        ))
        if j is not None:
            start = prev = j
    return spans
