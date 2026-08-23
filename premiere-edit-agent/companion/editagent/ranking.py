"""Line-by-line take ranking across all rolls.

Implements docs/06-take-criteria.md: gates (accuracy, completeness, diction),
provisional workability scoring, and external modifiers (producer favorites).
Weights are DRAFT until the editor ranks the criteria; every candidate carries
its per-criterion evidence so re-weighting re-ranks without re-analysis.
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field

from .align import find_read_spans, tokenize_script
from .delivery import DeliveryMetrics, compute_delivery
from .transcript import Transcript

# Gate thresholds (docs/06 A1-A3)
MIN_ACCURACY = 0.8          # matched-token ratio vs. the script line
MIN_COMPLETENESS = 0.9      # contiguous coverage of the line
MAX_LOW_CONFIDENCE = 0.25   # mumble proxy
PRODUCER_BOOST = 0.15


def split_script_lines(script_text: str) -> list[str]:
    """Split a script into rankable lines (sentence-ish units)."""
    parts = re.split(r"(?<=[.!?])\s+|\n+", script_text.strip())
    return [p.strip() for p in parts if len(tokenize_script(p)) >= 3]


@dataclass
class LineTake:
    """One candidate read of one script line, with evidence."""

    line_index: int
    line_text: str
    media_name: str           # transcript/media this take lives in
    word_start: int
    word_end: int
    time_start: float
    time_end: float
    accuracy: float           # gate 1 evidence
    completeness: float       # gate 2 evidence
    low_confidence_ratio: float  # gate 3 evidence
    metrics: DeliveryMetrics
    take_number: int | None = None      # from slate parsing when known
    producer_favorite: bool = False
    excluded: str | None = None         # gate-failure reason, else None
    notes: list[str] = field(default_factory=list)

    @property
    def score(self) -> float:
        """Provisional workability score (draft weights, docs/06 open Q2)."""
        base = self.metrics.energy_score  # pace/fluency/cleanliness/clarity proxy
        boost = PRODUCER_BOOST if self.producer_favorite else 0.0
        return round(min(1.0, base + boost), 3)


def find_line_takes(
    line_index: int,
    line_text: str,
    transcript: Transcript,
    media_name: str,
    producer_take_numbers: set[int] | None = None,
    take_number: int | None = None,
) -> list[LineTake]:
    """All candidate reads of one script line within one transcript."""
    line_tokens = tokenize_script(line_text)
    ngram = min(4, max(2, len(line_tokens) - 1))
    spans = find_read_spans(transcript, line_text, ngram=ngram, max_gap_words=4)
    takes: list[LineTake] = []
    for sp in spans:
        accuracy = sp.matched_words / max(1, sp.word_end - sp.word_start + 1)
        completeness = (sp.script_end - sp.script_start + 1) / len(line_tokens)
        metrics = compute_delivery(transcript, sp.word_start, sp.word_end)
        take = LineTake(
            line_index=line_index,
            line_text=line_text,
            media_name=media_name,
            word_start=sp.word_start,
            word_end=sp.word_end,
            time_start=sp.time_start,
            time_end=sp.time_end,
            accuracy=round(accuracy, 3),
            completeness=round(completeness, 3),
            low_confidence_ratio=metrics.low_confidence_ratio,
            metrics=metrics,
            take_number=take_number,
            producer_favorite=bool(
                take_number is not None
                and producer_take_numbers
                and take_number in producer_take_numbers
            ),
        )
        if completeness < MIN_COMPLETENESS:
            take.excluded = f"incomplete read ({completeness:.0%} of line)"
        elif accuracy < MIN_ACCURACY:
            take.excluded = f"off-script ({accuracy:.0%} token match)"
        elif metrics.low_confidence_ratio > MAX_LOW_CONFIDENCE:
            take.excluded = (
                f"unclear diction ({metrics.low_confidence_ratio:.0%} "
                "low-confidence words)")
        takes.append(take)
    return takes


def rank_lines(
    script_text: str,
    transcripts: dict[str, Transcript],   # media_name -> transcript
    producer_take_numbers: set[int] | None = None,
    take_numbers: dict[str, int] | None = None,  # media_name -> take number
) -> dict[int, list[LineTake]]:
    """For every script line, all candidates across all rolls, best first.

    Passing candidates sort by score; gate-failed candidates follow, so the
    paper cut can show every take of every line with why it lost.
    """
    result: dict[int, list[LineTake]] = {}
    for i, line in enumerate(split_script_lines(script_text)):
        candidates: list[LineTake] = []
        for media_name, t in transcripts.items():
            candidates.extend(find_line_takes(
                i, line, t, media_name,
                producer_take_numbers=producer_take_numbers,
                take_number=(take_numbers or {}).get(media_name),
            ))
        candidates.sort(key=lambda c: (c.excluded is not None, -c.score))
        result[i] = candidates
    return result
