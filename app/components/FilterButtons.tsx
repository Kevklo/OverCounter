import type { HeroArchetype, HeroRole } from "@/lib/types";
import Link from "next/link";

type FilterButtonsProps = {
  role?: HeroRole;
  archetype?: HeroArchetype;
}

const ROLES = [
  {value: "tank"   ,label: "Tank"},
  {value: "damage" ,label: "Damage"},
  {value: "support",label: "Support"}
]

const ARCHETYPE = [
  {value: "dive"   ,label: "Dive"},
  {value: "poke"   ,label: "Poke"},
  {value: "brawl"  ,label: "Brawl"}
]

function buildHref(role?: string, archetype?: string): string {
  const params = new URLSearchParams();
  if(role) params.set("role", role);
  if(archetype) params.set("archetype", archetype);
  const qs = params.toString();
  return qs ? `/heroesList?${qs}`: "/heroesList";
}

function buttonClass(active: boolean): string {
  const base =
    "rounded-full border px-4 py-2 text-sm font-medium shadow-md transition-colors";
  return active
    ? `${base} border-orange-500 bg-linear-to-b from-orange-300 via-orange-400 to-orange-500 text-white`
    : `${base} border-slate-300 bg-linear-to-b from-slate-50 via-slate-200 to-slate-400 text-slate-700 hover:from-slate-100 hover:to-slate-500`;
}

const FilterButtons = ({role, archetype}: FilterButtonsProps) => {
  return (
    <div className="flex flex-col flex-nowrap gap-3">
      <div className="flex flex-row flex-nowrap justify-center gap-5">
        {ROLES.map((r) => {
          return (
            <Link key = {r.value} href={buildHref(role == r.value ? undefined : r.value, archetype)} className={buttonClass(role == r.value)}>{r.label}</Link>
          )
        })}
      </div>
      <div className="flex flex-row flex-nowrap justify-center gap-5">
        {ARCHETYPE.map((a) => {
          return (
            <Link key = {a.value} href={buildHref(role, archetype == a.value ? undefined: a.value)} className={buttonClass(archetype == a.value)}>{a.label}</Link>
          )
        })}
      </div>
    </div>

  )
}

export default FilterButtons;