import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { INDUSTRIES, INDUSTRY_GROUPS, getIndustriesByGroup } from "@/lib/industries-data";

export const metadata: Metadata = {
  title: "Industries | Australian Machine Vision",
  description:
    "AMV builds custom machine vision and automated inspection systems for manufacturers across more than 20 industries, from food and pharma to automotive, electronics, agriculture and beyond.",
  alternates: { canonical: "/industries" },
  openGraph: {
    title: "Industries | Australian Machine Vision",
    description:
      "Custom machine vision and automated inspection for manufacturers across more than 20 industries. Any sector, any inspection challenge.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industries | Australian Machine Vision",
    description:
      "Custom machine vision and automated inspection for manufacturers across more than 20 industries.",
  },
};

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Industries | Australian Machine Vision",
  description:
    "AMV builds custom machine vision and automated inspection systems for manufacturers across more than 20 industries.",
  url: "https://www.australianmachinevision.com/industries",
};

export default function IndustriesPage() {
  const byGroup = getIndustriesByGroup();

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-br from-teal-50/95 via-cyan-50/80 to-background py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              We work across{" "}
              <span className="text-accent-primary">any industry</span>
            </h1>
            <p className="mt-4 text-lg text-foreground-muted">
              AMV is not aligned to a single sector. Our systems are deployed
              across more than 20 industries, wherever automated inspection adds
              value on the production line.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-3 rounded-full border border-accent-primary/30 bg-white/70 px-5 py-2.5 transition-colors hover:bg-white"
            >
              <MessageCircle className="h-4 w-4 shrink-0 text-accent-primary" aria-hidden />
              <span className="text-sm text-foreground-muted">
                Industry not listed?{" "}
                <span className="font-semibold text-accent-primary">Contact us</span>
                {" "}— we take on challenges that don&apos;t fit a category.
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-accent-primary" aria-hidden />
            </Link>
          </header>
        </div>
      </section>

      {/* Industry groups */}
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-20">
          {INDUSTRY_GROUPS.map((group) => {
            const industries = byGroup.get(group) ?? [];
            return (
              <section key={group} aria-labelledby={`group-${group}`}>
                <h2
                  id={`group-${group}`}
                  className="mb-8 border-b border-border pb-3 text-xl font-bold text-foreground sm:text-2xl"
                >
                  {group}
                </h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  {industries.map((industry) => (
                    <article
                      key={industry.id}
                      className="flex flex-col rounded-2xl border border-border/60 bg-white p-6 shadow-soft"
                    >
                      {/* Industry image */}
                      <div className="relative mb-5 h-44 w-full overflow-hidden rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 sm:h-52">
                        <Image
                          src={industry.imagePlaceholder}
                          alt={`${industry.name} inspection`}
                          fill
                          className={industry.imageContain ? "object-contain" : "object-cover"}
                          sizes="(max-width: 640px) 100vw, 50vw"
                          style={industry.imagePosition ? { objectPosition: industry.imagePosition } : undefined}
                        />
                      </div>

                      <h3 className="text-lg font-bold text-foreground">
                        {industry.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                        {industry.headline}
                      </p>

                      <ul className="mt-4 space-y-1.5" role="list">
                        {industry.capabilities.map((cap) => (
                          <li
                            key={cap}
                            className="flex items-start gap-2 text-sm text-foreground-muted"
                          >
                            <span
                              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-primary"
                              aria-hidden
                            />
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Not limited to these */}
        <div className="mx-auto mt-16 max-w-5xl rounded-2xl border border-dashed border-border bg-background-secondary/60 px-8 py-10 text-center">
          <p className="text-base font-medium text-foreground">
            Not limited to these industries
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-foreground-muted">
            If your production environment has an inspection challenge, we want
            to hear about it. AMV takes on non-standard and high-difficulty
            problems that do not fit neatly into any category list.
          </p>
          <Link
            href="/contact"
            className={cn(
              "mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-accent-primary to-teal-400 px-6 py-3 text-sm font-semibold text-white shadow-soft",
              "hover:opacity-90 transition-opacity",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
            )}
          >
            Tell us about your challenge
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
