import type { Hero, HeroArchetype, HeroRole } from "./types";
import { db } from "./db";

type HeroFilters = {
  role ?: HeroRole;
  search ?: string;
  archetype ?: HeroArchetype;
}

export const listHeroes = (filters: HeroFilters = {}): Hero[] => {
  const conditions: string[] = [];
  const params: { role?: string; search?: string; archetype?: string} = {}
  if (filters.role){
    conditions.push("role = @role");
    params.role = filters.role;
  }
  if (filters.search){
    conditions.push("name LIKE @search");
    params.search = filters.search;
  }
  if (filters.archetype){
    conditions.push("archetype = @archetype");
    params.archetype = filters.archetype;
  }
  
  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const rows = db.prepare(`SELECT * FROM heroes ${where} ORDER BY name`).all(params);
  return rows as Hero[];
}
  
export const getHeroById = (id: number): Hero | undefined => {
  const row = db.prepare(`SELECT * FROM heroes h WHERE h.id = ?`).get(id);
  return row as Hero | undefined;
}