// Shared #LaplandVibes newsletter backend (Supabase anon/publishable pair).
//
// The fallbacks are load-bearing, not a convenience: .github/workflows/deploy.yml
// builds from a clean clone where .env does not exist, so env-only reads compile
// to undefined — the inline form threw before fetch and the popup posted to
// "undefined/functions/…" (night patrol 2026-08-21, zero requests on live).
// Env still wins when present, and '' from an unset CI secret falls through too.
//
// 🔴 This deliberately diverges from the app's 2026-08-18 decision
// (memory: appi_kuoli_hiljaa_env_puuttui_buildista_20260818), which rejected a
// runtime fallback on the grounds that it trades a loud build failure for a
// quiet half-broken production. That reasoning holds where the value is
// environment-specific — there, a fallback would serve the WRONG backend.
// Here it is not: there is exactly one shared newsletter project for the whole
// network, these are its public (role=anon) values, and the very same project is
// already hardcoded as CONTACT_ENDPOINT in src/shared/Footer.tsx. The bundle
// built with the fallback is byte-equivalent in behaviour to one built with
// .env, so nothing is half-broken — and a hard build gate would instead leave
// this site's only CI deploy path failing until repo secrets are added.
// If the project or key ever rotates, update this file together with Footer.tsx.
export const SUPABASE_URL: string =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
  'https://oogioaxmfnqcbvjbcodh.supabase.co';

export const SUPABASE_ANON_KEY: string =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZ2lvYXhtZm5xY2J2amJjb2RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NjMyNDIsImV4cCI6MjA5MDQzOTI0Mn0.eTfgsux0zV3_gPyFRUcE8M_-DuDpU2xE9gehQM9pz54';
