import Image from "next/image";
import { notFound } from "next/navigation";
import { getHeroById } from "@/lib/heroes";
import type { Hero, Perk } from "@/lib/types";
import Pills from "@/app/components/Pills";

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

const HeroDetailPage = async (props: PageProps<"/hero/[id]">) => {
  const { id } = await props.params;
  const hero: Hero | undefined = getHeroById(id);
  if (!hero) notFound();

  return (
    <div className="flex flex-col mx-auto w-full max-w-5xl px-4 py-8 gap-20">
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
        <div className="w-full max-w-[320px] shrink-0">
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

        <div className="flex flex-1 flex-col items-center gap-6 md:items-start">
          <h1 className="text-center text-6xl text-slate-900 md:text-left md:text-8xl dark:text-slate-100">
            {hero.name}
          </h1>
          <p className="text-3xl">
            {hero.description}
          </p>
          <div className="flex flex-row gap-4 text-3xl">
            <Pills kind="role" value={hero.role} />
            <Pills kind="archetype" value={hero.archetype} />
          </div>

          <div className="flex w-full flex-col gap-6">
            {(["minor", "major"] as const).map((tier) => (
              <section key={tier} className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold capitalize text-slate-900 dark:text-slate-100">
                  {tier} perks
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {hero.perks[tier].map((perk) => (
                    <PerkItem key={perk.name} perk={perk} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
      <div className="text-5xl self-center">
        SYNERGIES: WIP
      </div>
      <div className="text-5xl self-center">
        BEST COUNTERS: WIP
      </div>
    </div>
  );
};

export default HeroDetailPage;
