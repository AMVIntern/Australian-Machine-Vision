import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  MessageCircle,
  CheckSquare,
  Ruler,
  ScanSearch,
  AlertTriangle,
  Package,
  BarChart2,
  Layers,
  TrendingUp,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { INDUSTRIES, KEY_APPLICATIONS } from "@/lib/industries-data";

export const metadata: Metadata = {
  title: "Industries | Australian Machine Vision",
  description:
    "AMV builds custom machine vision and automated inspection systems for food processing, industrial manufacturing and general manufacturing environments.",
  alternates: { canonical: "/industries" },
  openGraph: {
    title: "Industries | Australian Machine Vision",
    description:
      "Custom machine vision and automated inspection for food processing, industrial and general manufacturing. Any inspection challenge.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industries | Australian Machine Vision",
    description:
      "Custom machine vision and automated inspection for food processing, industrial and general manufacturing.",
  },
};

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Industries | Australian Machine Vision",
  description:
    "AMV builds custom machine vision and automated inspection systems for food processing, industrial manufacturing and general manufacturing environments.",
  url: "https://www.australianmachinevision.com/industries",
};

const APP_ICONS: LucideIcon[] = [
  CheckSquare,
  Ruler,
  ScanSearch,
  AlertTriangle,
  Package,
  BarChart2,
  Layers,
  TrendingUp,
  Zap,
];

export default function IndustriesPage() {
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
              Where our systems{" "}
              <span className="text-accent-primary">are deployed</span>
            </h1>
            <p className="mt-4 text-lg text-foreground-muted">
              AMV builds custom automated inspection systems for food
              processing, industrial and general manufacturing environments.
              These are the core areas where our capability is most applied,
              not the limits of what we can do.
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

      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-20">

          {/* Key Applications */}
          <section aria-labelledby="key-applications-heading">
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-primary">
                What we inspect
              </p>
              <h2
                id="key-applications-heading"
                className="mt-1 text-2xl font-bold text-foreground sm:text-3xl"
              >
                Key applications
              </h2>
              <p className="mt-3 max-w-2xl text-foreground-muted">
                Our systems address the core inspection and quality drivers
                across food, industrial and manufacturing environments.
              </p>
            </div>
            <ul
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              role="list"
            >
              {KEY_APPLICATIONS.map((app, i) => {
                const Icon = APP_ICONS[i] ?? CheckSquare;
                return (
                  <li
                    key={app}
                    className="group flex items-start gap-4 rounded-xl border border-border/60 bg-white px-5 py-4 shadow-soft transition-all hover:border-accent-primary/40 hover:bg-teal-50/40 hover:shadow-soft-md"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-primary/10 text-accent-primary transition-colors group-hover:bg-accent-primary/20">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="pt-1.5 text-sm font-medium text-foreground">
                      {app}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Industries */}
          <section aria-labelledby="industries-heading">
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-primary">
                Where we work
              </p>
              <h2
                id="industries-heading"
                className="mt-1 text-2xl font-bold text-foreground sm:text-3xl"
              >
                Industries
              </h2>
            </div>
            <div className="space-y-8">
              {INDUSTRIES.map((industry, index) => (
                <article
                  key={industry.id}
                  className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-soft"
                >
                  <div
                    className={cn(
                      "flex flex-col md:flex-row",
                      index % 2 === 1 && "md:flex-row-reverse"
                    )}
                  >
                    {/* Image panel */}
                    <div className="relative h-64 shrink-0 md:h-auto md:w-[42%]">
                      <Image
                        src={industry.imagePlaceholder}
                        alt={`${industry.name} inspection`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 42vw"
                      />
                    </div>

                    {/* Content panel */}
                    <div className="flex flex-col justify-center px-8 py-9 sm:px-10 sm:py-10">
                      <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                        {industry.name}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                        {industry.headline}
                      </p>
                      <ul
                        className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2"
                        role="list"
                      >
                        {industry.capabilities.map((cap) => (
                          <li
                            key={cap}
                            className="flex items-start gap-2 text-sm text-foreground-muted"
                          >
                            <span
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-primary"
                              aria-hidden
                            />
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Not limited to these */}
          <div className="rounded-2xl border border-dashed border-border bg-background-secondary/60 px-8 py-10 text-center">
            <p className="text-base font-medium text-foreground">
              Not limited to these industries
            </p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-foreground-muted">
              If your production environment has an inspection challenge, we
              want to hear about it. AMV takes on non-standard and
              high-difficulty problems that do not fit neatly into any
              category list.
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
    </div>
  );
}
