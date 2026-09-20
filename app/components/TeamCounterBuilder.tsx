"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { HeroLite, HeroRole, RelationEntry } from "@/lib/types";
import SearchBar from "@/app/components/SearchBar";

type TeamCounterBuilderProps = {
  heroes: HeroLite[];
  weakAgainst: Record<string, RelationEntry[]>;
};

const ROLE_SLOTS: HeroRole[] = ["tank", "damage", "damage", "support", "support"];

const ROLE_LABEL: Record<HeroRole, string> = {
  tank: "Tank",
  damage: "Damage",
  support: "Support",
};

const TeamCounterBuilder = ({ heroes, weakAgainst }: TeamCounterBuilderProps) => {
  const [rivals, setRivals] = useState<(string | null)[]>([null, null, null, null, null]);
  const [openSlot, setOpenSlot] = useState<number | null>(null);
  const [query, setQuery] = useState("");

  const heroById = useMemo(() => {
    const map = new Map<string, HeroLite>();
    for (const hero of heroes) map.set(hero.id, hero);
    return map;
  }, [heroes]);

  const rivalIds = useMemo(
    () => rivals.filter((id): id is string => Boolean(id)),
    [rivals]
  );

  const result = useMemo(() => {
    const totals: Record<string, number> = {};
    for (const hero of heroes) totals[hero.id] = 0;

    for (const rivalId of rivalIds) {
      for (const counter of weakAgainst[rivalId] ?? []) {
        if (counter.id in totals) totals[counter.id] += counter.strength;
      }
    }

    const bestByRole = (role: HeroRole, amount: number) =>
      heroes
        .filter((hero) => hero.role === role)
        .map((hero) => ({ hero, total: totals[hero.id] }))
        .sort((a, b) => b.total - a.total)
        .slice(0, amount);

    return [
      ...bestByRole("tank", 1),
      ...bestByRole("damage", 2),
      ...bestByRole("support", 2),
    ];
  }, [heroes, weakAgainst, rivalIds]);

  const divisor = Math.max(rivalIds.length, 1);
  const teamAverage =
    result.length > 0
      ? result.reduce((sum, item) => sum + item.total, 0) / result.length / divisor
      : 0;

  useEffect(() => {
    if (openSlot === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenSlot(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openSlot]);

  const pickerRole = openSlot !== null ? ROLE_SLOTS[openSlot] : null;
  const pickerHeroes = pickerRole
    ? heroes.filter(
        (hero) =>
          hero.role === pickerRole &&
          hero.name.toLowerCase().includes(query.trim().toLowerCase())
      )
    : [];

  const chooseForSlot = (slot: number, heroId: string) => {
    setRivals((prev) => prev.map((value, index) => (index === slot ? heroId : value)));
    setOpenSlot(null);
    setQuery("");
  };

  const clearSlot = (slot: number) => {
    setRivals((prev) => prev.map((value, index) => (index === slot ? null : value)));
  };

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-[var(--text)]">Rival team</h2>
        <div className="flex flex-row flex-wrap gap-4">
          {ROLE_SLOTS.map((role, slot) => {
            const rivalId = rivals[slot];
            const hero = rivalId ? heroById.get(rivalId) : undefined;
            return (
              <div key={slot} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setOpenSlot(slot);
                  }}
                  className="flex h-36 w-28 flex-col items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2 text-center transition-colors hover:border-orange-300/60"
                >
                  {hero ? (
                    <>
                      {hero.image_url ? (
                        <Image
                          src={hero.image_url}
                          alt={hero.name}
                          width={64}
                          height={64}
                          sizes="64px"
                          className="h-16 w-16 rounded-full object-cover"
                        />
                      ) : (
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-700 text-xl font-bold text-slate-300">
                          {hero.name.charAt(0)}
                        </span>
                      )}
                      <span className="text-sm font-semibold text-[var(--text)]">
                        {hero.name}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-3xl leading-none text-[var(--muted)]">+</span>
                      <span className="text-xs uppercase tracking-wide text-[var(--muted)]">
                        {ROLE_LABEL[role]}
                      </span>
                    </>
                  )}
                </button>
                {hero && (
                  <button
                    type="button"
                    aria-label={`Quitar ${hero.name}`}
                    onClick={() => clearSlot(slot)}
                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)] text-xs text-[var(--muted)] hover:text-orange-400"
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-row items-baseline justify-between gap-4">
          <h2 className="text-xl font-bold text-[var(--text)]">Your team</h2>
          <span className="text-sm text-[var(--muted)]">
            Counter promedio: {(teamAverage * 100).toFixed(0)}%
          </span>
        </div>

        {rivalIds.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">
            Elegí al menos un rival para ver el equipo recomendado.
          </p>
        ) : (
          <div className="flex flex-row flex-wrap gap-4">
            {result.map(({ hero, total }) => (
              <div
                key={hero.id}
                className="flex h-40 w-32 flex-col items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-center"
              >
                {hero.image_url ? (
                  <Image
                    src={hero.image_url}
                    alt={hero.name}
                    width={64}
                    height={64}
                    sizes="64px"
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-700 text-xl font-bold text-slate-300">
                    {hero.name.charAt(0)}
                  </span>
                )}
                <span className="text-sm font-semibold text-[var(--text)]">
                  {hero.name}
                </span>
                <span className="text-xs uppercase tracking-wide text-[var(--muted)]">
                  {ROLE_LABEL[hero.role]}
                </span>
                <span className="text-lg font-bold text-orange-400">
                  {((total / divisor) * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {openSlot !== null && pickerRole && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setOpenSlot(null)}
        >
          <div
            className="flex max-h-[80vh] w-full max-w-3xl flex-col gap-4 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-row items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-[var(--text)]">
                Elegí un {ROLE_LABEL[pickerRole]}
              </h3>
              <button
                type="button"
                onClick={() => setOpenSlot(null)}
                aria-label="Cerrar"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] hover:text-orange-400"
              >
                ×
              </button>
            </div>

            <SearchBar value={query} onChange={setQuery} />

            <div className="grid grid-cols-3 gap-3 overflow-y-auto pr-1 sm:grid-cols-4 md:grid-cols-5">
              {pickerHeroes.map((hero) => (
                <button
                  key={hero.id}
                  type="button"
                  onClick={() => chooseForSlot(openSlot, hero.id)}
                  className="flex flex-col items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2 transition-colors hover:border-orange-300/60"
                >
                  {hero.image_url ? (
                    <Image
                      src={hero.image_url}
                      alt={hero.name}
                      width={64}
                      height={64}
                      sizes="64px"
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-700 text-xl font-bold text-slate-300">
                      {hero.name.charAt(0)}
                    </span>
                  )}
                  <span className="text-xs font-semibold text-[var(--text)]">
                    {hero.name}
                  </span>
                </button>
              ))}
              {pickerHeroes.length === 0 && (
                <p className="col-span-full text-sm text-[var(--muted)]">
                  No hay héroes para ese rol.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamCounterBuilder;
