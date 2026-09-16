import Link from "next/link";
import {
  HERO_ARCHETYPES,
  HERO_ROLES,
  type HeroArchetype,
  type HeroRole,
} from "@/lib/types";

type FilterButtonsProps = {
  role?: HeroRole;
  archetype?: HeroArchetype;
};

const ROLE_LABELS: Record<HeroRole, string> = {
  tank: "Tank",
  damage: "Damage",
  support: "Support",
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
    "rounded-full border px-4 py-2 text-sm font-medium shadow-md transition-colors";
  return active
    ? `${base} border-orange-500 bg-linear-to-b from-orange-300 via-orange-400 to-orange-500 text-white`
    : `${base} border-slate-300 bg-linear-to-b from-slate-50 via-slate-200 to-slate-400 text-slate-700 hover:from-slate-100 hover:to-slate-500`;
}

const FilterButtons = ({ archetype }: FilterButtonsProps) => {
  return (
    <div className="flex flex-col flex-nowrap gap-3">
      <div className="flex flex-row flex-nowrap justify-center gap-5">
        {HERO_ARCHETYPES.map((value) => (
          <Link
            key={value}
            href={buildHref( archetype === value ? undefined : value)}
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
