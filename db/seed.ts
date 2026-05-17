/**
 * Seed teams + current season into Supabase.
 *
 * Prerequisites:
 * 1. Run db/schema.sql in Supabase SQL Editor
 * 2. Fill in .dev.vars with SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 *
 * Usage: npm run db:seed
 */
import { createClient } from "@supabase/supabase-js";
import {
  CURRENT_SEASON,
  REGULAR_SEASON_WEEKS,
  TEAMS,
} from "../lib/nfl/constants";
import { loadDevVars } from "./load-dev-vars";

loadDevVars();

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  throw new Error(
    "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .dev.vars",
  );
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function seed() {
  const teamRows = TEAMS.map((t) => ({
    team_abbr: t.abbr,
    full_name: t.name,
    conference: t.conference,
    division: t.division,
    primary_color: null,
    logo_url: null,
  }));

  const { error: teamsError } = await supabase
    .from("teams")
    .upsert(teamRows, { onConflict: "team_abbr" });

  if (teamsError) {
    throw new Error(`teams upsert failed: ${teamsError.message}`);
  }

  const { error: seasonError } = await supabase.from("seasons").upsert(
    {
      year: CURRENT_SEASON,
      current_week: REGULAR_SEASON_WEEKS,
      regular_season_weeks: REGULAR_SEASON_WEEKS,
    },
    { onConflict: "year" },
  );

  if (seasonError) {
    throw new Error(`seasons upsert failed: ${seasonError.message}`);
  }

  console.log(`Seeded ${teamRows.length} teams and season ${CURRENT_SEASON}.`);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
