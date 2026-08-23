"""Companion service: local HTTP + WebSocket API for the UXP panel.

The panel is a thin executor; this service is the brain (02-architecture §1).
V1 skeleton exposes health, a job API over the proven pipeline stages
(inventory, sync-XML generation), and the panel WebSocket endpoint where the
capability handshake and stage commands will live.

Run:  uvicorn editagent.server:app --port 8787
"""

from __future__ import annotations

import traceback
import uuid
from typing import Any

from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from pydantic import BaseModel

from . import __version__
from .fcp7 import load_inventory
from .sync import flagged, pair_by_timecode, synced
from .xml_builder import build_sync_project

app = FastAPI(title="Edit Agent Companion", version=__version__)

_jobs: dict[str, dict[str, Any]] = {}


class JobRequest(BaseModel):
    kind: str                 # "inventory" | "sync_xml"
    params: dict[str, Any] = {}


def _run_inventory(params: dict[str, Any]) -> dict[str, Any]:
    inv = load_inventory(params["raw_dump_path"])
    return {
        "videos": [v.name for v in inv.videos],
        "audios": [a.name for a in inv.audios],
    }


def _run_sync_xml(params: dict[str, Any]) -> dict[str, Any]:
    inv = load_inventory(params["raw_dump_path"])
    decisions = pair_by_timecode(inv)
    xml = build_sync_project(decisions, params.get("project_name", "EditAgent_Sync"))
    out_path = params["out_path"]
    with open(out_path, "w", encoding="utf-8") as fh:
        fh.write(xml)
    return {
        "out_path": out_path,
        "synced": [{"video": d.video.name, "audio": d.audio.name,
                    "offsetFrames": d.offset_frames, "method": d.method,
                    "confidence": d.confidence} for d in synced(decisions)],
        "flagged": [{"video": d.video.name, "reason": d.flag_reason}
                    for d in flagged(decisions)],
    }


_RUNNERS = {
    "inventory": _run_inventory,
    "sync_xml": _run_sync_xml,
}


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "editagent-companion", "version": __version__}


@app.post("/jobs")
def create_job(req: JobRequest) -> dict[str, Any]:
    runner = _RUNNERS.get(req.kind)
    if runner is None:
        raise HTTPException(422, f"unknown job kind {req.kind!r}; "
                                 f"known: {sorted(_RUNNERS)}")
    job_id = uuid.uuid4().hex[:12]
    job = {"id": job_id, "kind": req.kind, "state": "running", "result": None,
           "error": None}
    _jobs[job_id] = job
    # Stages so far are sub-second; long stages (transcribe, analyze) move to a
    # worker queue when they land, keeping this same job record shape.
    try:
        job["result"] = runner(req.params)
        job["state"] = "done"
    except Exception as exc:  # surfaced to the caller, never swallowed
        job["state"] = "error"
        job["error"] = f"{exc}\n{traceback.format_exc(limit=3)}"
    return job


@app.get("/jobs/{job_id}")
def get_job(job_id: str) -> dict[str, Any]:
    job = _jobs.get(job_id)
    if job is None:
        raise HTTPException(404, "no such job")
    return job


@app.websocket("/panel")
async def panel_ws(ws: WebSocket) -> None:
    """Panel connection: capability handshake now, stage commands later."""
    await ws.accept()
    try:
        while True:
            msg = await ws.receive_json()
            if msg.get("kind") == "hello":
                # panel announces its UXP capability matrix on connect
                await ws.send_json({
                    "kind": "hello",
                    "service": "editagent-companion",
                    "version": __version__,
                    "receivedCapabilities": sorted(
                        (msg.get("capabilities") or {}).keys()),
                })
            else:
                await ws.send_json({"kind": "error",
                                    "error": f"unknown message kind {msg.get('kind')!r}"})
    except WebSocketDisconnect:
        pass
