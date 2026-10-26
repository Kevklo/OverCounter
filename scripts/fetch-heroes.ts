import { fetchHeroes } from "@/lib/fetch-heroes";

fetchHeroes()
  .then((heroes) => console.log(`Wrote ${heroes.length} heroes to lib/heroes-data.json`))
  .catch((err: unknown) => {
    console.error(err);
    process.exitCode = 1;
  });
