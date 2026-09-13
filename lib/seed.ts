import fs from "node:fs";
import path from "node:path";
import { db } from "@/lib/db";
import { ARCHETYPES } from "@/lib/archetypes";
import type { FetchedHero, HeroRow } from "@/lib/types";

export const seed = (): void => {
  const file = path.join(process.cwd(), "lib", "heroes-data.json");
  const fetched: FetchedHero[] = JSON.parse(fs.readFileSync(file, "utf8"));

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
