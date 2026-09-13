import { db } from "@/lib/db";
import type { RelationEntry } from "@/lib/types";

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
