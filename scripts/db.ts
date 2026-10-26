import { migrate } from "@/lib/migrate";
import { seed } from "@/lib/seed";
import { db } from "@/lib/db";
import { fetchHeroes } from "@/lib/fetch-heroes";

const command = process.argv[2];

async function main(): Promise<void> {
  switch (command) {
    case "migrate":
      migrate();
      console.log("migrate ok");
      break;
    case "seed":
      await seed();
      console.log("seed ok");
      break;
    case "reset":
      // Fetch before dropping tables so an API failure does not wipe the database.
      await fetchHeroes();
      db.exec("DROP TABLE IF EXISTS synergies");
      db.exec("DROP TABLE IF EXISTS counters");
      db.exec("DROP TABLE IF EXISTS heroes");
      migrate();
      await seed({ refreshHeroes: false });
      console.log("reset ok");
      break;
    case "list":
      console.table(db.prepare("SELECT name FROM heroes").all());
      break;
    default:
      console.error("Unknown command");
      process.exitCode = 1;
  }
}

main().catch((err: unknown) => {
  console.error(err);
  process.exitCode = 1;
});
