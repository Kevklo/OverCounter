import type { HeroRole } from "@/lib/types";

export const ROLE_SLOTS: HeroRole[] = ["tank", "damage", "damage", "support", "support"];

export const ROLE_LABEL: Record<HeroRole, string> = {
  tank: "Tank",
  damage: "Damage",
  support: "Support",
};
