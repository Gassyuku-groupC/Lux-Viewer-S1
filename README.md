# Role-Colored Lux Viewer

Role-Colored Lux Viewer is a local Lux AI 2021 replay viewer that preserves the
official unit and city-tile artwork while tinting them by assigned tactical role.
It is based on the Lux AI Season 1 viewer and the Group C local viewer work.

## Features

- Preserves the original Lux unit, city, map, animation, and replay controls.
- Swaps unit and city tile artwork based on per-turn role assignments.
- Supports ordinary stateful Lux replays without changing their display.
- Includes a generator that embeds a `*.roles.json` sidecar into a replay.

## Quick Start

Requirements: Node.js compatible with webpack 4, npm, and Python 3.8 or newer.

```powershell
npm install
$env:NODE_OPTIONS="--openssl-legacy-provider"
npm run build
npm run serve
```

Open the URL printed by `serve` and upload a replay JSON file.

For development:

```powershell
$env:NODE_OPTIONS="--openssl-legacy-provider"
npm run dev
```

## Generate A Role-Colored Replay

The viewer reads `roleFrames` embedded in the replay. Merge a normal stateful
replay and its role sidecar with:

```powershell
python .\scripts\merge_role_sidecar_into_replay.py `
  .\replays\match.commands.json `
  .\replays\match.roles.json `
  .\replays\match.role-colored.json
```

The generator rejects inputs whose seeds differ. The source files are left
unchanged. Upload the generated `match.role-colored.json` to the viewer.

See [ROLE_DATA_FORMAT.md](./ROLE_DATA_FORMAT.md) for the sidecar schema and role
names.

## Role Assets

Worker roles `Harvester`, `Builder`, `Attacker`, and `Firefighter` swap in a
role-specific worker sprite (team 0 only). City roles `FuelDepot` and
`FuelStation` both use the `fuel` city sprite; `ResearchStation` uses
`reserach`; `ManufacturingPoint` uses `manufacturing`; `SacrificialDecay` uses
`sacrificial` (team 0, variant 0 only, day and night).

Role-to-asset-key mappings are centralized in `src/roleColors.ts`.

## Build Output

Production assets are generated in `dist/`. The directory is intentionally not
tracked; create it with `npm run build` before serving or publishing a release.

## Attribution

This project derives from the Lux AI Challenge Season 1 visualizer and Group C's
local viewer modifications. The original Apache 2.0 license is retained in
[LICENSE](./LICENSE).
