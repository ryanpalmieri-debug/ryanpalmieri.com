"""Line-by-line ranking tests on the real T_112 roll."""

import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).parent.parent))
from editagent.ranking import rank_lines, split_script_lines  # noqa: E402
from editagent.transcript import load_transcript  # noqa: E402

FIXTURE = Path(__file__).parent.parent.parent / "fixtures" / "transcript_SCENE_T_112.json"

SCRIPT = (
    "For 20 years, I've called Woodburn home. "
    "This is my community. "
    "I know my neighbors, I know their struggles, and I know what rising taxes "
    "are doing to families trying to get ahead. "
    "Salem keeps passing the cost down to us, and nothing is getting better. "
    "I'm running to change that, because a small business owner who's made "
    "payroll knows a lot more about Oregon's economy than any politician."
)


def test_split_lines():
    lines = split_script_lines(SCRIPT)
    assert len(lines) == 5
    assert lines[0].startswith("For 20 years")
    assert lines[-1].endswith("politician.")


@pytest.fixture(scope="module")
def ranked():
    t = load_transcript(str(FIXTURE), "SCENE_T_112.wav")
    return rank_lines(
        SCRIPT, {"SCENE_T_112.wav": t},
        producer_take_numbers={3, 4}, take_numbers={"SCENE_T_112.wav": 1},
    )


def test_line0_has_two_candidates(ranked):
    # "For 20 years..." is read twice on this roll (main take + late partial)
    line0 = ranked[0]
    assert len(line0) == 2
    passing = [c for c in line0 if c.excluded is None]
    assert len(passing) == 2
    assert all(c.accuracy >= 0.8 and c.completeness >= 0.9 for c in passing)


def test_line_coverage_matches_the_roll(ranked):
    # Roll 112 truth: lines 0-3 each have at least one complete read, but the
    # closing line (4) is never delivered in one piece on this roll — she is
    # cut off at "change." and the pickup covers only the tail. The gates must
    # surface that as excluded-incomplete candidates, not silently pass them.
    for i in range(4):
        assert any(c.excluded is None for c in ranked[i]), \
            f"line {i} should have a passing candidate"
    line4 = ranked[4]
    assert line4, "closing line should still have partial candidates"
    assert all(c.excluded and "incomplete" in c.excluded for c in line4)


def test_no_producer_boost_on_take_one(ranked):
    # T_112 is take 1; producer favorites are 3 & 4 — no boost applies here.
    for candidates in ranked.values():
        assert all(not c.producer_favorite for c in candidates)


def test_ranking_order(ranked):
    for candidates in ranked.values():
        passing = [c for c in candidates if c.excluded is None]
        scores = [c.score for c in passing]
        assert scores == sorted(scores, reverse=True)
        # excluded candidates, if any, come after passing ones
        flags = [c.excluded is not None for c in candidates]
        assert flags == sorted(flags)
