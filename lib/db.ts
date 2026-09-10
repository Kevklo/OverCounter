// import "server-only";
import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "overcounter.db");

const openDatabase = (): Database.Database =>{
  fs.mkdirSync(DATA_DIR, {recursive: true});
  const instance = new Database(DB_PATH);
  instance.pragma("journal_mode = WAL");
  instance.pragma("foreign_key = ON");

  return instance
}

const globalForDb = globalThis as unknown as { __overcounterDB ?: Database.Database };

export const db: Database.Database = globalForDb.__overcounterDB ?? openDatabase();

if (process.env.NODE_ENV != "production"){
  globalForDb.__overcounterDB = db;
}