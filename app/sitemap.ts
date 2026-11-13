import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/utils";
import { BLOG_POSTS } from "@/lib/blog-data";

// lastModified only where the date is real (post dates). Stamping every page
// with the build time tells Google everything changed on every deploy, and it
// then stops trusting the field.
const PAGES: Array<{
  path: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/industries", changeFrequency: "monthly", priority: 0.9 },
  { path: "/methodology", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map(({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency,
      priority,
    })),
    ...BLOG_POSTS.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
