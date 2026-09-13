import type { HeroArchetype, HeroRole } from "@/lib/types";

export type PillColor = { text: string; background: string };

export const roleColors: Record<string, PillColor> = {
  tank: { text: "#FFFFFF", background: "#218ffe" },
  damage: { text: "#FFFFFF", background: "#e23c40" },
  support: { text: "#FFFFFF", background: "#f99e1a" },
} satisfies Record<HeroRole, PillColor>;

export const archetypeColors: Record<string, PillColor> = {
  dive: { text: "#FFFFFF", background: "#8b5cf6" },
  brawl: { text: "#FFFFFF", background: "#22c55e" },
  poke: { text: "#FFFFFF", background: "#14b8a6" },
} satisfies Record<HeroArchetype, PillColor>;

export const FALLBACK_COLOR: PillColor = { text: "#FFFFFF", background: "#64748b" };

export const pillColor = (
  map: Record<string, PillColor>,
  key: string
): PillColor => map[key] ?? FALLBACK_COLOR;
