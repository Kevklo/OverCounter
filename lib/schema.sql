CREATE TABLE IF NOT EXISTS heroes (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('tank', 'damage', 'support')),
  archetype TEXT NOT NULL CHECK (archetype IN ('dive', 'brawl', 'poke')),
  subrole TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  age INTEGER,
  hitpoints TEXT NOT NULL,
  perks TEXT NOT NULL,
  abilities TEXT NOT NULL,
  story TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS counters (
  winner_id TEXT NOT NULL REFERENCES heroes(id) ON DELETE CASCADE,
  loser_id TEXT NOT NULL REFERENCES heroes(id) ON DELETE CASCADE,
  strength REAL NOT NULL CHECK (strength BETWEEN 0.0 AND 1.0),
  PRIMARY KEY (winner_id, loser_id),
  CHECK (winner_id <> loser_id)
);

CREATE INDEX IF NOT EXISTS idx_counters_loser ON counters(loser_id);

CREATE TABLE IF NOT EXISTS synergies (
  id TEXT NOT NULL REFERENCES heroes(id) ON DELETE CASCADE,
  synergy_id TEXT NOT NULL REFERENCES heroes(id) ON DELETE CASCADE,
  strength REAL NOT NULL CHECK (strength BETWEEN 0.0 AND 1.0),
  PRIMARY KEY (id, synergy_id),
  CHECK (id < synergy_id)
);

CREATE INDEX IF NOT EXISTS idx_synergies_synergy ON synergies(synergy_id);
