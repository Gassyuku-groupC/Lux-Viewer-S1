# Role-Colored Lux Viewer

Role-Colored Lux Viewer is a local Lux AI 2021 replay viewer that preserves the
official unit and city-tile artwork while tinting them by assigned tactical role.
It is based on the Lux AI Season 1 viewer and the Group C local viewer work.

## Features

- Preserves the original Lux unit, city, map, animation, and replay controls.
- Colors units and city tiles from per-turn role assignments.
- Shows a collapsible role legend only when role data is present.
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

## Role Colors

The current legend includes worker roles `Harvester`, `Builder`, `Attacker`, and
`Firefighter`, plus city roles `FuelDepot`, `FuelStation`, `ResearchStation`,
`ManufacturingPoint`, and `SacrificialDecay`.

Color definitions are centralized in `src/roleColors.ts` and shared by the map
renderer and legend.

## Build Output

Production assets are generated in `dist/`. The directory is intentionally not
tracked; create it with `npm run build` before serving or publishing a release.

## Attribution

This project derives from the Lux AI Challenge Season 1 visualizer and Group C's
local viewer modifications. The original Apache 2.0 license is retained in
[LICENSE](./LICENSE).
