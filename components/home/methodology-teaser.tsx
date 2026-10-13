"use client";

import Link from "next/link";
import { ArrowRight, Layers, Brain, Ruler, BarChart2 } from "lucide-react";
import { ScanHeading, Reveal } from "@/components/ui/reveal";

const CARDS = [
  {
    icon: Layers,
    index: "01",
    name: "HALCON",
    label: "Industrial vision software",
    summary:
      "Precise measurement and rule-based detection for the parts of the job where exact accuracy matters.",
    href: "/methodology#halcon",
  },
  {
    icon: Brain,
    index: "02",
    name: "Custom deep learning",
    label: "AI trained on your product",
    summary:
      "Models we train to recognise defects and features that are too variable or subtle for fixed rules.",
    href: "/methodology#deep-learning",
  },
  {
    icon: Ruler,
    index: "03",
    name: "Classical vision",
    label: "Rule-based algorithms",
    summary:
      "Fast, predictable image processing for consistent, well-defined checks that do not need an AI model.",
    href: "/methodology#classical",
  },
  {
    icon: BarChart2,
    index: "04",
    name: "Cloud diagnostics",
    label: "Grafana dashboards",
    summary:
      "Live remote visibility into how every system is running, so issues are caught before they stop the line.",
    href: "/methodology#diagnostics",
  },
];

export function MethodologyTeaser() {
  return (
    <section
      className="border-b border-border bg-background py-20 sm:py-28"
      aria-labelledby="methodology-teaser-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <ScanHeading
            as="h2"
            id="methodology-teaser-heading"
            className="font-display text-4xl font-bold leading-none text-foreground sm:text-5xl lg:col-span-5"
          >
            How we build it
          </ScanHeading>
          <Reveal className="lg:col-span-7 lg:justify-self-end">
            <p className="max-w-xl text-lg leading-relaxed text-foreground-muted">
              AMV combines HALCON industrial software, custom-trained AI models
              and classical vision algorithms in a single system, applying each
              where it performs best. No single tool fits every inspection
              problem.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.name}
                href={card.href}
                className="group relative flex flex-col overflow-hidden bg-background px-6 py-8 transition-colors duration-300 hover:bg-background-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-primary lg:py-10"
              >
                <span className="scan-hover absolute inset-0" aria-hidden />
                <div className="flex items-center justify-between">
                  <Icon
                    className="h-6 w-6 text-accent-primary"
                    strokeWidth={1.6}
                    aria-hidden
                  />
                  <span className="annot text-foreground-muted" aria-hidden>
                    {card.index}
                  </span>
                </div>
                <h3 className="font-display mt-10 text-xl font-bold text-foreground">
                  {card.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent-deep">
                  {card.label}
                </p>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground-muted">
                  {card.summary}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  Learn more
                  <ArrowRight
                    className="h-4 w-4 text-accent-primary transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </Link>
            );
          })}
        </div>

        <Reveal className="mt-10">
          <Link
            href="/methodology"
            className="inline-flex h-12 items-center gap-2 rounded-sm bg-ink px-7 text-sm font-semibold text-white transition-colors hover:bg-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
          >
            How we build solutions
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
