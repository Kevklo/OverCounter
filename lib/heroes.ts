import type { Hero, HeroArchetype, HeroRole, HeroRow } from "@/lib/types";
import { db } from "@/lib/db";

type HeroFilters = {
  role?: HeroRole;
  search?: string;
  archetype?: HeroArchetype;
};

function toHero(row: HeroRow): Hero {
  return {
    ...row,
    hitpoints: JSON.parse(row.hitpoints),
    perks: JSON.parse(row.perks),
    story: JSON.parse(row.story),
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
