export const HERO_ROLES = ["tank", "damage", "support"] as const;
export const HERO_ARCHETYPES = ["dive", "brawl", "poke"] as const;

export type HeroRole = (typeof HERO_ROLES)[number];
export type HeroArchetype = (typeof HERO_ARCHETYPES)[number];

export const isHeroRole = (value: unknown): value is HeroRole =>
  typeof value === "string" && (HERO_ROLES as readonly string[]).includes(value);

export const isHeroArchetype = (value: unknown): value is HeroArchetype =>
  typeof value === "string" && (HERO_ARCHETYPES as readonly string[]).includes(value);

export interface Hitpoints {
  health: number;
  armor: number;
  shields: number;
  total: number;
}

export interface Perk {
  name: string;
  description: string;
  icon: string;
}

export interface Perks {
  minor: Perk[];
  major: Perk[];
}

export interface StoryMedia {
  type: string;
  link: string;
}

export interface StoryChapter {
  title: string;
  content: string;
  picture: string;
}

export interface Story {
  summary: string;
  media: StoryMedia;
  chapters: StoryChapter[];
}

export interface Hero {
  id: string;
  name: string;
  role: HeroRole;
  archetype: HeroArchetype;
  description: string;
  image_url: string | null;
  subrole: string;
  age: number | null;
  hitpoints: Hitpoints;
  perks: Perks;
  story: Story;
  abilities: Ability[];
}

export interface Ability {
    name: string;
    description: string;
    icon: string;
}

export type HeroData = Omit<Hero, "id" | "archetype">;

export type HeroLite = Pick<
  Hero,
  "id" | "name" | "role" | "archetype" | "image_url"
>;

export type FetchedHero = HeroData & { key: string; archetype: null };

export type Serialized<T> = {
  [K in keyof T]: T[K] extends object ? string : T[K];
};

export type HeroRow = Serialized<Hero>;


export interface RelationData {
  hero: string;
  strength: number;
}

export type RelationsData = Record<
  string,
  { counters: RelationData[]; synergies: RelationData[] }
>;


export interface RelationEntry {
  id: string;
  name: string;
  strength: number;
  image_url: string | null;
}
