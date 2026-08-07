import { archiveContent, createContent, isContentCollection, listAdminContent, updateContent } from "@/app/lib/cms-data";
import { getCmsSession } from "@/app/lib/cms-auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return withAdmin(request, async ({ user, client }) => {
    const collection = new URL(request.url).searchParams.get("collection") ?? "";
    if (!isContentCollection(collection)) return error("Unknown content collection", 400);
    if (collection === "users" && user.role !== "admin") return error("Administrator access is required", 403);
    return Response.json({ items: await listAdminContent(collection, client), user });
  });
}

export async function POST(request: Request) {
  return withAdmin(request, async ({ user, client }) => {
    const payload = await body(request);
    const collection = String(payload.collection ?? "");
    if (!isContentCollection(collection)) return error("Unknown content collection", 400);
    if (collection === "users" && user.role !== "admin") return error("Administrator access is required", 403);
    const item = await createContent(collection, objectValue(payload.data), user.email, client);
    return Response.json({ item }, { status: 201 });
  });
}

export async function PATCH(request: Request) {
  return withAdmin(request, async ({ user, client }) => {
    const payload = await body(request);
    const collection = String(payload.collection ?? "");
    if (!isContentCollection(collection)) return error("Unknown content collection", 400);
    if (collection === "users" && user.role !== "admin") return error("Administrator access is required", 403);
    if (collection === "users") {
      const target = (await listAdminContent("users", client)).find((item) => item.id === Number(payload.id));
      const data = objectValue(payload.data);
      if (target?.email === user.email && (data.active === false || data.role === "editor")) {
        return error("You cannot disable or downgrade your own administrator account", 400);
      }
    }
    const item = await updateContent(collection, String(payload.id ?? ""), objectValue(payload.data), user.email, client);
    return Response.json({ item });
  });
}

export async function DELETE(request: Request) {
  return withAdmin(request, async ({ user, client }) => {
    const payload = await body(request);
    const collection = String(payload.collection ?? "");
    if (!isContentCollection(collection)) return error("Unknown content collection", 400);
    if (collection === "users" && user.role !== "admin") return error("Administrator access is required", 403);
    if (collection === "users") {
      const users = await listAdminContent("users", client);
      const target = users.find((item) => item.id === Number(payload.id));
      if (target?.email === user.email) return error("You cannot archive your own administrator account", 400);
      if (target?.role === "admin" && users.filter((item) => item.role === "admin" && item.active).length <= 1) {
        return error("Passageway Admin must keep at least one active administrator", 400);
      }
    }
    await archiveContent(collection, String(payload.id ?? ""), user.email, client);
    return Response.json({ ok: true });
  });
}

async function withAdmin(
  request: Request,
  action: (session: NonNullable<Awaited<ReturnType<typeof getCmsSession>>>) => Promise<Response>,
) {
  try {
    const session = await getCmsSession(request);
    if (!session) return error("Sign in with an invited Passageway email", 401);
    return await action(session);
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : "Unexpected Passageway Admin error";
    return error(message, message.includes("required") ? 400 : 500);
  }
}

async function body(request: Request) {
  const value = await request.json();
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("A JSON object is required");
  return value as Record<string, unknown>;
}

function objectValue(value: unknown) {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function error(message: string, status: number) {
  return Response.json({ error: message }, { status });
}
