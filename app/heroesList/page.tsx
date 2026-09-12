import '../styles/styles.css'
import NavBar from '../components/NavBar';
import type { Hero } from '@/lib/types';
import { listHeroes } from '@/lib/heroes';
import HeroExplorer from './../components/HeroExplorer';
import FilterButtons from './../components/FilterButtons';

const HeroesListPage = async (props: PageProps<'/heroesList'>) => {
  const { role, archetype } = await props.searchParams;

  const validRole = (role === "tank") || (role === "damage") || (role === "support") ? role : undefined;

  const validArchetype = (archetype === "dive") || (archetype === "brawl") || (archetype === "poke") ? archetype: undefined;

  const heroes: Hero[] = listHeroes({role: validRole, archetype: validArchetype});
  return (
    <>
      <NavBar></NavBar>
      <HeroExplorer
        key={`${validRole ?? "all"}-${validArchetype ?? "all"}`}
        heroes={heroes}
        filters={<FilterButtons role={validRole} archetype={validArchetype} />}
      ></HeroExplorer>
    </>
  )
}

export default HeroesListPage;
