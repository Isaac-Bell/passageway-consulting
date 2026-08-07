import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type SupabasePublicConfig = {
  url: string;
  publishableKey: string;
};

export async function getSupabasePublicConfig(): Promise<SupabasePublicConfig> {
  const { env } = await import("cloudflare:workers");
  const url = stringValue(env.SUPABASE_URL);
  const publishableKey = stringValue(env.SUPABASE_PUBLISHABLE_KEY);

  if (!url || !publishableKey) {
    throw new Error(
      "Passageway's Supabase connection is not configured yet. Add SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY to the Sites runtime environment.",
    );
  }

  return { url, publishableKey };
}

export async function getSupabaseClient(accessToken?: string): Promise<SupabaseClient> {
  const config = await getSupabasePublicConfig();
  return createClient(config.url, config.publishableKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
    global: accessToken
      ? { headers: { Authorization: `Bearer ${accessToken}` } }
      : undefined,
  });
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}
