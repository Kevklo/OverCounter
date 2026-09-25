# OverCounter

A small, fan-made web app for exploring **Overwatch** hero counters and building a
team that counters a rival composition.

## Features

- **Heroes list** grouped by role (tank / damage / support) with text search and
  archetype filters.
- **Hero detail** with abilities (interactive picker), perks, and counters.
- **Team Counters**: pick a rival team (1 tank / 2 damage / 2 support) and get the
  best counter pick per role, with an average counter score and the best matchup
  per hero.

## Getting started

```bash
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

Open <http://localhost:3000>.

Or test it on `link`

## Disclaimer

OverCounter is an unofficial, non-commercial fan project. It is **not** affiliated
with, endorsed by, or sponsored by Blizzard Entertainment or the Overwatch
franchise. Overwatch, its heroes, and all related assets, names and imagery are
trademarks and copyrights of Blizzard Entertainment. Hero data is provided by the
community-run OverFast API.
