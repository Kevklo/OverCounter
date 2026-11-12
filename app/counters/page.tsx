import { listHeroes } from "@/lib/heroes";
import { listWeakAgainst } from "@/lib/relations";
import type { HeroLite } from "@/lib/types";
import TeamCounterBuilder from "@/app/components/TeamCounterBuilder";

export const dynamic = "force-dynamic";

const CountersPage = () => {
  const heroes: HeroLite[] = listHeroes().map(
    ({ id, name, role, archetype, image_url }) => ({
      id,
      name,
      role,
      archetype,
      image_url,
    })
  );

  const weakAgainst = listWeakAgainst();

  return (
    <main className="mx-auto w-full max-w-6xl px-3 py-6 sm:px-4 sm:py-8">
      <h1 className="mb-2 text-2xl font-bold text-[var(--text)] sm:text-3xl">
        Team Counters
      </h1>
      <p className="mb-6 max-w-2xl text-sm text-[var(--muted)] sm:mb-8">
        Choose your rival team to see your best counter by role.
      </p>
      <TeamCounterBuilder heroes={heroes} weakAgainst={weakAgainst} />
    </main>
  );
};

export default CountersPage;
