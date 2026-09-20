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
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold text-[var(--text)]">Team Counters</h1>
      <p className="mb-8 text-sm text-[var(--muted)]">
        Elegí el equipo rival (1 tank, 2 damage, 2 support) y mirá tu mejor
        counter por rol.
      </p>

      <TeamCounterBuilder heroes={heroes} weakAgainst={weakAgainst} />
    </main>
  );
};

export default CountersPage;
