"""Transcript parsing tests against the real SCENE_T_112 Premiere STT export."""

import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).parent.parent))
from editagent.transcript import load_transcript  # noqa: E402

FIXTURE = Path(__file__).parent.parent.parent / "fixtures" / "transcript_SCENE_T_112.json"


@pytest.fixture(scope="module")
def t():
    return load_transcript(str(FIXTURE), media_name="SCENE_T_112.wav")


def test_basic_shape(t):
    assert t.language == "en-us"
    assert len(t.speakers) == 1  # Premiere merged everyone into one speaker
    assert len(t.words) > 400
    # Roll is ~191s long
    assert 185 < t.duration < 195


def test_known_content(t):
    text = t.text()
    assert "Take one. Mark." in text          # slate captured
    assert "I've called Woodburn home" in text  # scripted read captured
    assert "rising taxes" in text


def test_disfluency_tags_present(t):
    assert any(w.is_disfluency for w in t.words)


def test_pauses(t):
    pauses = t.pauses(min_seconds=1.0)
    assert pauses, "roll has long direction gaps; expected pauses"
    # pause bounds must be consistent
    for p in pauses:
        w = t.words[p.after_word]
        assert abs(p.start - w.end) < 1e-6
        assert p.duration >= 1.0


def test_slice_bounds(t):
    # find "rising taxes" and check bounds are sane and ordered
    idx = next(i for i, w in enumerate(t.words) if w.text == "rising")
    start, end = t.slice_bounds(idx, idx + 1)
    assert 0 < start < end < t.duration
