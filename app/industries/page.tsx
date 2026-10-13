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
import { PageHeader } from "@/components/layout/page-header";
import { ScanHeading, Reveal, RuleDraw } from "@/components/ui/reveal";

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

      <PageHeader
        title="Where our systems are deployed"
        intro={
          <p>
            AMV builds custom automated inspection systems for food processing,
            industrial and general manufacturing environments. These are the
            core areas where our capability is most applied, not the limits of
            what we can do.
          </p>
        }
      >
        <Reveal delay={0.3}>
          <Link
            href="/contact"
            className="group mt-10 inline-flex items-center gap-3 border border-border bg-background px-5 py-3 transition-colors hover:border-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
          >
            <MessageCircle className="h-4 w-4 shrink-0 text-accent-primary" aria-hidden />
            <span className="text-sm text-foreground-muted">
              Industry not listed?{" "}
              <span className="font-semibold text-foreground">Contact us</span>,
              we take on challenges that don&apos;t fit a category.
            </span>
            <ArrowRight
              className="h-4 w-4 shrink-0 text-accent-primary transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </Reveal>
      </PageHeader>

      {/* Key Applications */}
      <section className="bg-background py-20 sm:py-28" aria-labelledby="key-applications-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <p className="annot text-accent-deep">What we inspect</p>
              <ScanHeading
                as="h2"
                id="key-applications-heading"
                className="font-display mt-3 text-4xl font-bold leading-none text-foreground sm:text-5xl"
              >
                Key applications
              </ScanHeading>
            </div>
            <Reveal className="lg:col-span-6 lg:justify-self-end">
              <p className="max-w-xl text-lg leading-relaxed text-foreground-muted">
                Our systems address the core inspection and quality drivers
                across food, industrial and manufacturing environments.
              </p>
            </Reveal>
          </div>

          <Reveal className="mt-14">
            <ul
              className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
              role="list"
            >
              {KEY_APPLICATIONS.map((app, i) => {
                const Icon = APP_ICONS[i] ?? CheckSquare;
                return (
                  <li
                    key={app}
                    className="group flex items-start gap-4 bg-background px-6 py-7 transition-colors duration-300 hover:bg-background-secondary/70"
                  >
                    <Icon
                      className="mt-0.5 h-5 w-5 shrink-0 text-accent-primary"
                      strokeWidth={1.7}
                      aria-hidden
                    />
                    <span className="font-medium leading-snug text-foreground">{app}</span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-background pb-20 sm:pb-28" aria-labelledby="industries-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-border pt-20 sm:pt-24">
            <p className="annot text-accent-deep">Where we work</p>
            <ScanHeading
              as="h2"
              id="industries-heading"
              className="font-display mt-3 text-4xl font-bold leading-none text-foreground sm:text-5xl"
            >
              Industries
            </ScanHeading>
          </div>

          <div className="mt-14 space-y-20 sm:space-y-24">
            {INDUSTRIES.map((industry, index) => (
              <Reveal key={industry.id}>
                <article className="group grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                  <div
                    className={cn(
                      "scan-hover relative aspect-[4/3] overflow-hidden bg-ink lg:col-span-6",
                      index % 2 === 1 && "lg:order-2"
                    )}
                  >
                    <Image
                      src={industry.imagePlaceholder}
                      alt={`${industry.name} inspection`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <span
                      className="pointer-events-none absolute left-4 top-4 h-3.5 w-3.5 border-l-2 border-t-2 border-accent-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden
                    />
                    <span
                      className="pointer-events-none absolute bottom-4 right-4 h-3.5 w-3.5 border-b-2 border-r-2 border-accent-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden
                    />
                  </div>

                  <div className="lg:col-span-6">
                    <h3 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                      {industry.name}
                    </h3>
                    <p className="mt-4 max-w-lg text-lg leading-relaxed text-foreground-muted">
                      {industry.headline}
                    </p>
                    <ul
                      className="mt-8 grid gap-x-8 border-t border-border sm:grid-cols-2"
                      role="list"
                    >
                      {industry.capabilities.map((cap) => (
                        <li
                          key={cap}
                          className="flex items-start gap-3 border-b border-border py-3 text-[15px] text-foreground"
                        >
                          <span
                            className="mt-[0.45rem] h-0 w-0 shrink-0 border-x-[4px] border-t-[6px] border-x-transparent border-t-accent-logo"
                            aria-hidden
                          />
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Not limited to these */}
          <Reveal className="mt-24">
            <div className="reg-marks relative overflow-hidden bg-ink px-8 py-12 text-white sm:px-12 sm:py-14" data-nav="dark">
              <div className="ink-dots pointer-events-none absolute inset-0 opacity-40" aria-hidden />
              <div className="relative grid gap-8 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-8">
                  <p className="font-display text-2xl font-bold sm:text-3xl">
                    Not limited to these industries
                  </p>
                  <p className="mt-3 max-w-xl leading-relaxed text-ink-soft">
                    If your production environment has an inspection challenge,
                    we want to hear about it. AMV takes on non-standard and
                    high-difficulty problems that do not fit neatly into any
                    category list.
                  </p>
                </div>
                <div className="lg:col-span-4 lg:justify-self-end">
                  <Link
                    href="/contact"
                    className="inline-flex h-12 items-center gap-2 rounded-sm bg-accent-logo px-6 text-sm font-semibold text-ink transition-colors hover:bg-accent-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  >
                    Tell us about your challenge
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          <RuleDraw className="mt-20" />
        </div>
      </section>
    </div>
  );
}
