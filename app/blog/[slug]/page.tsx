import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Linkedin } from "lucide-react";
import { BLOG_POSTS, getBlogPost, formatDate, type BlogPost, type ContentBlock } from "@/lib/blog-data";
import { SITE_URL } from "@/lib/utils";
import { breadcrumbJsonLd, jsonLdScript, ORGANIZATION_ID } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: ["/opengraph-image"],
    },
  };
}

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "heading2":
      return (
        <h2
          key={index}
          className="font-display mt-14 text-2xl font-extrabold leading-tight text-foreground sm:text-[1.75rem]"
        >
          {block.text}
        </h2>
      );
    case "heading3":
      return (
        <h3 key={index} className="font-wide mt-9 text-lg font-bold text-foreground">
          {block.text}
        </h3>
      );
    case "paragraph":
      return (
        <p key={index} className="mt-5 text-[1.075rem] leading-[1.75] text-foreground/80">
          {block.text}
        </p>
      );
    case "bullets":
      return (
        <ul key={index} className="mt-5 space-y-2.5" role="list">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-[1.075rem] leading-[1.7] text-foreground/80"
            >
              <span
                className="mt-[0.7rem] h-0 w-0 shrink-0 border-x-[4px] border-t-[6px] border-x-transparent border-t-accent-logo"
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>
      );
    case "numbered":
      return (
        <ol key={index} className="mt-6 border-t border-border" role="list">
          {block.items.map((item, i) => (
            <li key={item.title} className="flex gap-5 border-b border-border py-5">
              <span className="font-display tabular w-7 shrink-0 text-xl font-extrabold text-accent-primary">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="mt-1.5 leading-relaxed text-foreground-muted">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      );
  }
}

// Author is the organisation until the byline is confirmed for each post.
function articleJsonLd(post: BlogPost) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    inLanguage: "en-AU",
    url,
    mainEntityOfPage: url,
    image: `${SITE_URL}/opengraph-image`,
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const breadcrumb = breadcrumbJsonLd([
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(articleJsonLd(post))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumb)} />
      <section className="bay relative overflow-hidden" data-nav="dark">
        <div className="dot-field pointer-events-none absolute inset-0 opacity-40" aria-hidden />
        <div className="container relative mx-auto px-4 pb-16 pt-36 sm:px-6 sm:pt-40 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to blog
            </Link>
            <time
              dateTime={post.publishedAt}
              className="tabular mt-10 block text-sm font-semibold text-accent-logo"
            >
              {formatDate(post.publishedAt)}
            </time>
            <h1 className="font-display mt-3 text-3xl font-extrabold leading-[1.08] text-white sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">{post.excerpt}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[68ch]">
            {post.content.map((block, i) => renderBlock(block, i))}

            <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-foreground pt-8">
              <div className="flex flex-wrap items-center gap-6">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-accent-deep"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                  All articles
                </Link>
                {post.linkedInUrl && (
                  <a
                    href={post.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-foreground-muted transition-colors hover:text-[#0A66C2]"
                  >
                    <Linkedin className="h-4 w-4" aria-hidden />
                    View on LinkedIn
                  </a>
                )}
                <Link
                  href="/methodology"
                  className="text-sm text-foreground-muted transition-colors hover:text-accent-deep"
                >
                  How we build inspection systems
                </Link>
                <Link
                  href="/industries"
                  className="text-sm text-foreground-muted transition-colors hover:text-accent-deep"
                >
                  Industries we work in
                </Link>
              </div>
              <Link
                href="/contact"
                className="chamfer inline-flex h-12 items-center bg-ink px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-primary"
              >
                Discuss your inspection challenge
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
