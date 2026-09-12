"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import type { Hero } from "@/lib/types";
import SearchBar from "./SearchBar";
import { HeroCard } from "./HeroCard";

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
        <p className="text-center text-slate-500">No se encontraron héroes.</p>
      ) : (
        <ul className="flex flex-row flex-wrap items-center justify-center gap-25">
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
