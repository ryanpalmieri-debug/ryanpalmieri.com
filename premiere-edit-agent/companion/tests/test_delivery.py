"""Delivery-metric tests on the real T_112 takes."""

import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).parent.parent))
from editagent.delivery import compute_delivery  # noqa: E402
from editagent.transcript import load_transcript  # noqa: E402

FIXTURE = Path(__file__).parent.parent.parent / "fixtures" / "transcript_SCENE_T_112.json"


@pytest.fixture(scope="module")
def t():
    return load_transcript(str(FIXTURE), "SCENE_T_112.wav")


def _range_for(t, first_text, last_text, search_from=0):
    start = next(w.index for w in t.words[search_from:] if w.text == first_text)
    end = next(w.index for w in t.words[start:] if w.text == last_text)
    return start, end


def test_read_beats_chatter(t):
    # The scripted read (steady prompter delivery) should score higher energy
    # than the halting crew back-and-forth about the teleprompter gap.
    rs, re_ = _range_for(t, "I'm", "ahead.")
    read = compute_delivery(t, rs, re_)
    cs, ce = _range_for(t, "Was", "not.", search_from=re_)
    chatter = compute_delivery(t, cs, ce)
    assert read.energy_score > chatter.energy_score
    assert read.pause_ratio < chatter.pause_ratio


def test_metrics_sane(t):
    rs, re_ = _range_for(t, "I'm", "ahead.")
    m = compute_delivery(t, rs, re_)
    assert 0 < m.speech_rate < 6
    assert m.articulation_rate >= m.speech_rate
    assert 0 <= m.pause_ratio < 1
    assert 0 <= m.energy_score <= 1
    assert m.word_count > 30
