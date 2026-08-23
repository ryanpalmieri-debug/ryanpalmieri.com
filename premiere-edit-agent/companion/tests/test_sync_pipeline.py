"""End-to-end tests for the sync pipeline against real-project fixtures.

fixtures/RAW_DUMP.xml           — real inventory export (19 cam clips, 18 WAVs)
fixtures/Selects_Sync_Sequence.xml — the editor's hand-built multicams (ground truth)
"""

import sys
import xml.etree.ElementTree as ET
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).parent.parent))
from editagent.fcp7 import load_inventory  # noqa: E402
from editagent.sync import flagged, pair_by_timecode, synced  # noqa: E402
from editagent.timecode import frames_to_tc, tc_to_frames  # noqa: E402
from editagent.xml_builder import build_sync_project  # noqa: E402

FIXTURES = Path(__file__).parent.parent.parent / "fixtures"
RAW_DUMP = FIXTURES / "RAW_DUMP.xml"


def test_timecode_roundtrip():
    for tc in ("00:29:27:21", "01:35:45:11", "00:00:00:00"):
        assert frames_to_tc(tc_to_frames(tc, 24), 24) == tc


@pytest.fixture(scope="module")
def inventory():
    return load_inventory(str(RAW_DUMP))


@pytest.fixture(scope="module")
def decisions(inventory):
    return pair_by_timecode(inventory)


def test_inventory_counts(inventory):
    assert len(inventory.videos) == 19
    assert len(inventory.audios) == 18
    for v in inventory.videos:
        assert v.path and v.tc and v.timebase == 24 and v.ntsc
        assert v.audio_channels == 2  # camera scratch stereo
    for a in inventory.audios:
        assert a.audio_channels == 6  # poly WAV, six mono channels


def test_pairing(decisions):
    ok = synced(decisions)
    review = flagged(decisions)
    assert len(ok) == 18
    assert len(review) == 1
    assert review[0].video.name == "A173_05122006_C030.mov"
    pairs = {d.video.name: d for d in ok}
    # Ground truth from the editor's own multicam project:
    assert pairs["A173_05122026_C032.mov"].audio.name == "SCENE_T_113.wav"
    assert pairs["A173_05122026_C032.mov"].offset_frames == 31
    assert pairs["A173_05122036_C039.mov"].offset_frames == 15
    assert pairs["A174_05122126_C006.mov"].offset_frames == 47
    # Sound rolled before camera on C008:
    assert pairs["A174_05122132_C008.mov"].offset_frames == -13


def test_generated_project_xml(decisions):
    xml = build_sync_project(decisions, "EditAgent_Sync_Test")
    root = ET.fromstring(xml.split("\n", 2)[2])  # strip header lines
    seqs = root.findall("project/children/sequence")
    assert len(seqs) == 18

    def txt(el, p):
        e = el.find(p)
        return e.text if e is not None and e.text else ""

    by_name = {txt(s, "name"): s for s in seqs}
    c032 = by_name["A173_05122026_C032.movMulticam"]
    clips = list(c032.iter("clipitem"))
    # V1 camera + A1-A6 WAV + A7-A8 scratch
    assert len(clips) == 9
    assert txt(clips[0], "sourcetrack/mediatype") == "video"
    assert [txt(c, "sourcetrack/trackindex") for c in clips[1:7]] == list("123456")
    assert all(txt(c, "name") == "SCENE_T_113.wav" for c in clips[1:7])
    assert all(txt(c, "start") == "31" for c in clips[1:7])
    assert [txt(c, "name") for c in clips[7:]] == ["A173_05122026_C032.mov"] * 2

    # Negative offset: WAV head trimmed, placed at 0
    c008 = by_name["A174_05122132_C008.movMulticam"]
    wav_clips = [c for c in c008.iter("clipitem")
                 if txt(c, "name").endswith(".wav")]
    assert all(txt(c, "start") == "0" and txt(c, "in") == "13" for c in wav_clips)

    # Every referenced file id has exactly one full definition (with pathurl)
    defs = {}
    for fe in root.iter("file"):
        defs.setdefault(fe.get("id"), []).append(fe.find("pathurl") is not None)
    assert all(sum(v) == 1 for v in defs.values())


def test_regeneration_is_stable(decisions):
    a = build_sync_project(decisions, "P")
    b = build_sync_project(decisions, "P")
    assert a == b  # definition-state reset makes builds deterministic
