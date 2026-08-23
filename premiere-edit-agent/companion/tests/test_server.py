"""Companion service tests: job API over the proven pipeline stages."""

import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).parent.parent))
fastapi = pytest.importorskip("fastapi")
from fastapi.testclient import TestClient  # noqa: E402

from editagent.server import app  # noqa: E402

FIXTURES = Path(__file__).parent.parent.parent / "fixtures"
client = TestClient(app)


def test_health():
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"


def test_inventory_job():
    r = client.post("/jobs", json={
        "kind": "inventory",
        "params": {"raw_dump_path": str(FIXTURES / "RAW_DUMP.xml")},
    })
    assert r.status_code == 200
    job = r.json()
    assert job["state"] == "done"
    assert len(job["result"]["videos"]) == 19
    assert len(job["result"]["audios"]) == 18
    # job is retrievable afterwards
    assert client.get(f"/jobs/{job['id']}").json()["state"] == "done"


def test_sync_xml_job(tmp_path):
    out = tmp_path / "sync.xml"
    r = client.post("/jobs", json={
        "kind": "sync_xml",
        "params": {"raw_dump_path": str(FIXTURES / "RAW_DUMP.xml"),
                   "out_path": str(out)},
    })
    job = r.json()
    assert job["state"] == "done"
    assert len(job["result"]["synced"]) == 18
    assert len(job["result"]["flagged"]) == 1
    assert out.exists() and out.stat().st_size > 10000


def test_unknown_job_kind():
    r = client.post("/jobs", json={"kind": "nope"})
    assert r.status_code == 422


def test_panel_handshake():
    with client.websocket_connect("/panel") as ws:
        ws.send_json({"kind": "hello", "capabilities": {"SequenceEditor": True}})
        reply = ws.receive_json()
        assert reply["kind"] == "hello"
        assert "SequenceEditor" in reply["receivedCapabilities"]
