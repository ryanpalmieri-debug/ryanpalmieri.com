"""Adobe transcript JSON parsing and word-level analysis primitives.

Format: the Premiere Pro transcript JSON spec (speakers, segments, words with
start/duration/confidence/eos/tags). Both Premiere's Speech-to-Text export and
the Whisper fallback are normalized to this shape, so everything downstream
(selects analysis, pause decisions, learning anchors) consumes one format.

Word indices into `Transcript.words` are the canonical transcript anchors used
across the pipeline (EDLs, edit events, preferences).
"""

from __future__ import annotations

import json
from dataclasses import dataclass


@dataclass(frozen=True)
class Word:
    index: int  # position in Transcript.words — the anchor coordinate
    text: str
    start: float  # seconds from media start
    duration: float
    confidence: float
    eos: bool
    tags: tuple[str, ...]
    speaker_id: str

    @property
    def end(self) -> float:
        return self.start + self.duration

    @property
    def is_disfluency(self) -> bool:
        return "disfluency" in self.tags or "filler" in self.tags


@dataclass(frozen=True)
class Pause:
    """Silence between two consecutive words."""

    after_word: int  # index of the word the pause follows
    start: float
    duration: float


@dataclass
class Transcript:
    media_name: str
    language: str
    speakers: dict[str, str]  # id -> name
    words: list[Word]

    @property
    def duration(self) -> float:
        return self.words[-1].end if self.words else 0.0

    def text(self, start: int = 0, end: int | None = None) -> str:
        """Plain text of words[start:end] (skips empty disfluency placeholders)."""
        return " ".join(w.text for w in self.words[start:end] if w.text)

    def pauses(self, min_seconds: float = 0.5) -> list[Pause]:
        out = []
        for prev, nxt in zip(self.words, self.words[1:]):
            gap = nxt.start - prev.end
            if gap >= min_seconds:
                out.append(Pause(after_word=prev.index, start=prev.end, duration=gap))
        return out

    def slice_bounds(self, word_start: int, word_end: int) -> tuple[float, float]:
        """Media-time bounds (seconds) of an inclusive word range."""
        return self.words[word_start].start, self.words[word_end].end


def load_transcript(path: str, media_name: str = "") -> Transcript:
    with open(path, encoding="utf-8-sig") as fh:
        data = json.load(fh)
    speakers = {s["id"]: s.get("name", "Unknown") for s in data.get("speakers", [])}
    words: list[Word] = []
    for seg in data.get("segments", []):
        speaker = seg.get("speaker", "")
        for w in seg.get("words", []):
            if w.get("type") == "punctuation":
                continue
            words.append(Word(
                index=len(words),
                text=w.get("text", ""),
                start=float(w["start"]),
                duration=float(w.get("duration", 0.0)),
                confidence=float(w.get("confidence", 0.0)),
                eos=bool(w.get("eos", False)),
                tags=tuple(w.get("tags", [])),
                speaker_id=speaker,
            ))
    words.sort(key=lambda w: w.start)
    words = [Word(index=i, text=w.text, start=w.start, duration=w.duration,
                  confidence=w.confidence, eos=w.eos, tags=w.tags,
                  speaker_id=w.speaker_id) for i, w in enumerate(words)]
    return Transcript(
        media_name=media_name,
        language=data.get("language", "??-??"),
        speakers=speakers,
        words=words,
    )
