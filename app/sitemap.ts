import { MetadataRoute } from "next";
import { getAllStorySlugs } from "@/lib/customer-stories";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.australianmachinevision.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const storySlugs = getAllStorySlugs();
  const storyUrls = storySlugs.map((slug) => ({
    url: `${baseUrl}/customer-stories/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/customer-stories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...storyUrls,
  ];
}
