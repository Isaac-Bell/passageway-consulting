import type { MetadataRoute } from "next";

const siteUrl = "https://passagewayconsulting.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-08-06"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
