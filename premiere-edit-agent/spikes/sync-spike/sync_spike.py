#!/usr/bin/env python3
"""
Edit Agent — Phase 1 sync spike.

Finds the time offset of a camera clip's scratch audio inside a production WAV
using cross-correlation (GCC-PHAT), reports confidence, and estimates clock
drift by correlating a head window and a tail window independently.

Usage:
    python3 sync_spike.py CAMERA_FILE PRODUCTION_WAV [--rate 8000] [--window 90]

Requires: ffmpeg + ffprobe on PATH, numpy (pip install numpy).
Output: human-readable summary + a JSON block to send back.
"""

import argparse
import json
import shutil
import subprocess
import sys

import numpy as np

RESULT_KEYS = ("offset_sec", "confidence", "peak", "second_peak")


def die(msg: str) -> None:
    print(f"ERROR: {msg}", file=sys.stderr)
    sys.exit(1)


def ffprobe_info(path: str) -> dict:
    out = subprocess.run(
        ["ffprobe", "-v", "quiet", "-print_format", "json",
         "-show_format", "-show_streams", path],
        capture_output=True, text=True, check=True).stdout
    data = json.loads(out)
    info = {
        "duration_sec": float(data.get("format", {}).get("duration", 0) or 0),
        "timecode": None,
        "sample_rate": None,
    }
    for s in data.get("streams", []):
        tc = (s.get("tags") or {}).get("timecode")
        if tc and not info["timecode"]:
            info["timecode"] = tc
        if s.get("codec_type") == "audio" and not info["sample_rate"]:
            info["sample_rate"] = int(s.get("sample_rate") or 0)
    tc = (data.get("format", {}).get("tags") or {}).get("timecode")
    if tc and not info["timecode"]:
        info["timecode"] = tc
    return info


def decode_mono(path: str, rate: int, start: float | None = None,
                duration: float | None = None) -> np.ndarray:
    cmd = ["ffmpeg", "-v", "quiet"]
    if start is not None:
        cmd += ["-ss", str(start)]
    cmd += ["-i", path]
    if duration is not None:
        cmd += ["-t", str(duration)]
    cmd += ["-map", "0:a:0", "-ac", "1", "-ar", str(rate),
            "-f", "f32le", "-"]
    raw = subprocess.run(cmd, capture_output=True, check=True).stdout
    sig = np.frombuffer(raw, dtype=np.float32).astype(np.float64)
    if sig.size == 0:
        die(f"no audio decoded from {path}")
    return sig


def gcc_phat(needle: np.ndarray, haystack: np.ndarray, rate: int) -> dict:
    """Return the lag (seconds) of `needle` within `haystack` and a confidence
    score (peak vs. second-distinct-peak ratio, mapped to 0..1)."""
    n = needle.size + haystack.size
    nfft = 1 << (n - 1).bit_length()
    NEEDLE = np.fft.rfft(needle, nfft)
    HAY = np.fft.rfft(haystack, nfft)
    spec = HAY * np.conj(NEEDLE)
    denom = np.abs(spec)
    denom[denom < 1e-12] = 1e-12
    cc = np.fft.irfft(spec / denom, nfft)
    # Lags 0..len(haystack): needle starts offset seconds into haystack.
    valid = cc[: haystack.size]
    peak_idx = int(np.argmax(valid))
    peak = float(valid[peak_idx])
    # Second peak outside +/-0.5 s of the main one
    guard = rate // 2
    masked = valid.copy()
    lo, hi = max(0, peak_idx - guard), min(valid.size, peak_idx + guard)
    masked[lo:hi] = -np.inf
    second = float(np.max(masked)) if np.isfinite(masked).any() else 0.0
    ratio = peak / second if second > 1e-12 else float("inf")
    confidence = min(1.0, max(0.0, 1.0 - 1.0 / ratio)) if np.isfinite(ratio) else 1.0
    return {
        "offset_sec": peak_idx / rate,
        "peak": peak,
        "second_peak": second,
        "confidence": round(confidence, 4),
    }


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("camera")
    ap.add_argument("wav")
    ap.add_argument("--rate", type=int, default=8000, help="analysis sample rate")
    ap.add_argument("--window", type=float, default=90.0,
                    help="seconds of camera audio per correlation window")
    args = ap.parse_args()

    for tool in ("ffmpeg", "ffprobe"):
        if not shutil.which(tool):
            die(f"{tool} not found on PATH (brew install ffmpeg)")

    cam_info = ffprobe_info(args.camera)
    wav_info = ffprobe_info(args.wav)
    print(f"camera : {args.camera}\n  duration {cam_info['duration_sec']:.2f}s"
          f"  timecode {cam_info['timecode']}")
    print(f"wav    : {args.wav}\n  duration {wav_info['duration_sec']:.2f}s"
          f"  timecode {wav_info['timecode']}  rate {wav_info['sample_rate']}")

    haystack = decode_mono(args.wav, args.rate)

    win = min(args.window, cam_info["duration_sec"])
    head_needle = decode_mono(args.camera, args.rate, start=0, duration=win)
    head = gcc_phat(head_needle, haystack, args.rate)

    tail_result = None
    drift_ppm = None
    tail_start = cam_info["duration_sec"] - win
    if tail_start > win:  # only if head/tail windows don't overlap
        tail_needle = decode_mono(args.camera, args.rate, start=tail_start, duration=win)
        t = gcc_phat(tail_needle, haystack, args.rate)
        tail_result = dict(t)
        tail_result["offset_sec"] = t["offset_sec"] - tail_start  # normalize to clip start
        if head["confidence"] > 0.5 and t["confidence"] > 0.5:
            drift_sec = tail_result["offset_sec"] - head["offset_sec"]
            drift_ppm = drift_sec / cam_info["duration_sec"] * 1e6

    result = {
        "camera": args.camera,
        "wav": args.wav,
        "cameraInfo": cam_info,
        "wavInfo": wav_info,
        "analysisRate": args.rate,
        "head": {k: head[k] for k in RESULT_KEYS if k in head},
        "tail": tail_result,
        "driftPpm": round(drift_ppm, 2) if drift_ppm is not None else None,
        "verdict": ("SYNCED" if head["confidence"] >= 0.85
                    else "REVIEW" if head["confidence"] >= 0.5
                    else "NO_MATCH"),
    }

    print(f"\noffset: camera starts {head['offset_sec']:.3f}s into the WAV")
    print(f"confidence: {head['confidence']}  →  {result['verdict']}")
    if drift_ppm is not None:
        print(f"drift estimate: {drift_ppm:.1f} ppm over the clip")
    print("\n--- JSON (send this back) ---")
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
