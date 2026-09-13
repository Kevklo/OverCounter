"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import type { Hero } from "@/lib/types";
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

  return (
    <>
      <div className="mx-auto mb-5 flex w-full max-w-5xl flex-col items-center justify-center gap-4 md:flex-row">
        <SearchBar value={query} onChange={setQuery} />
        {filters}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-slate-500">No heroes found.</p>
      ) : (
        <ul className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-3 px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filtered.map((h) => (
            <li key={h.id}>
              <HeroCard
                name={h.name}
                role={h.role}
                archetype={h.archetype}
                id={h.id}
                portrait={h.image_url}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default HeroExplorer;
