-- Pro Football Status — source of truth for the Supabase schema (v1)
-- Run once in Supabase Dashboard → SQL Editor (New query → paste → Run).

-- teams
create table if not exists public.teams (
  team_abbr text primary key,
  full_name text not null,
  conference text not null check (conference in ('AFC', 'NFC')),
  division text not null check (division in ('East', 'North', 'South', 'West')),
  primary_color text,
  logo_url text
);

-- seasons
create table if not exists public.seasons (
  year integer primary key,
  current_week integer not null check (current_week between 1 and 22),
  regular_season_weeks integer not null default 18 check (regular_season_weeks between 1 and 22)
);

-- games (populated by cron from nflverse; empty until first ingest)
create table if not exists public.games (
  game_id text primary key,
  season integer not null references public.seasons (year) on delete cascade,
  week integer not null check (week between 1 and 22),
  season_type text not null check (season_type in ('REG', 'WC', 'DIV', 'CON', 'SB')),
  home_team text not null references public.teams (team_abbr),
  away_team text not null references public.teams (team_abbr),
  home_score integer check (home_score is null or home_score >= 0),
  away_score integer check (away_score is null or away_score >= 0),
  status text not null default 'scheduled' check (status in ('scheduled', 'in_progress', 'final')),
  kickoff_at timestamptz,
  neutral_site boolean not null default false,
  divisional boolean not null default false,
  conference_game boolean not null default false,
  check (home_team <> away_team)
);

create index if not exists games_season_week_idx on public.games (season, week);
create index if not exists games_season_status_idx on public.games (season, status);
create index if not exists games_kickoff_idx on public.games (kickoff_at);

-- Row Level Security: public read-only for the app (anon / publishable key)
alter table public.teams enable row level security;
alter table public.seasons enable row level security;
alter table public.games enable row level security;

drop policy if exists "teams_public_read" on public.teams;
create policy "teams_public_read"
  on public.teams for select
  to anon, authenticated
  using (true);

drop policy if exists "seasons_public_read" on public.seasons;
create policy "seasons_public_read"
  on public.seasons for select
  to anon, authenticated
  using (true);

drop policy if exists "games_public_read" on public.games;
create policy "games_public_read"
  on public.games for select
  to anon, authenticated
  using (true);

-- API role grants (required if "Automatically expose new tables" is off in Supabase)
grant usage on schema public to anon, authenticated, service_role;

grant select on public.teams to anon, authenticated;
grant select on public.seasons to anon, authenticated;
grant select on public.games to anon, authenticated;

grant all on public.teams to service_role;
grant all on public.seasons to service_role;
grant all on public.games to service_role;
