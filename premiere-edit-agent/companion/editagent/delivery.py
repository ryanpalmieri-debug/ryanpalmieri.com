"""Delivery metrics: how a take was performed, not just what was said.

Word-timing data carries real delivery signal even before audio analysis:
pace, fluency, hesitation, stumbles, and pause placement all differ between a
flat read and an energized one. These metrics feed take ranking when the
project's criteria weight delivery (e.g. a commercial subject with wooden
delivery, where the edit must manufacture energy).

These are transcript-derived proxies. True prosody (pitch range, loudness
dynamics — what "sounds exciting" actually is) requires audio analysis in the
companion's media stage; that module consumes the same take boundaries and
extends the same DeliveryMetrics shape. Roadmap: Phase 3.
"""

from __future__ import annotations

from dataclasses import dataclass

from .transcript import Transcript


@dataclass
class DeliveryMetrics:
    word_count: int
    duration: float           # seconds, first word start -> last word end
    speech_rate: float        # words/sec including pauses (drive, momentum)
    articulation_rate: float  # words/sec excluding pauses (crispness)
    pause_ratio: float        # fraction of the take spent silent
    longest_pause: float      # seconds
    filler_count: int         # disfluency/filler-tagged words
    stumble_count: int        # immediate word repetitions ("take take it")
    low_confidence_ratio: float  # mumbled/unclear words (confidence < 0.7)

    @property
    def energy_score(self) -> float:
        """0..1 proxy for delivery energy/fluency; higher is livelier.

        Anchors: ~2.8 words/sec reads as strong commercial pace, ~1.5 as flat.
        Penalties for hesitation and stumbles. Audio prosody will refine this;
        the editor's own rankings recalibrate it over time (learning system).
        """
        pace = min(1.0, max(0.0, (self.speech_rate - 1.2) / 1.6))
        fluency = 1.0 - min(1.0, self.pause_ratio * 2.0)
        cleanliness = 1.0 - min(1.0, 0.15 * (self.filler_count + self.stumble_count))
        clarity = 1.0 - self.low_confidence_ratio
        return round(0.4 * pace + 0.3 * fluency + 0.2 * cleanliness + 0.1 * clarity, 3)


def compute_delivery(t: Transcript, word_start: int, word_end: int) -> DeliveryMetrics:
    """Metrics for the inclusive word range [word_start, word_end]."""
    words = t.words[word_start:word_end + 1]
    spoken = [w for w in words if w.text]
    duration = max(1e-6, words[-1].end - words[0].start)

    talking = sum(w.duration for w in spoken)
    gaps = [b.start - a.end for a, b in zip(words, words[1:]) if b.start > a.end]

    stumbles = sum(
        1 for a, b in zip(spoken, spoken[1:])
        if a.text.lower().strip(".,!?") == b.text.lower().strip(".,!?")
    )
    low_conf = sum(1 for w in spoken if w.confidence < 0.7)

    return DeliveryMetrics(
        word_count=len(spoken),
        duration=duration,
        speech_rate=len(spoken) / duration,
        articulation_rate=len(spoken) / max(1e-6, talking),
        pause_ratio=sum(gaps) / duration,
        longest_pause=max(gaps, default=0.0),
        filler_count=sum(1 for w in words if w.is_disfluency),
        stumble_count=stumbles,
        low_confidence_ratio=low_conf / max(1, len(spoken)),
    )
