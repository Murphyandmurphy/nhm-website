import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { pageSlugsQuery, postSlugsQuery } from "@/sanity/lib/queries";

type SlugItem = { slug: string };

const RESERVED_SLUGS = new Set([
  "",
  "about",
  "contact",
  "insights",
  "privacy-policy",
  "services",
  "studio",
  "terms-of-business",
]);

function getBaseUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return "https://www.nadiahm.co.uk";
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/insights`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms-of-business`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  try {
    const [pageSlugs, postSlugs] = await Promise.all([
      client.fetch<SlugItem[]>(pageSlugsQuery),
      client.fetch<SlugItem[]>(postSlugsQuery),
    ]);

    const cmsPages: MetadataRoute.Sitemap = (pageSlugs || [])
      .filter((entry) => entry?.slug && !RESERVED_SLUGS.has(entry.slug))
      .map((entry) => ({
        url: `${baseUrl}/${entry.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));

    const insightPosts: MetadataRoute.Sitemap = (postSlugs || [])
      .filter((entry) => entry?.slug)
      .map((entry) => ({
        url: `${baseUrl}/insights/${entry.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));

    return [...staticRoutes, ...cmsPages, ...insightPosts];
  } catch {
    // Fall back to static routes if CMS is temporarily unavailable.
    return staticRoutes;
  }
}
