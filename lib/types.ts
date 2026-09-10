export type HeroRole = "tank" | "damage" | "support";
export type HeroArchetype = "dive" | "brawl" | "poke";

export interface Hero {
  id: number;
  name: string;
  role: HeroRole;
  archetype: HeroArchetype;
  description: string;
  image_url: string | null;
}