import type {
  Hero,
  HeroArchetype,
  HeroRole,
  Hitpoints,
  Perks,
  Story,
} from "./types";
import { db } from "./db";

type HeroFilters = {
  role?: HeroRole;
  search?: string;
  archetype?: HeroArchetype;
};

type HeroRow = {
  id: string;
  name: string;
  role: HeroRole;
  archetype: HeroArchetype;
  subrole: string;
  description: string;
  image_url: string | null;
  age: number;
  hitpoints: string;
  perks: string;
  story: string;
};

function toHero(row: HeroRow): Hero {
  return {
    ...row,
    hitpoints: JSON.parse(row.hitpoints) as Hitpoints,
    perks: JSON.parse(row.perks) as Perks,
    story: JSON.parse(row.story) as Story,
  };
}

export const listHeroes = (filters: HeroFilters = {}): Hero[] => {
  const conditions: string[] = [];
  const params: { role?: string; search?: string; archetype?: string } = {};

  if (filters.role) {
    conditions.push("role = @role");
    params.role = filters.role;
  }
  if (filters.search) {
    conditions.push("name LIKE @search");
    params.search = `%${filters.search}%`;
  }
  if (filters.archetype) {
    conditions.push("archetype = @archetype");
    params.archetype = filters.archetype;
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const rows = db
    .prepare(`SELECT * FROM heroes ${where} ORDER BY name`)
    .all(params) as HeroRow[];

  return rows.map(toHero);
};

export const getHeroById = (id: string): Hero | undefined => {
  const row = db.prepare(`SELECT * FROM heroes WHERE id = ?`).get(id) as
    | HeroRow
    | undefined;
  return row ? toHero(row) : undefined;
};
