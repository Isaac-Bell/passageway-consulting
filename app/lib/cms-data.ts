import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseClient } from "@/db";
import type {
  BlogPostRow,
  CmsRole,
  EventRow,
  PublicCmsRow,
  ResourceRow,
  ServiceRow,
  TeamMemberRow,
  TestimonialRow,
} from "@/db/schema";

export const contentCollections = [
  "services",
  "events",
  "posts",
  "resources",
  "testimonials",
  "team",
  "homepage",
  "users",
] as const;

export type ContentCollection = (typeof contentCollections)[number];
export type ContentInput = Record<string, unknown>;
type PublicCollection = Exclude<ContentCollection, "users" | "homepage">;

export function isContentCollection(value: string): value is ContentCollection {
  return contentCollections.includes(value as ContentCollection);
}

export async function listAdminContent(collection: ContentCollection, suppliedClient?: SupabaseClient) {
  const client = suppliedClient ?? await getSupabaseClient();
  switch (collection) {
    case "services":
      return selectRows(client.from("services").select("*").is("deleted_at", null).order("sort_order").order("id"));
    case "events":
      return selectRows(client.from("events").select("*").is("deleted_at", null).order("starts_at", { ascending: false }).order("id", { ascending: false }));
    case "posts":
      return selectRows(client.from("blog_posts").select("*").is("deleted_at", null).order("published_at", { ascending: false }).order("id", { ascending: false }));
    case "resources":
      return selectRows(client.from("resources").select("*").is("deleted_at", null).order("featured", { ascending: false }).order("id", { ascending: false }));
    case "testimonials":
      return selectRows(client.from("testimonials").select("*").is("deleted_at", null).order("sort_order").order("id", { ascending: false }));
    case "team":
      return selectRows(client.from("team_members").select("*").is("deleted_at", null).order("sort_order").order("id"));
    case "users":
      return selectRows(client.from("admin_users").select("*").is("deleted_at", null).order("role", { ascending: false }).order("name"));
    case "homepage": {
      const { data, error } = await client.from("site_settings").select("*").eq("key", "homepage").maybeSingle();
      if (error) throw new Error(error.message);
      const row = data ? fromDb<Record<string, unknown>>(data) : null;
      return [{ id: "homepage", ...safeJsonObject(row?.value), updatedAt: row?.updatedAt ?? "" }];
    }
  }
}

export async function createContent(
  collection: ContentCollection,
  data: ContentInput,
  actorEmail: string,
  suppliedClient?: SupabaseClient,
) {
  const client = suppliedClient ?? await getSupabaseClient();
  switch (collection) {
    case "services": return insertOne(client, "services", serviceValues(data));
    case "events": return insertOne(client, "events", eventValues(data));
    case "posts": return insertOne(client, "blog_posts", postValues(data));
    case "resources": return insertOne(client, "resources", resourceValues(data));
    case "testimonials": return insertOne(client, "testimonials", testimonialValues(data));
    case "team": return insertOne(client, "team_members", teamValues(data));
    case "users": return insertOne(client, "admin_users", userValues(data));
    case "homepage": return saveHomepage(data, actorEmail, client);
  }
}

export async function updateContent(
  collection: ContentCollection,
  id: number | string,
  data: ContentInput,
  actorEmail: string,
  suppliedClient?: SupabaseClient,
) {
  const client = suppliedClient ?? await getSupabaseClient();
  const updatedAt = new Date().toISOString();
  switch (collection) {
    case "services": return updateOne(client, "services", id, { ...serviceValues(data), updatedAt });
    case "events": return updateOne(client, "events", id, { ...eventValues(data), updatedAt });
    case "posts": return updateOne(client, "blog_posts", id, { ...postValues(data), updatedAt });
    case "resources": return updateOne(client, "resources", id, { ...resourceValues(data), updatedAt });
    case "testimonials": return updateOne(client, "testimonials", id, { ...testimonialValues(data), updatedAt });
    case "team": return updateOne(client, "team_members", id, { ...teamValues(data), updatedAt });
    case "users": return updateOne(client, "admin_users", id, { ...userValues(data), updatedAt });
    case "homepage": return saveHomepage(data, actorEmail, client);
  }
}

