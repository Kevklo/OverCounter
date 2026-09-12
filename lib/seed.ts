import fs from "node:fs";
import path from "node:path";
import { db } from "./db";
import { ARCHETYPES } from "./archetypes";
import type {
  HeroArchetype,
  HeroRole,
  Hitpoints,
  Perks,
  Story,
} from "./types";

type FetchedHero = {
  key: string;
  name: string;
  role: HeroRole;
  archetype: null;
  subrole: string;
  image_url: string;
  description: string;
  age: number | null;
  hitpoints: Hitpoints;
  perks: Perks;
  story: Story;
};

type SeedRow = {
  id: string;
  name: string;
  role: HeroRole;
  archetype: HeroArchetype;
  subrole: string;
  description: string;
  image_url: string;
  age: number | null;
  hitpoints: string;
  perks: string;
  story: string;
};

export const seed = (): void => {
  const file = path.join(process.cwd(), "lib", "heroes-data.json");
  const fetched: FetchedHero[] = JSON.parse(fs.readFileSync(file, "utf8"));

  const heroes: SeedRow[] = fetched.map((hero) => {
    const archetype = ARCHETYPES[hero.key];
    if (!archetype) {
      throw new Error(`Falta el arquetipo de "${hero.key}" en lib/archetypes.ts`);
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

  db.transaction((rows: SeedRow[]) => {
    for (const row of rows) upsert.run(row);
  })(heroes);
};
