import { migrate } from "@/lib/migrate";
import { seed } from "@/lib/seed";
import { db } from "@/lib/db";

const command = process.argv[2];

switch (command) {
  case "migrate":
    migrate();
    console.log("migrate ok");
    break;
  case "seed":
    seed();
    console.log("seed ok");
    break;
  case "reset":
    db.exec("DROP TABLE IF EXISTS synergies");
    db.exec("DROP TABLE IF EXISTS counters");
    db.exec("DROP TABLE IF EXISTS heroes");
    migrate();
    seed();
    console.log("reset ok");
    break;
  case "list":
    console.table(db.prepare("SELECT * FROM heroes").all());
    break;
  default:
    console.error("Unknown command");
    process.exit(1);
}
