"""Take-detection tests against the real SCENE_T_112 roll."""

import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).parent.parent))
from editagent.align import find_read_spans, tokenize_script  # noqa: E402
from editagent.transcript import load_transcript  # noqa: E402

FIXTURE = Path(__file__).parent.parent.parent / "fixtures" / "transcript_SCENE_T_112.json"

# As-read reference (editor ruling: prompter copy is authoritative)
SCRIPT = (
    "I'm Noemi Legaspi. For 20 years, I've called Woodburn home. "
    "This is my community. I know my neighbors, I know their struggles, "
    "and I know what rising taxes are doing to families trying to get ahead. "
    "Salem keeps passing the cost down to us, and nothing is getting better. "
    "I'm running to change that, because a small business owner who's made "
    "payroll knows a lot more about Oregon's economy than any politician."
)


@pytest.fixture(scope="module")
def spans():
    t = load_transcript(str(FIXTURE), "SCENE_T_112.wav")
    return t, find_read_spans(t, SCRIPT)


def test_finds_reads_and_ignores_chatter(spans):
    t, found = spans
    # T_112 contains one near-full read and one short partial re-read;
    # ~3 minutes of crew chatter must produce no spans of its own.
    assert len(found) == 2


def test_main_take(spans):
    t, found = spans
    main = max(found, key=lambda s: s.matched_words)
    tokens = tokenize_script(SCRIPT)
    assert main.coverage_of(len(tokens)) > 0.9
    assert 13 < main.time_start < 16  # read starts ~14.9s
    assert 40 < main.time_end < 44
    assert "Woodburn" in t.text(main.word_start, main.word_end + 1)


def test_partial_retake(spans):
    t, found = spans
    partial = min(found, key=lambda s: s.matched_words)
    tokens = tokenize_script(SCRIPT)
    assert partial.coverage_of(len(tokens)) < 0.5
    assert 175 < partial.time_start < 182  # re-read at ~2:58
