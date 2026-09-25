"use client";

import { useEffect, useMemo, useState } from "react";
import type { HeroLite, HeroRole, RelationEntry } from "@/lib/types";
import { ROLE_SLOTS, ROLE_LABEL } from "./counterBuilderComponents/constants";
import RivalTeamRow from "./counterBuilderComponents/RivalTeamRow";
import YourTeamRow from "./counterBuilderComponents/YourTeamRow";
import VsBadge from "./counterBuilderComponents/VsBadge";
import HeroPickerModal from "./counterBuilderComponents/HeroPickerModal";

type TeamCounterBuilderProps = {
  heroes: HeroLite[];
  weakAgainst: Record<string, RelationEntry[]>;
};

const TeamCounterBuilder = ({ heroes, weakAgainst }: TeamCounterBuilderProps) => {
  const [rivals, setRivals] = useState<(string | null)[]>(() =>
    ROLE_SLOTS.map(() => null)
  );
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
    const bestRival: Record<string, { name: string; strength: number }> = {};
    for (const hero of heroes) totals[hero.id] = 0;

    for (const rivalId of rivalIds) {
      const rivalName = heroById.get(rivalId)?.name;
      for (const counter of weakAgainst[rivalId] ?? []) {
        if (!(counter.id in totals)) continue;
        totals[counter.id] += counter.strength;
        const previous = bestRival[counter.id];
        if (rivalName && (!previous || counter.strength > previous.strength)) {
          bestRival[counter.id] = { name: rivalName, strength: counter.strength };
        }
      }
    }

    const bestByRole = (role: HeroRole, amount: number) =>
      heroes
        .filter((hero) => hero.role === role)
        .map((hero) => ({
          hero,
          total: totals[hero.id],
          bestRivalName: bestRival[hero.id]?.name,
        }))
        .sort((a, b) => b.total - a.total)
        .slice(0, amount);

    return [
      ...bestByRole("tank", 1),
      ...bestByRole("damage", 2),
      ...bestByRole("support", 2),
    ];
  }, [heroes, weakAgainst, rivalIds, heroById]);

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

  const rivalHeroes = ROLE_SLOTS.map((_, index) => {
    const id = rivals[index];
    return id ? heroById.get(id) ?? null : null;
  });

  const pickerRole = openSlot !== null ? ROLE_SLOTS[openSlot] : null;
  const pickerHeroes = pickerRole
    ? heroes.filter(
        (hero) =>
          hero.role === pickerRole &&
          hero.name.toLowerCase().includes(query.trim().toLowerCase())
      )
    : [];

  const openPicker = (slot: number) => {
    setQuery("");
    setOpenSlot(slot);
  };

  const clearSlot = (slot: number) => {
    setRivals((prev) => prev.map((value, index) => (index === slot ? null : value)));
  };

  const chooseForSlot = (slot: number, heroId: string) => {
    setRivals((prev) => prev.map((value, index) => (index === slot ? heroId : value)));
    setOpenSlot(null);
    setQuery("");
  };

  return (
    <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-3">
      <RivalTeamRow
        slots={ROLE_SLOTS}
        heroes={rivalHeroes}
        onOpen={openPicker}
        onClear={clearSlot}
      />

      <VsBadge />

      <YourTeamRow
        members={result}
        divisor={divisor}
        average={teamAverage}
        hasRivals={rivalIds.length > 0}
      />

      {openSlot !== null && pickerRole && (
        <HeroPickerModal
          roleLabel={ROLE_LABEL[pickerRole]}
          heroes={pickerHeroes}
          query={query}
          onQueryChange={setQuery}
          onSelect={(heroId) => chooseForSlot(openSlot, heroId)}
          onClose={() => setOpenSlot(null)}
        />
      )}
    </div>
  );
};

export default TeamCounterBuilder;
