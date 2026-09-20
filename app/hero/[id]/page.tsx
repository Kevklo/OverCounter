import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getHeroById } from "@/lib/heroes";
import { getSynergies, getWeakAgainst } from "@/lib/relations";
import type { Hero, Perk, RelationEntry } from "@/lib/types";
import Pills from "@/app/components/Pills";
import { LifeBar } from "@/app/components/LifeBar";
import AbilityBar from "@/app/components/AbilityBar";

const PerkItem = ({ perk }: { perk: Perk }) => (
  <p className="flex flex-col gap-1">
    <span className="flex items-center gap-2">
      <Image
        src={perk.icon}
        alt={perk.name}
        width={32}
        height={32}
        className="h-8 w-8 shrink-0"
      />
      <span className="font-semibold text-slate-900 dark:text-slate-100">
        {perk.name}
      </span>
    </span>
    <span className="text-sm text-slate-700 dark:text-slate-300">
      {perk.description}
    </span>
  </p>
);

const RelationRow = ({ entry }: { entry: RelationEntry }) => (
  <li className="flex items-center gap-3">
    <Link
      href={`/hero/${entry.id}`}
      className="flex w-28 shrink-0 items-center gap-2 sm:w-40"
    >
      {entry.image_url ? (
        <Image
          src={entry.image_url}
          alt={`Portrait of ${entry.name}`}
          width={32}
          height={32}
          sizes="32px"
          className="h-8 w-8 shrink-0 rounded-full object-cover"
        />
      ) : (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-500 dark:bg-slate-700 dark:text-slate-300">
          {entry.name.charAt(0)}
        </span>
      )}
      <span className="truncate font-semibold text-slate-900 hover:underline dark:text-slate-100">
        {entry.name}
      </span>
    </Link>
    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
      <div
        className="h-full rounded-full bg-linear-to-r from-orange-400 to-orange-600"
        style={{ width: `${entry.strength * 100}%` }}
      />
    </div>
    <span className="w-10 shrink-0 text-right text-sm tabular-nums text-slate-600 dark:text-slate-300">
      {(entry.strength * 100).toFixed(0)}%
    </span>
  </li>
);

const HeroDetailPage = async (props: PageProps<"/hero/[id]">) => {
  const { id } = await props.params;
  const hero: Hero | undefined = getHeroById(id);
  if (!hero) notFound();

  const synergies = getSynergies(id);
  const counters = getWeakAgainst(id);

  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 px-4 py-8 md:grid-cols-4 md:gap-x-6 md:gap-y-10">
      <div className="mx-auto w-full max-w-[320px] md:col-start-1 md:row-span-2 md:row-start-1 md:mx-0">
        {hero.image_url ? (
          <Image
            src={hero.image_url}
            alt={`Portrait of ${hero.name}`}
            width={512}
            height={512}
            sizes="(max-width: 768px) 80vw, 320px"
            className="h-auto w-full rounded-xl"
          />
        ) : (
          <div className="flex aspect-square w-full items-center justify-center rounded-xl bg-slate-100 text-7xl font-bold text-slate-400 dark:bg-slate-800 dark:text-slate-500">
            {hero.name.charAt(0)}
          </div>
        )}
      </div>

      <h1 className="min-w-0 text-center text-4xl text-slate-900 sm:text-5xl md:col-start-2 md:row-start-1 md:text-left dark:text-slate-100">
        {hero.name}
      </h1>

      <div className="w-full md:col-start-3 md:row-start-1 md:self-center">
        <LifeBar hps={hero.hitpoints} />
      </div>

      <div className="flex flex-row justify-center gap-3 text-xl md:col-start-4 md:row-start-1 md:justify-start md:self-center md:text-2xl">
        <Pills kind="role" value={hero.role} />
        <Pills kind="archetype" value={hero.archetype} />
      </div>

      <p className="text-lg font-[200] text-[var(--muted)] sm:text-xl md:col-span-3 md:col-start-2 md:row-start-2">
        {hero.description}
      </p>

      <section className="flex flex-col gap-3 md:col-span-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Abilities
        </h2>
        <AbilityBar abilities={hero.abilities} />
      </section>

      <section className="flex flex-col gap-6 md:col-span-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Perks
        </h2>
        <div className="flex flex-col gap-6">
          {(["minor", "major"] as const).map((tier) => (
            <div key={tier} className="flex flex-col gap-3">
              <h3 className="text-xl font-semibold capitalize text-slate-900 dark:text-slate-100">
                {tier} perks
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {hero.perks[tier].map((perk) => (
                  <PerkItem key={perk.name} perk={perk} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-xl border border-slate-300 bg-white/60 p-6 shadow-sm backdrop-blur-sm md:col-span-2 dark:border-slate-700 dark:bg-slate-900/40">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Synergies
        </h2>
        {synergies.length === 0 ? (
          <p className="text-slate-600 dark:text-slate-300">
            No synergies recorded yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {synergies.slice(0, 4).map((entry) => (
              <RelationRow key={entry.id} entry={entry} />
            ))}
          </ul>
        )}
      </section>

      <section className="flex flex-col gap-4 rounded-xl border border-slate-300 bg-white/60 p-6 shadow-sm backdrop-blur-sm md:col-span-2 dark:border-slate-700 dark:bg-slate-900/40">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Best counters
        </h2>
        {counters.length === 0 ? (
          <p className="text-slate-600 dark:text-slate-300">
            No counters recorded yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {counters.slice(0, 4).map((entry) => (
              <RelationRow key={entry.id} entry={entry} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default HeroDetailPage;
