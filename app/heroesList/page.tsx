import { isHeroArchetype, type Hero } from "@/lib/types";
import { listHeroes } from "@/lib/heroes";
import HeroExplorer from "@/app/components/HeroExplorer";
import FilterButtons from "@/app/components/FilterButtons";

const HeroesListPage = async (props: PageProps<"/heroesList">) => {
  const { archetype } = await props.searchParams;

  const validArchetype = isHeroArchetype(archetype) ? archetype : undefined;

  const heroes: Hero[] = listHeroes({ archetype: validArchetype });

  return (
    <HeroExplorer
      key={`${validArchetype ?? "all"}`}
      heroes={heroes}
      filters={<FilterButtons archetype={validArchetype} />}
    />
  );
};

export default HeroesListPage;
