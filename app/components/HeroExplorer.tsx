"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import type { Hero, HeroRole } from "@/lib/types";
import SearchBar from "@/app/components/SearchBar";
import { HeroCard } from "@/app/components/HeroCard";

type ExplorerProps = {
  heroes?: Hero[];
  filters?: ReactNode;
};

const HeroExplorer = ({ heroes = [], filters }: ExplorerProps) => {
  const [query, setQuery] = useState("");

  const filtered = heroes.filter((h) =>
    h.name.toLowerCase().includes(query.trim().toLowerCase())
  );
  
  const filterByRole = (heroes: Hero[] = [], role: HeroRole = "damage") => {
    const heroesRole = heroes.filter((h) => h.role == role);
    return heroesRole.map((h) => (
      <HeroCard
        key={h.id}
        name={h.name}
        archetype={h.archetype}
        id={h.id}
        description={h.description}
        portrait={h.image_url}
      />
    ))}

  return (
    <>
      <div className="mx-auto mb-5 flex w-full max-w-5xl flex-col items-center justify-center gap-4 md:flex-row">
        <SearchBar value={query} onChange={setQuery} />
        {filters}
      </div>
      <div className="mx-8">
        <ul className="text-[var(--text)] grid grid-cols-3 gap-16">

          <ul className="flex flex-col gap-3">
            <h2 className="font-bold text-2xl">Damage</h2>
            {filterByRole(filtered, "damage")}
          </ul>

          <ul className="flex flex-col gap-3">
            <h2 className="font-bold text-2xl">Support</h2>
            {filterByRole(filtered, "support")}
          </ul>

          <ul className="flex flex-col gap-3">
            <h2 className="font-bold text-2xl">Tank</h2>
            {filterByRole(filtered, "tank")}
          </ul>
        </ul>
      </div>
    </>
)
}

export default HeroExplorer;
