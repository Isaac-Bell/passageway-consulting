import { and, asc, desc, eq, isNull, or, sql } from "drizzle-orm";
import { getDb } from "@/db";
import {
  adminUsers,
  blogPosts,
  events,
  resources,
  services,
  siteSettings,
  teamMembers,
  testimonials,
} from "@/db/schema";
import type { CmsRole } from "./cms-auth";

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
type ServiceRow = typeof services.$inferSelect;
type EventRow = typeof events.$inferSelect;
type PostRow = typeof blogPosts.$inferSelect;
type ResourceRow = typeof resources.$inferSelect;
type TestimonialRow = typeof testimonials.$inferSelect;
type TeamRow = typeof teamMembers.$inferSelect;
type PublicRow = ServiceRow | EventRow | PostRow | ResourceRow | TestimonialRow | TeamRow;

export function isContentCollection(value: string): value is ContentCollection {
  return contentCollections.includes(value as ContentCollection);
}

export async function listAdminContent(collection: ContentCollection) {
  const db = await getDb();
  switch (collection) {
    case "services":
      return db.select().from(services).where(isNull(services.deletedAt)).orderBy(asc(services.sortOrder), asc(services.id));
    case "events":
      return db.select().from(events).where(isNull(events.deletedAt)).orderBy(desc(events.startsAt), desc(events.id));
    case "posts":
      return db.select().from(blogPosts).where(isNull(blogPosts.deletedAt)).orderBy(desc(blogPosts.publishedAt), desc(blogPosts.id));
    case "resources":
      return db.select().from(resources).where(isNull(resources.deletedAt)).orderBy(desc(resources.featured), desc(resources.id));
    case "testimonials":
      return db.select().from(testimonials).where(isNull(testimonials.deletedAt)).orderBy(asc(testimonials.sortOrder), desc(testimonials.id));
    case "team":
      return db.select().from(teamMembers).where(isNull(teamMembers.deletedAt)).orderBy(asc(teamMembers.sortOrder), asc(teamMembers.id));
    case "users":
      return db.select().from(adminUsers).where(isNull(adminUsers.deletedAt)).orderBy(desc(adminUsers.role), asc(adminUsers.name));
    case "homepage": {
      const [row] = await db.select().from(siteSettings).where(eq(siteSettings.key, "homepage")).limit(1);
      return [{ id: "homepage", ...safeJsonObject(row?.value), updatedAt: row?.updatedAt ?? "" }];
    }
  }
}

export async function createContent(collection: ContentCollection, data: ContentInput, actorEmail: string) {
  const db = await getDb();
  switch (collection) {
    case "services": {
      const [row] = await db.insert(services).values(serviceValues(data)).returning();
      return row;
    }
    case "events": {
      const [row] = await db.insert(events).values(eventValues(data)).returning();
      return row;
    }
    case "posts": {
      const [row] = await db.insert(blogPosts).values(postValues(data)).returning();
      return row;
    }
    case "resources": {
      const [row] = await db.insert(resources).values(resourceValues(data)).returning();
      return row;
    }
    case "testimonials": {
      const [row] = await db.insert(testimonials).values(testimonialValues(data)).returning();
      return row;
    }
    case "team": {
      const [row] = await db.insert(teamMembers).values(teamValues(data)).returning();
      return row;
    }
    case "users": {
      const [row] = await db.insert(adminUsers).values(userValues(data)).returning();
      return row;
    }
    case "homepage":
      return saveHomepage(data, actorEmail);
  }
}

export async function updateContent(collection: ContentCollection, id: number | string, data: ContentInput, actorEmail: string) {
  const db = await getDb();
  const updatedAt = new Date().toISOString();
  switch (collection) {
    case "services": {
      const [row] = await db.update(services).set({ ...serviceValues(data), updatedAt }).where(eq(services.id, numberId(id))).returning();
      return row;
    }
    case "events": {
      const [row] = await db.update(events).set({ ...eventValues(data), updatedAt }).where(eq(events.id, numberId(id))).returning();
      return row;
    }
    case "posts": {
      const [row] = await db.update(blogPosts).set({ ...postValues(data), updatedAt }).where(eq(blogPosts.id, numberId(id))).returning();
      return row;
    }
    case "resources": {
      const [row] = await db.update(resources).set({ ...resourceValues(data), updatedAt }).where(eq(resources.id, numberId(id))).returning();
      return row;
    }
    case "testimonials": {
      const [row] = await db.update(testimonials).set({ ...testimonialValues(data), updatedAt }).where(eq(testimonials.id, numberId(id))).returning();
      return row;
    }
    case "team": {
      const [row] = await db.update(teamMembers).set({ ...teamValues(data), updatedAt }).where(eq(teamMembers.id, numberId(id))).returning();
      return row;
    }
    case "users": {
      const [row] = await db.update(adminUsers).set({ ...userValues(data), updatedAt }).where(eq(adminUsers.id, numberId(id))).returning();
      return row;
    }
    case "homepage":
      return saveHomepage(data, actorEmail);
  }
}

