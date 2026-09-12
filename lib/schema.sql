CREATE TABLE IF NOT EXISTS heroes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('tank', 'damage', 'support')),
  archetype TEXT NOT NULL CHECK (archetype IN ('dive', 'brawl', 'poke')),
  subrole TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  age INTEGER,
  hitpoints TEXT NOT NULL,
  perks TEXT NOT NULL,
  story TEXT NOT NULL
)
