import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const timestamps = {
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  deletedAt: text("deleted_at"),
};

export const adminUsers = sqliteTable("admin_users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  name: text("name").notNull().default(""),
  role: text("role", { enum: ["admin", "editor"] }).notNull().default("editor"),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  ...timestamps,
});

export const services = sqliteTable("services", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  eyebrow: text("eyebrow").notNull().default("Support"),
  category: text("category").notNull().default("Consulting"),
  summary: text("summary").notNull().default(""),
  description: text("description").notNull().default(""),
  initialPrice: text("initial_price").notNull().default(""),
  followUpPrice: text("follow_up_price").notNull().default(""),
  priceNote: text("price_note").notNull().default(""),
  bookingUrl: text("booking_url").notNull().default("https://passagewayconsulting.as.me/"),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  ...timestamps,
});

export const events = sqliteTable("events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary").notNull().default(""),
  description: text("description").notNull().default(""),
  startsAt: text("starts_at").notNull().default(""),
  endsAt: text("ends_at").notNull().default(""),
  timezone: text("timezone").notNull().default("America/Chicago"),
  format: text("format").notNull().default("Online"),
  registrationUrl: text("registration_url").notNull().default("https://passagewayconsulting.as.me/"),
  imageUrl: text("image_url").notNull().default(""),
  priceLabel: text("price_label").notNull().default(""),
  capacityLabel: text("capacity_label").notNull().default(""),
  status: text("status", { enum: ["draft", "published", "cancelled"] }).notNull().default("draft"),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  ...timestamps,
});

export const blogPosts = sqliteTable("blog_posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull().default(""),
  content: text("content").notNull().default(""),
  coverImageUrl: text("cover_image_url").notNull().default(""),
  authorName: text("author_name").notNull().default("Passageway Consulting"),
  category: text("category").notNull().default("Compassion"),
  seoTitle: text("seo_title").notNull().default(""),
  seoDescription: text("seo_description").notNull().default(""),
  status: text("status", { enum: ["draft", "published"] }).notNull().default("draft"),
  publishedAt: text("published_at").notNull().default(""),
  ...timestamps,
});

export const resources = sqliteTable("resources", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  category: text("category").notNull().default("Guide"),
  fileUrl: text("file_url").notNull().default(""),
  imageUrl: text("image_url").notNull().default(""),
  requiresEmail: integer("requires_email", { mode: "boolean" }).notNull().default(false),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  ...timestamps,
});

export const testimonials = sqliteTable("testimonials", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  quote: text("quote").notNull(),
  name: text("name").notNull().default(""),
  attribution: text("attribution").notNull().default("Passageway client"),
  approved: integer("approved", { mode: "boolean" }).notNull().default(false),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  ...timestamps,
});

export const teamMembers = sqliteTable("team_members", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  title: text("title").notNull().default("Life Consultant"),
  bio: text("bio").notNull().default(""),
  credentials: text("credentials").notNull().default(""),
  focusAreas: text("focus_areas").notNull().default(""),
  imageUrl: text("image_url").notNull().default(""),
  bookingUrl: text("booking_url").notNull().default("https://passagewayconsulting.as.me/"),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  ...timestamps,
});

export const siteSettings = sqliteTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull().default("{}"),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedBy: text("updated_by").notNull().default(""),
});