export async function archiveContent(
  collection: ContentCollection,
  id: number | string,
  actorEmail: string,
  suppliedClient?: SupabaseClient,
) {
  if (collection === "homepage") return saveHomepage({}, actorEmail, suppliedClient);
  const client = suppliedClient ?? await getSupabaseClient();
  const deletedAt = new Date().toISOString();
  switch (collection) {
    case "services": return updateOne(client, "services", id, { deletedAt, active: false });
    case "events": return updateOne(client, "events", id, { deletedAt, status: "draft" });
    case "posts": return updateOne(client, "blog_posts", id, { deletedAt, status: "draft" });
    case "resources": return updateOne(client, "resources", id, { deletedAt, active: false });
    case "testimonials": return updateOne(client, "testimonials", id, { deletedAt, approved: false });
    case "team": return updateOne(client, "team_members", id, { deletedAt, active: false });
    case "users": return updateOne(client, "admin_users", id, { deletedAt, active: false });
  }
}

export function listPublicContent(collection: "services"): Promise<ServiceRow[]>;
export function listPublicContent(collection: "events"): Promise<EventRow[]>;
export function listPublicContent(collection: "posts"): Promise<BlogPostRow[]>;
export function listPublicContent(collection: "resources"): Promise<ResourceRow[]>;
export function listPublicContent(collection: "testimonials"): Promise<TestimonialRow[]>;
export function listPublicContent(collection: "team"): Promise<TeamMemberRow[]>;
export function listPublicContent(collection: PublicCollection): Promise<PublicCmsRow[]>;
export async function listPublicContent(collection: PublicCollection): Promise<PublicCmsRow[]> {
  const client = await getSupabaseClient();
  switch (collection) {
    case "services":
      return selectRows<ServiceRow>(client.from("services").select("*").eq("active", true).is("deleted_at", null).order("sort_order").order("id"));
    case "events":
      return selectRows<EventRow>(client.from("events").select("*").eq("status", "published").is("deleted_at", null).order("starts_at").order("id"));
    case "posts":
      return selectRows<BlogPostRow>(client.from("blog_posts").select("*").eq("status", "published").is("deleted_at", null).order("published_at", { ascending: false }).order("id", { ascending: false }));
    case "resources":
      return selectRows<ResourceRow>(client.from("resources").select("*").eq("active", true).is("deleted_at", null).order("featured", { ascending: false }).order("id", { ascending: false }));
    case "testimonials":
      return selectRows<TestimonialRow>(client.from("testimonials").select("*").eq("approved", true).is("deleted_at", null).order("sort_order").order("id", { ascending: false }));
    case "team":
      return selectRows<TeamMemberRow>(client.from("team_members").select("*").eq("active", true).is("deleted_at", null).order("sort_order").order("id"));
  }
}

export function getPublicItem(collection: "events", slug: string): Promise<EventRow | null>;
export function getPublicItem(collection: "posts", slug: string): Promise<BlogPostRow | null>;
export function getPublicItem(collection: "resources", slug: string): Promise<ResourceRow | null>;
export async function getPublicItem(
  collection: "events" | "posts" | "resources",
  slug: string,
): Promise<EventRow | BlogPostRow | ResourceRow | null> {
  const client = await getSupabaseClient();
  const table = collection === "posts" ? "blog_posts" : collection;
  let query = client.from(table).select("*").eq("slug", slug).is("deleted_at", null);
  query = collection === "events" ? query.eq("status", "published") : collection === "posts" ? query.eq("status", "published") : query.eq("active", true);
  const { data, error } = await query.maybeSingle();
  if (error) throw new Error(error.message);
  return data ? fromDb<EventRow | BlogPostRow | ResourceRow>(data) : null;
}

