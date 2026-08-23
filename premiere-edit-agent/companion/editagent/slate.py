"""Spoken-slate parsing: map "take N" language to positions in a roll.

Production audio captures the verbal slate ("One. Alpha. Take one. Mark."),
so transcripts let the tool number takes the way the crew and producers do.
That makes feedback like "the producer liked takes 3 and 4" resolvable to
actual clips and time ranges without anyone scrubbing footage.
"""

from __future__ import annotations

import re
from dataclasses import dataclass

from .transcript import Transcript

_NUMBER_WORDS = {
    "one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6,
    "seven": 7, "eight": 8, "nine": 9, "ten": 10, "eleven": 11, "twelve": 12,
    "thirteen": 13, "fourteen": 14, "fifteen": 15, "sixteen": 16,
    "seventeen": 17, "eighteen": 18, "nineteen": 19, "twenty": 20,
}


def _as_number(token: str) -> int | None:
    t = re.sub(r"[^\w]", "", token.lower())
    if t.isdigit():
        return int(t)
    return _NUMBER_WORDS.get(t)


@dataclass
class SlateCall:
    take_number: int
    word_index: int   # index of the word "take"
    time: float       # seconds, start of the slate phrase
    confirmed_by_mark: bool  # "mark(er)" heard within a few words


def find_slates(t: Transcript, mark_window: int = 4) -> list[SlateCall]:
    """Find 'take <number>' phrases; a nearby 'mark' strengthens the match."""
    out: list[SlateCall] = []
    for w in t.words:
        if re.sub(r"[^\w]", "", w.text.lower()) != "take":
            continue
        nxt = t.words[w.index + 1] if w.index + 1 < len(t.words) else None
        if nxt is None:
            continue
        n = _as_number(nxt.text)
        if n is None:
            continue
        following = t.words[w.index + 2: w.index + 2 + mark_window]
        marked = any(
            re.sub(r"[^\w]", "", f.text.lower()) in ("mark", "marker")
            for f in following
        )
        out.append(SlateCall(
            take_number=n, word_index=w.index, time=w.start,
            confirmed_by_mark=marked,
        ))
    return out
