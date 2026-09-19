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

async function main() {
  const summaries = await getJson<ApiHeroSummary[]>(`${BASE_URL}/heroes`);

  const heroes: FetchedHero[] = [];

  for (const summary of summaries) {
    const detail = await getJson<ApiHeroDetail>(`${BASE_URL}/heroes/${summary.key}`);
    const abilities = detail.abilities.map((a) => ({
      name: a.name,
      description: a.description,
      icon: a.icon,
    }))

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
      abilities: abilities,
    });

    await sleep(DELAY_MS);
  }

  const out = path.join(process.cwd(), "lib", "heroes-data.json");
  fs.writeFileSync(out, JSON.stringify(heroes, null, 2));
  console.log(`Wrote ${heroes.length} heroes to ${out}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
