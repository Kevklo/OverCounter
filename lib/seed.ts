// import "server-only";
import fs from "node:fs";
import path from "node:path";
import { db } from "./db";

export const seed = (): void => {
  const seeder = fs.readFileSync(path.join(process.cwd(), "lib", "seed.sql"), "utf8");
  db.exec(seeder);
  return;
}