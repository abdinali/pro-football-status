export type Conference = "AFC" | "NFC";
export type DivisionName = "East" | "North" | "South" | "West";
export type GameStatus = "scheduled" | "in_progress" | "final";
export type SeasonType = "REG" | "WC" | "DIV" | "CON" | "SB";

export type TeamRow = {
  team_abbr: string;
  full_name: string;
  conference: Conference;
  division: DivisionName;
  primary_color: string | null;
  logo_url: string | null;
};

export type SeasonRow = {
  year: number;
  current_week: number;
  regular_season_weeks: number;
};

export type GameRow = {
  game_id: string;
  season: number;
  week: number;
  season_type: SeasonType;
  home_team: string;
  away_team: string;
  home_score: number | null;
  away_score: number | null;
  status: GameStatus;
  kickoff_at: string | null;
  neutral_site: boolean;
  divisional: boolean;
  conference_game: boolean;
};

export type Database = {
  public: {
    Tables: {
      teams: { Row: TeamRow; Insert: TeamRow; Update: Partial<TeamRow> };
      seasons: { Row: SeasonRow; Insert: SeasonRow; Update: Partial<SeasonRow> };
      games: { Row: GameRow; Insert: GameRow; Update: Partial<GameRow> };
    };
  };
};
