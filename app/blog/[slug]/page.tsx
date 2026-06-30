import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Linkedin } from "lucide-react";
import { BLOG_POSTS, getBlogPost, formatDate, type ContentBlock } from "@/lib/blog-data";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Australian Machine Vision`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "heading2":
      return (
        <h2
          key={index}
          className="mt-10 text-xl font-bold text-foreground sm:text-2xl"
        >
          {block.text}
        </h2>
      );
    case "heading3":
      return (
        <h3
          key={index}
          className="mt-7 text-lg font-bold text-foreground"
        >
          {block.text}
        </h3>
      );
    case "paragraph":
      return (
        <p key={index} className="mt-5 text-base leading-relaxed text-foreground-muted">
          {block.text}
        </p>
      );
    case "bullets":
      return (
        <ul key={index} className="mt-5 space-y-2" role="list">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-base text-foreground-muted"
            >
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-primary"
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>
      );
    case "numbered":
      return (
        <ol key={index} className="mt-5 space-y-5" role="list">
          {block.items.map((item, i) => (
            <li key={item.title} className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-primary/10 text-sm font-bold text-accent-primary">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground-muted">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      );
  }
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-br from-teal-50/95 via-cyan-50/80 to-background py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to blog
            </Link>
            <time
              dateTime={post.publishedAt}
              className="mt-6 block text-xs font-semibold uppercase tracking-widest text-accent-primary"
            >
              {formatDate(post.publishedAt)}
            </time>
            <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg italic text-foreground-muted">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Post body */}
      <div className="container mx-auto px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-border/60 bg-white px-8 py-10 shadow-soft sm:px-12 sm:py-12">
            {post.content.map((block, i) => renderBlock(block, i))}
          </div>

          {/* Footer nav */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent-primary hover:underline"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                All articles
              </Link>
              {post.linkedInUrl && (
                <a
                  href={post.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-[#0A66C2] transition-colors"
                >
                  <Linkedin className="h-4 w-4" aria-hidden />
                  View on LinkedIn
                </a>
              )}
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-accent-primary to-teal-400 px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:opacity-90 transition-opacity"
            >
              Discuss your inspection challenge
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
