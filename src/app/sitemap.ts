import type { MetadataRoute } from "next";

const baseUrl = "https://epubcoverchanger.com";

const routes = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/blog/how-to-change-epub-cover", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/blog/best-epub-cover-size", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/pricing", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/privacy", priority: 0.4, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.4, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}