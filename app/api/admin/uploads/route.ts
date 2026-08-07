import { getCmsSession } from "@/app/lib/cms-auth";
import { slugify } from "@/app/lib/cms-data";

export const dynamic = "force-dynamic";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "application/pdf"]);
const maxBytes = 10 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const session = await getCmsSession(request);
    if (!session) return Response.json({ error: "Sign in with an invited Passageway email" }, { status: 401 });

    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return Response.json({ error: "Choose a file to upload" }, { status: 400 });
    if (!allowedTypes.has(file.type)) return Response.json({ error: "Upload a JPG, PNG, WebP, or PDF file" }, { status: 400 });
    if (file.size > maxBytes) return Response.json({ error: "Files must be 10 MB or smaller" }, { status: 400 });

    const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || (file.type === "application/pdf" ? "pdf" : "bin");
    const stem = slugify(file.name.replace(/\.[^.]+$/, "")) || "passageway-file";
    const folder = file.type === "application/pdf" ? "resources" : "images";
    const key = `${folder}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${stem}.${extension}`;

    const { error: uploadError } = await session.client.storage.from("passageway-cms").upload(key, await file.arrayBuffer(), {
      contentType: file.type,
      cacheControl: "3600",
      upsert: false,
    });
    if (uploadError) throw new Error(uploadError.message);

    const { data } = session.client.storage.from("passageway-cms").getPublicUrl(key);
    return Response.json({ url: data.publicUrl, key, name: file.name });
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : "Upload failed";
    return Response.json({ error: message }, { status: 500 });
  }
}
