import fs from "node:fs";
import path from "node:path";
import { db } from "@/lib/db";
import { ARCHETYPES } from "@/lib/archetypes";
import type { FetchedHero, HeroRow, RelationsData } from "@/lib/types";

const fileHeroes = path.join(process.cwd(), "lib", "heroes-data.json");
const fileRelations = path.join(process.cwd(), "lib", "relations-data.json");

const seedHeroes = (): void => {
  const fetched: FetchedHero[] = JSON.parse(fs.readFileSync(fileHeroes, "utf8"));

  const heroes: HeroRow[] = fetched.map((hero) => {
    const archetype = ARCHETYPES[hero.key];
    if (!archetype) {
      throw new Error(`Missing archetype for "${hero.key}" in lib/archetypes.ts`);
    }

    return {
      id: hero.key,
      name: hero.name,
      role: hero.role,
      archetype,
      subrole: hero.subrole,
      description: hero.description,
      image_url: hero.image_url,
      age: hero.age,
      hitpoints: JSON.stringify(hero.hitpoints),
      perks: JSON.stringify(hero.perks),
      story: JSON.stringify(hero.story),
    };
  });

  const upsert = db.prepare(`
    INSERT INTO heroes
      (id, name, role, archetype, subrole, description, image_url, age, hitpoints, perks, story)
    VALUES
      (@id, @name, @role, @archetype, @subrole, @description, @image_url, @age, @hitpoints, @perks, @story)
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      role = excluded.role,
      archetype = excluded.archetype,
      subrole = excluded.subrole,
      description = excluded.description,
      image_url = excluded.image_url,
      age = excluded.age,
      hitpoints = excluded.hitpoints,
      perks = excluded.perks,
      story = excluded.story
  `);

  db.transaction((rows: HeroRow[]) => {
    for (const row of rows) upsert.run(row);
  })(heroes);
};

const seedRelations = (): void => {
  const relations: RelationsData = JSON.parse(fs.readFileSync(fileRelations, "utf8"));

  const insertCounter = db.prepare(`
    INSERT INTO counters (winner_id, loser_id, strength)
    VALUES (@winner_id, @loser_id, @strength)
    ON CONFLICT (winner_id, loser_id) DO UPDATE SET strength = excluded.strength
  `);

  const insertSynergy = db.prepare(`
    INSERT INTO synergies (id, synergy_id, strength)
    VALUES (@id, @synergy_id, @strength)
    ON CONFLICT (id, synergy_id) DO UPDATE SET strength = excluded.strength
  `);

  db.transaction(() => {
    for (const [hero, block] of Object.entries(relations)) {
      for (const { hero: other, strength } of block.counters) {
        if (!other) continue;
        insertCounter.run({ winner_id: other, loser_id: hero, strength });
      }
      for (const { hero: other, strength } of block.synergies) {
        if (!other) continue;
        const [a, b] = [hero, other].sort();
        insertSynergy.run({ id: a, synergy_id: b, strength });
      }
    }
  })();
};

export const seed = (): void => {
  seedHeroes();
  seedRelations();
}