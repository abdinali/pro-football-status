# Pro Football Status

NFL playoff scenario simulator and analytics hub. Pick the winner of every remaining regular-season game and watch the playoff seeds (and tiebreakers) update live. Share scenarios with anyone via URL.

> v1 scope: real standings + scenario simulator + tiebreaker engine + shareable URLs. No accounts, no live scores, no analytics dashboards yet.

## Stack

- **Web app:** Next.js 16 (App Router, TypeScript, Tailwind v4)
- **Hosting:** Cloudflare Workers via [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare)
- **Database:** Supabase (Postgres) — `teams`, `seasons`, `games`
- **Object storage:** Cloudflare R2 — raw nflverse CSV/Parquet snapshots (audit trail)
- **Data source:** [nflverse-data](https://github.com/nflverse/nflverse-data) GitHub releases
- **Cron worker:** separate Wrangler-deployed Worker that pulls schedules every 6h
- **Tests:** Vitest

## Local development

```bash
# 1. Install deps
npm install

# 2. Copy local env file and fill in Supabase keys
cp .dev.vars.example .dev.vars

# 3. Run the Next.js dev server (Cloudflare bindings are wired in via next.config.ts)
npm run dev
```

Open http://localhost:3000.

To preview the actual Cloudflare Worker build (closer to production):

```bash
npm run preview
```

## Deploy

```bash
# First time only: create Cloudflare account, login, set Wrangler secrets
npx wrangler login
npx wrangler secret put SUPABASE_URL
npx wrangler secret put SUPABASE_ANON_KEY

# Build + deploy (the Next.js app)
npm run deploy
```

The cron worker that ingests nflverse data deploys separately from `workers/cron-nflverse`.

## Repo layout

```
app/             Next.js App Router pages
components/      React UI (Picker, Standings)
lib/
  tiebreakers/   Pure-TS NFL tiebreaker engine (works in browser + server)
  scenario/      base64url codec for picks-in-URL
  nflverse/      CSV fetcher + zod schemas
  supabase/      thin server/browser clients
  nfl/           constants (divisions, conferences, current season)
workers/
  cron-nflverse/ scheduled Worker for nflverse ingest
db/
  schema.sql     source of truth for the Supabase schema
  migrations/    Supabase CLI migrations
  seed.ts        seeds teams + current season
tests/           Vitest specs
notes/           local scratch (gitignored): build guides, todos
```

## Methodology in one paragraph

Standings are computed from the `games` table by a pure TypeScript engine that implements the NFL's published tiebreaker ladders for divisions and wild cards (head-to-head → division/conference record → common games → strength of victory → strength of schedule → ranking-in-points → net points → coin flip). The same engine runs server-side for `/standings` and client-side on every keystroke in `/sim`. For v1, Strength of Victory and Strength of Schedule use **real games only** — your simulated picks don't recursively change opponents' SoV/SoS. See `/methodology` in the deployed app for the long version.
