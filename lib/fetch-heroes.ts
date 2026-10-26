import fs from "node:fs";
import path from "node:path";
import type { FetchedHero, Hero, HeroData } from "@/lib/types";

const BASE_URL = "https://overfast-api.tekrop.fr";
const DELAY_MS = 100;

type ApiHeroSummary = Pick<Hero, "name" | "role" | "subrole"> & {
  key: string;
  portrait: string;
};

type ApiHeroDetail = Pick<
  HeroData,
  "description" | "age" | "hitpoints" | "perks" | "story" | "abilities"
>;

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API responded ${res.status} at ${url}`);
  return (await res.json()) as T;
}

export async function fetchHeroes(): Promise<FetchedHero[]> {
  const summaries = await getJson<ApiHeroSummary[]>(`${BASE_URL}/heroes`);
  if (summaries.length === 0) {
    throw new Error("OverFast API returned no heroes; refusing to overwrite local data");
  }

  const heroes: FetchedHero[] = [];

  for (const summary of summaries) {
    const detail = await getJson<ApiHeroDetail>(`${BASE_URL}/heroes/${summary.key}`);
    const abilities = detail.abilities.map((ability) => ({
      name: ability.name,
      description: ability.description,
      icon: ability.icon,
    }));

    heroes.push({
      key: summary.key,
      name: summary.name,
      role: summary.role,
      subrole: summary.subrole,
      archetype: null,
      image_url: summary.portrait,
      description: detail.description,
      age: detail.age ?? null,
      hitpoints: detail.hitpoints,
      perks: detail.perks,
      story: detail.story,
      abilities,
    });

    await sleep(DELAY_MS);
  }

  const out = path.join(process.cwd(), "lib", "heroes-data.json");
  const temporaryFile = `${out}.${process.pid}.tmp`;
  fs.writeFileSync(temporaryFile, JSON.stringify(heroes, null, 2));
  fs.renameSync(temporaryFile, out);

  return heroes;
}