export async function getHomepageContent() {
  const client = await getSupabaseClient();
  const [{ data: settings, error: settingsError }, { data: events, error: eventsError }] = await Promise.all([
    client.from("site_settings").select("*").eq("key", "homepage").maybeSingle(),
    client.from("events").select("*").eq("status", "published").eq("featured", true).is("deleted_at", null).order("starts_at").limit(10),
  ]);
  if (settingsError) throw new Error(settingsError.message);
  if (eventsError) throw new Error(eventsError.message);
  const now = new Date().toISOString();
  const featuredEvent = (events ?? []).map((row) => fromDb<EventRow>(row)).find((event) => !event.startsAt || event.startsAt >= now) ?? null;
  return { settings: safeJsonObject(settings?.value), featuredEvent };
}

async function saveHomepage(data: ContentInput, actorEmail: string, suppliedClient?: SupabaseClient) {
  const client = suppliedClient ?? await getSupabaseClient();
  const value = {
    announcementEnabled: booleanValue(data, "announcementEnabled"),
    announcementTitle: textValue(data, "announcementTitle"),
    announcementBody: textValue(data, "announcementBody"),
    announcementCtaLabel: textValue(data, "announcementCtaLabel"),
    announcementCtaUrl: textValue(data, "announcementCtaUrl"),
  };
  const updatedAt = new Date().toISOString();
  const { error } = await client.from("site_settings").upsert({
    key: "homepage",
    value,
    updated_at: updatedAt,
    updated_by: actorEmail,
  }, { onConflict: "key" });
  if (error) throw new Error(error.message);
  return { id: "homepage", ...value, updatedAt };
}

async function selectRows<T extends Record<string, unknown> = Record<string, unknown>>(query: PromiseLike<{ data: unknown[] | null; error: { message: string } | null }>): Promise<T[]> {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => fromDb<T>(row as Record<string, unknown>));
}

async function insertOne(client: SupabaseClient, table: string, values: Record<string, unknown>) {
  const { data, error } = await client.from(table).insert(toDb(values)).select("*").single();
  if (error) throw new Error(error.message);
  return fromDb<Record<string, unknown>>(data);
}

async function updateOne(client: SupabaseClient, table: string, id: number | string, values: Record<string, unknown>) {
  const { data, error } = await client.from(table).update(toDb(values)).eq("id", numberId(id)).select("*").single();
  if (error) throw new Error(error.message);
  return fromDb<Record<string, unknown>>(data);
}

function serviceValues(data: ContentInput) {
  const name = requiredText(data, "name");
  return {
    slug: slugValue(data, name), name,
    eyebrow: textValue(data, "eyebrow", "Support"), category: textValue(data, "category", "Consulting"),
    summary: textValue(data, "summary"), description: textValue(data, "description"),
    initialPrice: textValue(data, "initialPrice"), followUpPrice: textValue(data, "followUpPrice"), priceNote: textValue(data, "priceNote"),
    bookingUrl: textValue(data, "bookingUrl", "https://passagewayconsulting.as.me/"), active: booleanValue(data, "active", true),
    featured: booleanValue(data, "featured"), sortOrder: numberValue(data, "sortOrder"),
  };
}

function eventValues(data: ContentInput) {
  const title = requiredText(data, "title");
  return {
    slug: slugValue(data, title), title, summary: textValue(data, "summary"), description: textValue(data, "description"),
    startsAt: textValue(data, "startsAt"), endsAt: textValue(data, "endsAt"), timezone: textValue(data, "timezone", "America/Chicago"),
    format: textValue(data, "format", "Online"), registrationUrl: textValue(data, "registrationUrl", "https://passagewayconsulting.as.me/"),
    imageUrl: textValue(data, "imageUrl"), priceLabel: textValue(data, "priceLabel"), capacityLabel: textValue(data, "capacityLabel"),
    status: enumValue(data, "status", ["draft", "published", "cancelled"] as const, "draft"), featured: booleanValue(data, "featured"),
  };
}

