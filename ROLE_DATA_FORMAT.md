# Role Data Format

Role assignments are recorded separately from the Lux replay so gameplay output
remains compatible with the standard engine. The merge generator embeds those
assignments into a copy of the replay for visualization.

## Sidecar

A role sidecar uses the following top-level structure:

```json
{
  "schema": "lux-role-overlay/v1",
  "seed": 684193527,
  "player": 0,
  "frames": [
    {
      "turn": 0,
      "units": [
        {
          "id": "u_1",
          "role": "Harvester",
          "cooldown_until": 5,
          "reason": "initial_assignment"
        }
      ],
      "cities": [
        {
          "id": "c_1",
          "role": "FuelStation",
          "reason": "low_fuel_priority"
        }
      ]
    }
  ]
}
```

`turn`, entity `id`, and `role` are required for coloring. `cooldown_until` and
`reason` are retained for analysis but are not required by the renderer.

## Embedded Replay Fields

The generator adds these fields to the output replay:

```json
{
  "roleFrames": [],
  "roleOverlay": {
    "schema": "lux-role-overlay/v1",
    "player": 0
  }
}
```

All standard replay fields remain unchanged. Replays without `roleFrames` are
rendered normally and do not display the role legend.

## Supported Roles

Worker roles:

- `Harvester`
- `Builder`
- `Attacker`
- `Firefighter`

City roles:

- `FuelDepot`
- `FuelStation`
- `ResearchStation`
- `ManufacturingPoint`
- `SacrificialDecay`

Unknown roles receive no tint until a color is added to `src/roleColors.ts`.
