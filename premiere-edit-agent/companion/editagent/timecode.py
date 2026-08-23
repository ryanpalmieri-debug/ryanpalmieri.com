"""Timecode helpers.

Frame counts are nominal-timebase frame indices (e.g. 24 for 23.976 NDF
material): FCP7 XML timecode strings count whole frames at the integer
timebase, which is also how Premiere sequences address them.
"""


def tc_to_frames(tc: str, timebase: int) -> int:
    """'HH:MM:SS:FF' (or ';' drop-frame separators) -> frame index."""
    h, m, s, f = map(int, tc.replace(";", ":").split(":"))
    return ((h * 3600 + m * 60 + s) * timebase) + f


def frames_to_tc(frames: int, timebase: int) -> str:
    if frames < 0:
        raise ValueError(f"negative frame index: {frames}")
    f = frames % timebase
    total_s = frames // timebase
    return f"{total_s // 3600:02d}:{total_s % 3600 // 60:02d}:{total_s % 60:02d}:{f:02d}"


def frames_to_seconds(frames: int, timebase: int, ntsc: bool) -> float:
    fps = timebase * 1000 / 1001 if ntsc else float(timebase)
    return frames / fps
