// import "server-only";
import fs from "node:fs";
import path from "node:path";
import { db } from "./db";

export function migrate(): void {
  const schema = fs.readFileSync(path.join(process.cwd(), "lib", "schema.sql"), "utf8");
  db.exec(schema);
}