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
        title="Insights from AMV"
        intro={
          <p>
            Practical perspectives on machine vision, automated inspection
            and AI for manufacturing leaders and engineers.
          </p>
        }
      />

      <section className="bg-white py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="border-t border-foreground" role="list">
            {BLOG_POSTS.map((post) => (
              <li key={post.slug}>
                <article className="group relative grid gap-4 border-b border-border py-10 transition-colors sm:py-12 lg:grid-cols-12 lg:gap-10">
                  <time
                    dateTime={post.publishedAt}
                    className="tabular text-sm font-semibold text-accent-deep lg:col-span-3 lg:pt-2"
                  >
                    {formatDate(post.publishedAt)}
                  </time>
                  <div className="lg:col-span-9">
                    <h2 className="font-display text-2xl font-extrabold leading-tight text-foreground transition-colors group-hover:text-accent-primary sm:text-3xl">
                      <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-4 max-w-2xl leading-relaxed text-foreground-muted">
                      {post.excerpt}
                    </p>
                    <div className="relative z-10 mt-6 flex flex-wrap items-center gap-6">
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                        Read article
                        <ArrowRight
                          className="h-4 w-4 text-accent-primary transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden
                        />
                      </span>
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
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