export async function archiveContent(collection: ContentCollection, id: number | string, actorEmail: string) {
  if (collection === "homepage") return saveHomepage({}, actorEmail);
  const db = await getDb();
  const deletedAt = new Date().toISOString();
  switch (collection) {
    case "services": return db.update(services).set({ deletedAt, active: false }).where(eq(services.id, numberId(id))).returning();
    case "events": return db.update(events).set({ deletedAt, status: "draft" }).where(eq(events.id, numberId(id))).returning();
    case "posts": return db.update(blogPosts).set({ deletedAt, status: "draft" }).where(eq(blogPosts.id, numberId(id))).returning();
    case "resources": return db.update(resources).set({ deletedAt, active: false }).where(eq(resources.id, numberId(id))).returning();
    case "testimonials": return db.update(testimonials).set({ deletedAt, approved: false }).where(eq(testimonials.id, numberId(id))).returning();
    case "team": return db.update(teamMembers).set({ deletedAt, active: false }).where(eq(teamMembers.id, numberId(id))).returning();
    case "users": return db.update(adminUsers).set({ deletedAt, active: false }).where(eq(adminUsers.id, numberId(id))).returning();
  }
}

export function listPublicContent(collection: "services"): Promise<ServiceRow[]>;
export function listPublicContent(collection: "events"): Promise<EventRow[]>;
export function listPublicContent(collection: "posts"): Promise<PostRow[]>;
export function listPublicContent(collection: "resources"): Promise<ResourceRow[]>;
export function listPublicContent(collection: "testimonials"): Promise<TestimonialRow[]>;
export function listPublicContent(collection: "team"): Promise<TeamRow[]>;
export function listPublicContent(collection: PublicCollection): Promise<PublicRow[]>;
export async function listPublicContent(collection: PublicCollection) {
  const db = await getDb();
  switch (collection) {
    case "services":
      return db.select().from(services).where(and(eq(services.active, true), isNull(services.deletedAt))).orderBy(asc(services.sortOrder), asc(services.id));
    case "events":
      return db.select().from(events).where(and(eq(events.status, "published"), isNull(events.deletedAt))).orderBy(asc(events.startsAt), asc(events.id));
    case "posts":
      return db.select().from(blogPosts).where(and(eq(blogPosts.status, "published"), isNull(blogPosts.deletedAt))).orderBy(desc(blogPosts.publishedAt), desc(blogPosts.id));
    case "resources":
      return db.select().from(resources).where(and(eq(resources.active, true), isNull(resources.deletedAt))).orderBy(desc(resources.featured), desc(resources.id));
    case "testimonials":
      return db.select().from(testimonials).where(and(eq(testimonials.approved, true), isNull(testimonials.deletedAt))).orderBy(asc(testimonials.sortOrder), desc(testimonials.id));
    case "team":
      return db.select().from(teamMembers).where(and(eq(teamMembers.active, true), isNull(teamMembers.deletedAt))).orderBy(asc(teamMembers.sortOrder), asc(teamMembers.id));
  }
}

export function getPublicItem(collection: "events", slug: string): Promise<EventRow | null>;
export function getPublicItem(collection: "posts", slug: string): Promise<PostRow | null>;
export function getPublicItem(collection: "resources", slug: string): Promise<ResourceRow | null>;
export async function getPublicItem(collection: "events" | "posts" | "resources", slug: string): Promise<EventRow | PostRow | ResourceRow | null> {
  const db = await getDb();
  if (collection === "events") {
    const [row] = await db.select().from(events).where(and(eq(events.slug, slug), eq(events.status, "published"), isNull(events.deletedAt))).limit(1);
    return row ?? null;
  }
  if (collection === "posts") {
    const [row] = await db.select().from(blogPosts).where(and(eq(blogPosts.slug, slug), eq(blogPosts.status, "published"), isNull(blogPosts.deletedAt))).limit(1);
    return row ?? null;
  }
  const [row] = await db.select().from(resources).where(and(eq(resources.slug, slug), eq(resources.active, true), isNull(resources.deletedAt))).limit(1);
  return row ?? null;
}

