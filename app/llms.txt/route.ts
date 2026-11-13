import { BLOG_POSTS } from "@/lib/blog-data";
import { SITE_URL } from "@/lib/utils";

// Plain-text site summary for AI assistants (llmstxt.org). Descriptions repeat
// the page metadata so this file makes no claim the site itself does not.
export const dynamic = "force-static";

export function GET() {
  const posts = BLOG_POSTS.map(
    (post) => `- [${post.title}](${SITE_URL}/blog/${post.slug})`
  ).join("\n");

  const body = `# Australian Machine Vision

> Custom machine vision and automated inspection systems for any industry. Australian engineered, with 25+ years of integration experience, in-house software and AI-powered inspection. Based in Seaford, Victoria, Australia.

## Pages

- [Home](${SITE_URL}): What AMV builds and for whom.
- [Industries](${SITE_URL}/industries): AMV builds custom machine vision and automated inspection systems for food processing, industrial manufacturing and general manufacturing environments.
- [Methodology](${SITE_URL}/methodology): How AMV builds machine vision and automated inspection systems. HALCON and custom deep learning combined, classical computer vision, and cloud-based Grafana diagnostics.
- [About](${SITE_URL}/about): The company, its team and its experience.
- [Contact](${SITE_URL}/contact): Discuss a machine vision or automated inspection challenge for any industry, anywhere in Australia or globally. Email amvsupport@amvco.com.au.

## Articles

${posts}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
