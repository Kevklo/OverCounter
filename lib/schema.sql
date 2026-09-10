CREATE TABLE IF NOT EXISTS heroes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('tank', 'damage', 'support')),
  archetype TEXT NOT NULL CHECK (archetype IN ('dive', 'brawl', 'poke')),
  description TEXT NOT NULL,
  image_url TEXT
)