export async function getHomepageContent() {
  const db = await getDb();
  const [settings] = await db.select().from(siteSettings).where(eq(siteSettings.key, "homepage")).limit(1);
  const [featuredEvent] = await db
    .select()
    .from(events)
    .where(and(eq(events.status, "published"), eq(events.featured, true), isNull(events.deletedAt), or(eq(events.startsAt, ""), undefinedSafeFuture(events.startsAt))))
    .orderBy(asc(events.startsAt), asc(events.id))
    .limit(1);

  return { settings: safeJsonObject(settings?.value), featuredEvent: featuredEvent ?? null };
}

function undefinedSafeFuture(column: typeof events.startsAt) {
  // ISO date strings sort chronologically in SQLite. Keeping this helper small
  // makes the public featured-event query easy to audit.
  return sql`${column} >= ${new Date().toISOString()}`;
}

async function saveHomepage(data: ContentInput, actorEmail: string) {
  const db = await getDb();
  const value = JSON.stringify({
    announcementEnabled: booleanValue(data, "announcementEnabled"),
    announcementTitle: textValue(data, "announcementTitle"),
    announcementBody: textValue(data, "announcementBody"),
    announcementCtaLabel: textValue(data, "announcementCtaLabel"),
    announcementCtaUrl: textValue(data, "announcementCtaUrl"),
  });
  const updatedAt = new Date().toISOString();
  await db.insert(siteSettings).values({ key: "homepage", value, updatedAt, updatedBy: actorEmail }).onConflictDoUpdate({
    target: siteSettings.key,
    set: { value, updatedAt, updatedBy: actorEmail },
  });
  return { id: "homepage", ...safeJsonObject(value), updatedAt };
}

function serviceValues(data: ContentInput) {
  const name = requiredText(data, "name");
  return {
    slug: slugValue(data, name),
    name,
    eyebrow: textValue(data, "eyebrow", "Support"),
    category: textValue(data, "category", "Consulting"),
    summary: textValue(data, "summary"),
    description: textValue(data, "description"),
    initialPrice: textValue(data, "initialPrice"),
    followUpPrice: textValue(data, "followUpPrice"),
    priceNote: textValue(data, "priceNote"),
    bookingUrl: textValue(data, "bookingUrl", "https://passagewayconsulting.as.me/"),
    active: booleanValue(data, "active", true),
    featured: booleanValue(data, "featured"),
    sortOrder: numberValue(data, "sortOrder"),
  };
}

function eventValues(data: ContentInput) {
  const title = requiredText(data, "title");
  return {
    slug: slugValue(data, title), title,
    summary: textValue(data, "summary"), description: textValue(data, "description"),
    startsAt: textValue(data, "startsAt"), endsAt: textValue(data, "endsAt"),
    timezone: textValue(data, "timezone", "America/Chicago"), format: textValue(data, "format", "Online"),
    registrationUrl: textValue(data, "registrationUrl", "https://passagewayconsulting.as.me/"),
    imageUrl: textValue(data, "imageUrl"), priceLabel: textValue(data, "priceLabel"), capacityLabel: textValue(data, "capacityLabel"),
    status: enumValue(data, "status", ["draft", "published", "cancelled"] as const, "draft"),
    featured: booleanValue(data, "featured"),
  };
}

function postValues(data: ContentInput) {
  const title = requiredText(data, "title");
  const status = enumValue(data, "status", ["draft", "published"] as const, "draft");
  return {
    slug: slugValue(data, title), title,
    excerpt: textValue(data, "excerpt"), content: textValue(data, "content"), coverImageUrl: textValue(data, "coverImageUrl"),
    authorName: textValue(data, "authorName", "Passageway Consulting"), category: textValue(data, "category", "Compassion"),
    seoTitle: textValue(data, "seoTitle"), seoDescription: textValue(data, "seoDescription"), status,
    publishedAt: textValue(data, "publishedAt", status === "published" ? new Date().toISOString() : ""),
  };
}

function resourceValues(data: ContentInput) {
  const title = requiredText(data, "title");
  return {
    slug: slugValue(data, title), title,
    description: textValue(data, "description"), category: textValue(data, "category", "Guide"),
    fileUrl: textValue(data, "fileUrl"), imageUrl: textValue(data, "imageUrl"),
    requiresEmail: false, active: booleanValue(data, "active", true), featured: booleanValue(data, "featured"),
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
    bookingUrl: textValue(data, "bookingUrl", "https://passagewayconsulting.as.me/"), active: booleanValue(data, "active", true), sortOrder: numberValue(data, "sortOrder"),
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
  return allowed.includes(value) ? (value as T[number]) : fallback;
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

function safeJsonObject(value?: string) {
  try {
    const parsed = JSON.parse(value ?? "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed as Record<string, unknown> : {};
  } catch {
    return {};
  }
}
