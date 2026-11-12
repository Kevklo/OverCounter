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

const ROLE_SECTIONS: { role: HeroRole; label: string }[] = [
  { role: "damage", label: "Damage" },
  { role: "support", label: "Support" },
  { role: "tank", label: "Tank" },
];

const HeroExplorer = ({ heroes = [], filters }: ExplorerProps) => {
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = normalizedQuery
    ? heroes.filter((hero) => hero.name.toLowerCase().includes(normalizedQuery))
    : heroes;

  return (
    <>
      <div className="mx-auto mb-6 flex w-full max-w-5xl flex-col items-center justify-center gap-4 px-4 sm:px-0 md:flex-row">
        <SearchBar value={query} onChange={setQuery} />
        {filters}
      </div>
      <div className="mx-4 sm:mx-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-16">
          {ROLE_SECTIONS.map(({ role, label }) => {
            const roleHeroes = filtered.filter((hero) => hero.role === role);

            return (
              <section key={role} className="flex min-w-0 flex-col gap-3">
                <h2 className="font-bold text-2xl text-[var(--text)]">
                  {label}
                </h2>
                {roleHeroes.length > 0 ? (
                  <ul className="flex flex-col gap-3">
                    {roleHeroes.map((hero) => (
                      <li key={hero.id}>
                        <HeroCard
                          name={hero.name}
                          archetype={hero.archetype}
                          id={hero.id}
                          description={hero.description}
                          portrait={hero.image_url}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-[var(--muted)]">
                    No {label.toLowerCase()} heroes match your search.
                  </p>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroExplorer;
