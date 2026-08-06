import type { MetadataRoute } from "next";

const siteUrl = "https://passagewayconsulting.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-06");

  return [
    { url: `${siteUrl}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/online-emotional-health-consulting`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/nervous-system-regulation-for-women`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/online-womens-emotional-health-workshops`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/self-compassion-for-women`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}
