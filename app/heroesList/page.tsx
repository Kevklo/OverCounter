import { isHeroArchetype, isHeroRole, type Hero } from "@/lib/types";
import { listHeroes } from "@/lib/heroes";
import HeroExplorer from "@/app/components/HeroExplorer";
import FilterButtons from "@/app/components/FilterButtons";

const HeroesListPage = async (props: PageProps<"/heroesList">) => {
  const { role, archetype } = await props.searchParams;

  const validRole = isHeroRole(role) ? role : undefined;
  const validArchetype = isHeroArchetype(archetype) ? archetype : undefined;

  const heroes: Hero[] = listHeroes({ role: validRole, archetype: validArchetype });

  return (
    <HeroExplorer
      key={`${validRole ?? "all"}-${validArchetype ?? "all"}`}
      heroes={heroes}
      filters={<FilterButtons role={validRole} archetype={validArchetype} />}
    />
  );
};

export default HeroesListPage;
