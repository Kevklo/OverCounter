import type { Hero, HeroRole } from "./types";
import { db } from "./db";

type HeroFilters = {
  role ?: HeroRole;
  search ?: string;
}

export const listHeroes = (filters: HeroFilters = {}): Hero[] => {
  const conditions: string[] = [];
  const params: { role?: string; search?: string } = {}
  if (filters.role){
    conditions.push("role = @role");
    params.role = filters.role;
  }
  
  if (filters.search){
    conditions.push("name LIKE @search");
    params.search = filters.search;
  }
  
  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const rows = db.prepare(`SELECT * FROM heroes ${where} ORDER BY name`).all(params);
  return rows as Hero[];
}
  
export const getHeroById = (id: number): Hero | undefined => {
  const row = db.prepare(`SELECT * FROM heroes h WHERE h.id = ?`).get(id);
  return row as Hero | undefined;
}