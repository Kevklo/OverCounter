import { db } from "@/lib/db";
import type { RelationEntry, Hero, HeroRole } from "@/lib/types";
import { listHeroes } from "@/lib/heroes";

type ScoreType = Record<string, {h: Hero, total: number}>;

const getBestByRole = (heroes: ScoreType, role: HeroRole, amount: number): Hero[] => {
  const evaluatedHeroes = Object.values(heroes);
  return evaluatedHeroes.filter((item) => item.h.role === role)
  .sort((a,b) => b.total - a.total)
  .slice(0, amount)
  .map((item) => item.h)
}

// Heroes this hero counters (outgoing: `id` is the winner).
export const getStrongAgainst = (id: string): RelationEntry[] =>
  db
    .prepare(`
      SELECT h.id, h.name, h.image_url, c.strength
      FROM counters c
      JOIN heroes h ON h.id = c.loser_id
      WHERE c.winner_id = ?
      ORDER BY c.strength DESC
    `)
    .all(id) as RelationEntry[];

// Heroes that counter this hero (incoming: `id` is the loser).
export const getWeakAgainst = (id: string): RelationEntry[] =>
  db
    .prepare(`
      SELECT h.id, h.name, h.image_url, c.strength
      FROM counters c
      JOIN heroes h ON h.id = c.winner_id
      WHERE c.loser_id = ?
      ORDER BY c.strength DESC
    `)
    .all(id) as RelationEntry[];

// Synergies are symmetric and stored once (id < synergy_id), so look both ways.
export const getSynergies = (id: string): RelationEntry[] =>
  db
    .prepare(`
      SELECT h.id, h.name, h.image_url, s.strength
      FROM synergies s
      JOIN heroes h ON h.id = CASE WHEN s.id = ? THEN s.synergy_id ELSE s.id END
      WHERE s.id = ? OR s.synergy_id = ?
      ORDER BY s.strength DESC
    `)
    .all(id, id, id) as RelationEntry[];


// All incoming counters grouped by the hero being countered (loser_id).
export const listWeakAgainst = (): Record<string, RelationEntry[]> => {
  const rows = db
    .prepare(`
      SELECT c.loser_id AS target, h.id, h.name, h.image_url, c.strength
      FROM counters c
      JOIN heroes h ON h.id = c.winner_id
    `)
    .all() as (RelationEntry & { target: string })[];

  const map: Record<string, RelationEntry[]> = {};
  for (const row of rows) {
    (map[row.target] ??= []).push({
      id: row.id,
      name: row.name,
      image_url: row.image_url,
      strength: row.strength,
    });
  }
  return map;
};


export const getTeamStrongAgainst = (ids: string[]): Hero[] => {

  const counters: ScoreType = {};

  const heroes: Hero[] = listHeroes();
  for(const h of heroes){
    counters[h.id] = {h, total: 0}; 
  }
  for(const id of ids){
    const counts = getWeakAgainst(id);
    for(const c of counts){
      counters[c.id].total += c.strength;
    }
  }

  const bestTank = getBestByRole(counters ,'tank', 1);
  const bestDamage = getBestByRole(counters ,'damage', 2);
  const bestSupport = getBestByRole(counters ,'support', 2);
  
  return [...bestTank, ...bestDamage, ...bestSupport];
}
