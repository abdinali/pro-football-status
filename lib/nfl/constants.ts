/**
 * NFL static reference data: conferences, divisions, team membership, and
 * current-season metadata.
 */

export const CONFERENCES = ['AFC', 'NFC'] as const;
export type Conference = (typeof CONFERENCES)[number];

export const DIVISION_NAMES = ['East', 'North', 'South', 'West'] as const;
export type DivisionName = (typeof DIVISION_NAMES)[number];

export type DivisionKey = `${Conference}_${DivisionName}`;

/**
 * Abbreviations match nflverse / Pro Football Reference
 * conventions (LA = Rams, LAC = Chargers, LV = Raiders, WAS = Commanders,
 * JAX = Jaguars).
 */
export const TEAMS = [
	// AFC East
	{ abbr: 'BUF', name: 'Buffalo Bills', conference: 'AFC', division: 'East' },
	{ abbr: 'MIA', name: 'Miami Dolphins', conference: 'AFC', division: 'East' },
	{ abbr: 'NE', name: 'New England Patriots', conference: 'AFC', division: 'East' },
	{ abbr: 'NYJ', name: 'New York Jets', conference: 'AFC', division: 'East' },
	// AFC North
	{ abbr: 'BAL', name: 'Baltimore Ravens', conference: 'AFC', division: 'North' },
	{ abbr: 'CIN', name: 'Cincinnati Bengals', conference: 'AFC', division: 'North' },
	{ abbr: 'CLE', name: 'Cleveland Browns', conference: 'AFC', division: 'North' },
	{ abbr: 'PIT', name: 'Pittsburgh Steelers', conference: 'AFC', division: 'North' },
	// AFC South
	{ abbr: 'HOU', name: 'Houston Texans', conference: 'AFC', division: 'South' },
	{ abbr: 'IND', name: 'Indianapolis Colts', conference: 'AFC', division: 'South' },
	{ abbr: 'JAX', name: 'Jacksonville Jaguars', conference: 'AFC', division: 'South' },
	{ abbr: 'TEN', name: 'Tennessee Titans', conference: 'AFC', division: 'South' },
	// AFC West
	{ abbr: 'DEN', name: 'Denver Broncos', conference: 'AFC', division: 'West' },
	{ abbr: 'KC', name: 'Kansas City Chiefs', conference: 'AFC', division: 'West' },
	{ abbr: 'LV', name: 'Las Vegas Raiders', conference: 'AFC', division: 'West' },
	{ abbr: 'LAC', name: 'Los Angeles Chargers', conference: 'AFC', division: 'West' },
	// NFC East
	{ abbr: 'DAL', name: 'Dallas Cowboys', conference: 'NFC', division: 'East' },
	{ abbr: 'NYG', name: 'New York Giants', conference: 'NFC', division: 'East' },
	{ abbr: 'PHI', name: 'Philadelphia Eagles', conference: 'NFC', division: 'East' },
	{ abbr: 'WAS', name: 'Washington Commanders', conference: 'NFC', division: 'East' },
	// NFC North
	{ abbr: 'CHI', name: 'Chicago Bears', conference: 'NFC', division: 'North' },
	{ abbr: 'DET', name: 'Detroit Lions', conference: 'NFC', division: 'North' },
	{ abbr: 'GB', name: 'Green Bay Packers', conference: 'NFC', division: 'North' },
	{ abbr: 'MIN', name: 'Minnesota Vikings', conference: 'NFC', division: 'North' },
	// NFC South
	{ abbr: 'ATL', name: 'Atlanta Falcons', conference: 'NFC', division: 'South' },
	{ abbr: 'CAR', name: 'Carolina Panthers', conference: 'NFC', division: 'South' },
	{ abbr: 'NO', name: 'New Orleans Saints', conference: 'NFC', division: 'South' },
	{ abbr: 'TB', name: 'Tampa Bay Buccaneers', conference: 'NFC', division: 'South' },
	// NFC West
	{ abbr: 'ARI', name: 'Arizona Cardinals', conference: 'NFC', division: 'West' },
	{ abbr: 'LA', name: 'Los Angeles Rams', conference: 'NFC', division: 'West' },
	{ abbr: 'SF', name: 'San Francisco 49ers', conference: 'NFC', division: 'West' },
	{ abbr: 'SEA', name: 'Seattle Seahawks', conference: 'NFC', division: 'West' },
] as const satisfies ReadonlyArray<{
	abbr: string;
	name: string;
	conference: Conference;
	division: DivisionName;
}>;

export type TeamAbbr = (typeof TEAMS)[number]['abbr'];

/**
 * The season the app currently considers "current" for the homepage and
 * `/standings`. The cron worker writes games for this season into Postgres.
 * Update once per year (or move to a `seasons` row read at runtime if we want
 * to avoid redeploys).
 */
export const CURRENT_SEASON = 2025;

/** Number of regular-season weeks (17 games over 18 weeks since 2021). */
export const REGULAR_SEASON_WEEKS = 18;
