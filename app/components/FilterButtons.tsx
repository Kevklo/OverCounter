import Link from "next/link";
import { HERO_ARCHETYPES, type HeroArchetype } from "@/lib/types";

type FilterButtonsProps = {
  archetype?: HeroArchetype;
};

const ARCHETYPE_LABELS: Record<HeroArchetype, string> = {
  dive: "Dive",
  brawl: "Brawl",
  poke: "Poke",
};

function buildHref(archetype?: string): string {
  const params = new URLSearchParams();
  if (archetype) params.set("archetype", archetype);
  const qs = params.toString();
  return qs ? `/heroesList?${qs}` : "/heroesList";
}

function buttonClass(active: boolean): string {
  const base =
    "rounded-full border px-5 py-2 text-sm font-semibold uppercase tracking-wider transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400";
  return active
    ? `${base} border-orange-300 bg-orange-400 text-slate-900 shadow-[0_0_16px_rgba(249,158,26,0.55)]`
    : `${base} border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-orange-300/40 hover:bg-[var(--surface-strong)] hover:text-[var(--text)]`;
}

const FilterButtons = ({ archetype }: FilterButtonsProps) => {
  return (
    <div className="flex flex-col flex-nowrap gap-3">
      <div className="flex flex-row flex-nowrap justify-center gap-4">
        {HERO_ARCHETYPES.map((value) => (
          <Link
            key={value}
            href={buildHref(archetype === value ? undefined : value)}
            className={buttonClass(archetype === value)}
          >
            {ARCHETYPE_LABELS[value]}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FilterButtons;
