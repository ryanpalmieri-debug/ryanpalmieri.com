"""Slate parsing tests against the real T_112 roll."""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))
from editagent.slate import find_slates  # noqa: E402
from editagent.transcript import load_transcript  # noqa: E402

FIXTURE = Path(__file__).parent.parent.parent / "fixtures" / "transcript_SCENE_T_112.json"


def test_finds_take_one_slate():
    t = load_transcript(str(FIXTURE), "SCENE_T_112.wav")
    slates = find_slates(t)
    # "One. Alpha. Take one. Mark." at ~2.76s
    confirmed = [s for s in slates if s.confirmed_by_mark]
    assert len(confirmed) == 1
    s = confirmed[0]
    assert s.take_number == 1
    assert 2 < s.time < 4


def test_no_false_slates_from_chatter():
    t = load_transcript(str(FIXTURE), "SCENE_T_112.wav")
    # Chatter contains "take" many times ("take it back to the top", "take the
    # spaces out") — none may register as a mark-confirmed slate.
    for s in find_slates(t):
        if s.confirmed_by_mark:
            assert s.take_number == 1
