#!/usr/bin/env python3
"""Embed role frames into a Lux command replay for the role-aware viewer."""

from __future__ import annotations

import argparse
import json
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("replay", type=Path)
    parser.add_argument("roles", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    replay = json.loads(args.replay.read_text(encoding="utf-8"))
    roles = json.loads(args.roles.read_text(encoding="utf-8"))
    if int(replay.get("seed", -1)) != int(roles.get("seed", -2)):
        raise ValueError("Replay and role sidecar seeds do not match")
    replay["roleFrames"] = roles.get("frames", [])
    replay["roleOverlay"] = {
        "schema": roles.get("schema", "lux-role-overlay/v1"),
        "player": roles.get("player"),
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(replay, separators=(",", ":")), encoding="utf-8")
    print(args.output.resolve())


if __name__ == "__main__":
    main()
