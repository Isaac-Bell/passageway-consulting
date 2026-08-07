import { and, eq, isNull } from "drizzle-orm";
import { getDb } from "@/db";
import { adminUsers } from "@/db/schema";
import { getChatGPTUser, requireChatGPTUser } from "@/app/chatgpt-auth";

export type CmsRole = "admin" | "editor";

export type CmsUser = {
  email: string;
  name: string;
  role: CmsRole;
};

export async function getCmsUser(): Promise<CmsUser | null> {
  const identity = await getChatGPTUser();
  if (!identity) return null;

  const db = await getDb();
  const [record] = await db
    .select()
    .from(adminUsers)
    .where(
      and(
        eq(adminUsers.email, identity.email.toLowerCase()),
        eq(adminUsers.active, true),
        isNull(adminUsers.deletedAt),
      ),
    )
    .limit(1);

  if (!record) return null;
  return {
    email: record.email,
    name: record.name || identity.displayName,
    role: record.role,
  };
}

export async function requireCmsUser(returnTo = "/admin"): Promise<CmsUser> {
  await requireChatGPTUser(returnTo);
  const user = await getCmsUser();
  if (!user) throw new CmsAccessError();
  return user;
}

export class CmsAccessError extends Error {
  constructor() {
    super("This account has not been invited to Passageway Admin.");
    this.name = "CmsAccessError";
  }
}
