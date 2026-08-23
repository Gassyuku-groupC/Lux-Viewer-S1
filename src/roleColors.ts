export const ROLE_COLORS = {
  Harvester: 0x38bdf8,
  Builder: 0xfacc15,
  Attacker: 0xfb7185,
  Firefighter: 0xf97316,
  FuelDepot: 0x22c55e,
  FuelStation: 0x2dd4bf,
  ResearchStation: 0xa78bfa,
  ManufacturingPoint: 0xf472b6,
  SacrificialDecay: 0x94a3b8,
};

export const roleColorCSS = (color: number): string =>
  `#${color.toString(16).padStart(6, '0')}`;
