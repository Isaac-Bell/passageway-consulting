import { getHomepageContent, isContentCollection, listPublicContent } from "@/app/lib/cms-data";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const collection = new URL(request.url).searchParams.get("collection") ?? "";
  if (collection === "homepage") return safe(async () => Response.json(await getHomepageContent()), { settings: {}, featuredEvent: null });
  if (!isContentCollection(collection) || collection === "users" || collection === "homepage") {
    return Response.json({ error: "Unknown public content collection" }, { status: 400 });
  }
  return safe(async () => Response.json({ items: await listPublicContent(collection) }), { items: [] });
}

async function safe(action: () => Promise<Response>, fallback: object) {
  try {
    return await action();
  } catch {
    // Agent previews and source builds do not have the production Supabase
    // environment. A quiet empty response preserves the static site there.
    return Response.json(fallback);
  }
}
