"""Tightening tests on the real T_112 take (word-level fixture)."""

import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).parent.parent))
from editagent.ranking import rank_lines  # noqa: E402
from editagent.tighten import dead_air_removed, tighten  # noqa: E402
from editagent.transcript import load_transcript  # noqa: E402

FIXTURE = Path(__file__).parent.parent.parent / "fixtures" / "transcript_SCENE_T_112.json"

SCRIPT = (
    "For 20 years, I've called Woodburn home. "
    "This is my community. "
    "I know my neighbors, I know their struggles, and I know what rising taxes "
    "are doing to families trying to get ahead. "
    "Salem keeps passing the cost down to us, and nothing is getting better."
)


@pytest.fixture(scope="module")
def cut():
    t = load_transcript(str(FIXTURE), "SCENE_T_112.wav")
    ranked = rank_lines(SCRIPT, {"T_112": t})
    # best passing candidate per line, from the main take (time-ordered)
    ranges = []
    for i in sorted(ranked):
        best = next(c for c in ranked[i] if c.excluded is None)
        ranges.append((best.word_start, best.word_end))
    return t, tighten(t, ranges)


def test_no_word_clipping(cut):
    t, c = cut
    for ln in c.lines:
        assert ln.src_in <= t.words[ln.word_start].start
        assert ln.src_out >= t.words[ln.word_end].end


def test_no_neighbor_overlap(cut):
    t, c = cut
    for ln in c.lines:
        if ln.word_start > 0:
            assert ln.src_in >= t.words[ln.word_start - 1].end
        if ln.word_end + 1 < len(t.words):
            assert ln.src_out <= t.words[ln.word_end + 1].start


def test_dead_air_actually_removed(cut):
    t, c = cut
    removed = dead_air_removed(t, c)
    assert removed > 1.0, f"expected >1s of dead air removed, got {removed:.2f}s"
    # tightened cut must be shorter than the raw span
    raw = c.lines[-1].src_out - c.lines[0].src_in
    assert c.duration < raw


def test_timeline_gaps_are_rhythm_gap(cut):
    _, c = cut
    tl = c.timeline()
    for (t0, a), (t1, b) in zip(tl, tl[1:]):
        gap = t1 - (t0 + a.duration)
        assert abs(gap - c.rhythm_gap) < 1e-6
