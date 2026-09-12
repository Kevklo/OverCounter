export type HeroRole = "tank" | "damage" | "support";
export type HeroArchetype = "dive" | "brawl" | "poke";

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
}
