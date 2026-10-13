import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Linkedin } from "lucide-react";
import { BLOG_POSTS, formatDate } from "@/lib/blog-data";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Blog | Australian Machine Vision",
  description:
    "Insights on machine vision, automated inspection and AI from the team at Australian Machine Vision.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Australian Machine Vision",
    description:
      "Insights on machine vision, automated inspection and AI from the team at Australian Machine Vision.",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <div>
      <PageHeader
        kicker="04 / Blog"
        title={
          <>
            Insights from <span className="text-accent-primary">AMV</span>
          </>
        }
        intro={
          <p>
            Practical perspectives on machine vision, automated inspection and
            AI for manufacturing leaders and engineers.
          </p>
        }
      />

      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="border-t border-foreground/70">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="group grid gap-4 border-b border-border py-9 lg:grid-cols-12 lg:gap-8"
            >
              <time
                dateTime={post.publishedAt}
                className="annot pt-1.5 text-accent-deep lg:col-span-2"
              >
                {formatDate(post.publishedAt)}
              </time>
              <div className="lg:col-span-7">
                <h2 className="font-display text-2xl font-bold leading-tight text-foreground">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition-colors hover:text-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 max-w-[70ch] text-[15px] leading-relaxed text-foreground-muted">
                  {post.excerpt}
                </p>
              </div>
              <div className="flex flex-wrap items-start gap-5 lg:col-span-3 lg:justify-self-end">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-accent-deep"
                >
                  Read article
                  <ArrowRight
                    className="h-4 w-4 text-accent-primary transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
                {post.linkedInUrl && (
                  <a
                    href={post.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-foreground-muted transition-colors hover:text-foreground"
                  >
                    <Linkedin className="h-4 w-4" aria-hidden />
                    View on LinkedIn
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
