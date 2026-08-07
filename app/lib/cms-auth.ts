import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseClient } from "@/db";
import type { CmsRole } from "@/db/schema";

export type { CmsRole } from "@/db/schema";

export type CmsUser = {
  email: string;
  name: string;
  role: CmsRole;
};

export type CmsSession = {
  user: CmsUser;
  client: SupabaseClient;
  accessToken: string;
};

export async function getCmsSession(request: Request): Promise<CmsSession | null> {
  const accessToken = bearerToken(request);
  if (!accessToken) return null;

  const client = await getSupabaseClient(accessToken);
  const { data: identity, error: identityError } = await client.auth.getUser(accessToken);
  const email = identity.user?.email?.trim().toLowerCase();
  if (identityError || !email) return null;

  const { data: record, error } = await client
    .from("admin_users")
    .select("email,name,role,active,deleted_at")
    .eq("email", email)
    .eq("active", true)
    .is("deleted_at", null)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!record) return null;

  return {
    accessToken,
    client,
    user: {
      email: String(record.email),
      name: String(record.name || identity.user.user_metadata?.full_name || email),
      role: record.role === "admin" ? "admin" : "editor",
    },
  };
}

export class CmsAccessError extends Error {
  constructor() {
    super("This email has not been invited to Passageway Admin.");
    this.name = "CmsAccessError";
  }
}

function bearerToken(request: Request) {
  const header = request.headers.get("authorization") ?? "";
  const [scheme, token] = header.split(/\s+/, 2);
  return scheme?.toLowerCase() === "bearer" && token ? token : "";
}
