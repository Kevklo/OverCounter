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

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Server Components) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- SQLite via [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)
- Hero data generated from the community [OverFast API](https://overfast-api.tekrop.fr)

## Getting started

```bash
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

Open <http://localhost:3000>.

### Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Start the production server |
| `npm run db:migrate` | Create the SQLite schema |
| `npm run db:seed` | Seed heroes and relations from `lib/*-data.json` |
| `npm run db:reset` | Drop, recreate and re-seed the database |
| `npm run db:list` | Print all heroes |

To regenerate hero data from the OverFast API:

```bash
npx tsx scripts/fetch-heroes.ts
```

## Data

- `lib/heroes-data.json` — hero data generated from the OverFast API (committed).
- `lib/relations-data.json` — counters and synergies, curated by hand.
- The SQLite database lives in `data/` and is generated at seed time (not versioned).

## Deploy

Configured for [Render](https://render.com) via `render.yaml`. The database is
regenerated on every deploy, so no persistent disk is required.

## Disclaimer

OverCounter is an unofficial, non-commercial fan project. It is **not** affiliated
with, endorsed by, or sponsored by Blizzard Entertainment or the Overwatch
franchise. Overwatch, its heroes, and all related assets, names and imagery are
trademarks and copyrights of Blizzard Entertainment. Hero data is provided by the
community-run OverFast API.
