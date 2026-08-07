declare module "cloudflare:workers" {
  export const env: {
    SUPABASE_URL?: string;
    SUPABASE_PUBLISHABLE_KEY?: string;
    [key: string]: unknown;
  };
}
