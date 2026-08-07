import type { MetadataRoute } from "next";
import { listPublicContent } from "./lib/cms-data";

const siteUrl = "https://passagewayconsulting.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date("2026-08-08");

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/online-emotional-health-consulting`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/nervous-system-regulation-for-women`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/online-womens-emotional-health-workshops`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/self-compassion-for-women`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/blog`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/events`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/resources`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];

  try {
    const [posts, events] = await Promise.all([listPublicContent("posts"), listPublicContent("events")]);
    return [...staticPages, ...posts.map((post) => ({ url: `${siteUrl}/blog/${post.slug}`, lastModified: new Date(post.updatedAt), changeFrequency: "monthly" as const, priority: 0.7 })), ...events.map((event) => ({ url: `${siteUrl}/events/${event.slug}`, lastModified: new Date(event.updatedAt), changeFrequency: "weekly" as const, priority: 0.7 }))];
  } catch { return staticPages; }
}
