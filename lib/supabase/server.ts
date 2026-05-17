import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";
import { getSupabaseAnonKey, getSupabaseUrl } from "./env";

/** Read-only Supabase client for Server Components / route handlers. */
export function createServerSupabase() {
  return createClient<Database>(getSupabaseUrl(), getSupabaseAnonKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
