import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";
import { getSupabaseAnonKey, getSupabaseUrl } from "./env";

export function createBrowserSupabase() {
  return createClient<Database>(getSupabaseUrl(), getSupabaseAnonKey());
}
