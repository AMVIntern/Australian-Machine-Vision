import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Linkedin } from "lucide-react";
import { BLOG_POSTS, formatDate } from "@/lib/blog-data";
import { PageHeroBackground } from "@/components/fx/page-hero-background";
import { Spotlight } from "@/components/fx/spotlight";

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
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-teal-50/95 via-cyan-50/80 to-background py-12 sm:py-16">
        <PageHeroBackground />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Insights from{" "}
              <span className="text-accent-primary">AMV</span>
            </h1>
            <p className="mt-4 text-lg text-foreground-muted">
              Practical perspectives on machine vision, automated inspection
              and AI for manufacturing leaders and engineers.
            </p>
          </header>
        </div>
      </section>

      {/* Post listing */}
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-white p-7 shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-soft-lg sm:p-9"
            >
              <Spotlight size={520} />
              <time
                dateTime={post.publishedAt}
                className="relative text-xs font-semibold uppercase tracking-widest text-accent-deep"
              >
                {formatDate(post.publishedAt)}
              </time>
              <h2 className="relative mt-2 text-xl font-bold text-foreground sm:text-2xl">
                {post.title}
              </h2>
              <p className="relative mt-3 text-sm leading-relaxed text-foreground-muted">
                {post.excerpt}
              </p>
              <div className="relative mt-5 flex flex-wrap items-center gap-4">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group/link inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-accent-deep hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
                >
                  Read article
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" aria-hidden />
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
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
