import fs from "node:fs";
import path from "node:path";
import type { HeroRole, Hitpoints, Perks, Story } from "../lib/types";

const BASE_URL = "https://overfast-api.tekrop.fr";
const DELAY_MS = 100;

type ApiHeroSummary = {
  key: string;
  name: string;
  portrait: string;
  role: HeroRole;
  subrole: string;
};

type ApiHeroDetail = {
  description: string;
  age: number | null;
  hitpoints: Hitpoints;
  perks: Perks;
  story: Story;
};

type FetchedHero = {
  key: string;
  name: string;
  role: HeroRole;
  subrole: string;
  archetype: null;
  image_url: string;
  description: string;
  age: number | null;
  hitpoints: Hitpoints;
  perks: Perks;
  story: Story;
};

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API respondio ${res.status} en ${url}`);
  return (await res.json()) as T;
}

async function main() {
  const summaries = await getJson<ApiHeroSummary[]>(`${BASE_URL}/heroes`);

  const heroes: FetchedHero[] = [];

  for (const summary of summaries) {
    const detail = await getJson<ApiHeroDetail>(`${BASE_URL}/heroes/${summary.key}`);

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
    });

    await sleep(DELAY_MS);
  }

  const out = path.join(process.cwd(), "lib", "heroes-data.json");
  fs.writeFileSync(out, JSON.stringify(heroes, null, 2));
  console.log(`Escritos ${heroes.length} heroes en ${out}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