function postValues(data: ContentInput) {
  const title = requiredText(data, "title");
  const status = enumValue(data, "status", ["draft", "published"] as const, "draft");
  return {
    slug: slugValue(data, title), title, excerpt: textValue(data, "excerpt"), content: textValue(data, "content"),
    coverImageUrl: textValue(data, "coverImageUrl"), authorName: textValue(data, "authorName", "Passageway Consulting"),
    category: textValue(data, "category", "Compassion"), seoTitle: textValue(data, "seoTitle"), seoDescription: textValue(data, "seoDescription"),
    status, publishedAt: textValue(data, "publishedAt", status === "published" ? new Date().toISOString() : ""),
  };
}

function resourceValues(data: ContentInput) {
  const title = requiredText(data, "title");
  return {
    slug: slugValue(data, title), title, description: textValue(data, "description"), category: textValue(data, "category", "Guide"),
    fileUrl: textValue(data, "fileUrl"), imageUrl: textValue(data, "imageUrl"), requiresEmail: false,
    active: booleanValue(data, "active", true), featured: booleanValue(data, "featured"),
  };
}

function testimonialValues(data: ContentInput) {
  return {
    quote: requiredText(data, "quote"), name: textValue(data, "name"), attribution: textValue(data, "attribution", "Passageway client"),
    approved: booleanValue(data, "approved"), featured: booleanValue(data, "featured"), sortOrder: numberValue(data, "sortOrder"),
  };
}

function teamValues(data: ContentInput) {
  const name = requiredText(data, "name");
  return {
    slug: slugValue(data, name), name, title: textValue(data, "title", "Life Consultant"), bio: textValue(data, "bio"),
    credentials: textValue(data, "credentials"), focusAreas: textValue(data, "focusAreas"), imageUrl: textValue(data, "imageUrl"),
    bookingUrl: textValue(data, "bookingUrl", "https://passagewayconsulting.as.me/"), active: booleanValue(data, "active", true),
    sortOrder: numberValue(data, "sortOrder"),
  };
}

function userValues(data: ContentInput) {
  return {
    email: requiredText(data, "email").toLowerCase(), name: textValue(data, "name"),
    role: enumValue(data, "role", ["admin", "editor"] as const, "editor") as CmsRole,
    active: booleanValue(data, "active", true),
  };
}

function textValue(data: ContentInput, key: string, fallback = "") {
  const value = data[key];
  return typeof value === "string" ? value.trim() : fallback;
}

function requiredText(data: ContentInput, key: string) {
  const value = textValue(data, key);
  if (!value) throw new Error(`${key} is required`);
  return value;
}

function booleanValue(data: ContentInput, key: string, fallback = false) {
  const value = data[key];
  return typeof value === "boolean" ? value : fallback;
}

function numberValue(data: ContentInput, key: string, fallback = 0) {
  const value = Number(data[key]);
  return Number.isFinite(value) ? Math.trunc(value) : fallback;
}

function enumValue<const T extends readonly string[]>(data: ContentInput, key: string, allowed: T, fallback: T[number]): T[number] {
  const value = textValue(data, key);
  return allowed.includes(value) ? value as T[number] : fallback;
}

function slugValue(data: ContentInput, fallback: string) {
  return slugify(textValue(data, "slug", fallback));
}

export function slugify(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
}

function numberId(value: number | string) {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) throw new Error("A valid id is required");
  return id;
}

function safeJsonObject(value?: unknown) {
  if (value && typeof value === "object" && !Array.isArray(value)) return value as Record<string, unknown>;
  if (typeof value !== "string") return {};
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed as Record<string, unknown> : {};
  } catch { return {}; }
}

function fromDb<T>(value: Record<string, unknown>): T {
  return Object.fromEntries(Object.entries(value).map(([key, entry]) => [snakeToCamel(key), entry])) as T;
}

function toDb(value: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(value).map(([key, entry]) => [camelToSnake(key), entry]));
}

function snakeToCamel(value: string) {
  return value.replace(/_([a-z])/g, (_match, letter: string) => letter.toUpperCase());
}

function camelToSnake(value: string) {
  return value.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}
