// Shared #LaplandVibes newsletter backend (Supabase anon/publishable pair).
// The hardcoded fallbacks are load-bearing, not a convenience: GitHub Actions
// (.github/workflows/deploy.yml) builds from a clean clone where .env does not
// exist, so env-only reads compile to undefined — the inline form then threw
// before fetch and the popup posted to "undefined/functions/…" (night patrol
// 2026-08-21, zero requests on live). Env vars still win when present.
// These values ship in every client bundle by design (role=anon), same as the
// hardcoded CONTACT_ENDPOINT in src/shared/Footer.tsx.
export const SUPABASE_URL: string =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
  'https://oogioaxmfnqcbvjbcodh.supabase.co';

export const SUPABASE_ANON_KEY: string =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZ2lvYXhtZm5xY2J2amJjb2RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NjMyNDIsImV4cCI6MjA5MDQzOTI0Mn0.eTfgsux0zV3_gPyFRUcE8M_-DuDpU2xE9gehQM9pz54';
