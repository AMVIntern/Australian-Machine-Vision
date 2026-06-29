import Link from "next/link";
import { ArrowRight, Layers, Brain, Ruler, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";

const CARDS = [
  {
    icon: Layers,
    name: "HALCON",
    label: "Industrial vision software",
    summary:
      "Precise measurement and rule-based detection for the parts of the job where exact accuracy matters.",
    href: "/methodology#halcon",
  },
  {
    icon: Brain,
    name: "Custom deep learning",
    label: "AI trained on your product",
    summary:
      "Models we train to recognise defects and features that are too variable or subtle for fixed rules.",
    href: "/methodology#deep-learning",
  },
  {
    icon: Ruler,
    name: "Classical vision",
    label: "Rule-based algorithms",
    summary:
      "Fast, predictable image processing for consistent, well-defined checks that do not need an AI model.",
    href: "/methodology#classical",
  },
  {
    icon: BarChart2,
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
      className="border-y border-border bg-background-secondary/40 py-16 sm:py-20"
      aria-labelledby="methodology-teaser-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2
              id="methodology-teaser-heading"
              className="text-3xl font-bold text-foreground sm:text-4xl"
            >
              How we build it
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-foreground-muted">
              AMV combines HALCON industrial software, custom-trained AI models
              and classical vision algorithms in a single system, applying each
              where it performs best. No single tool fits every inspection
              problem.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.name}
                  href={card.href}
                  className={cn(
                    "group flex flex-col rounded-2xl border border-border/60 bg-white p-5 shadow-soft",
                    "hover:-translate-y-0.5 hover:shadow-soft-lg transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
                  )}
                >
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-primary/10 text-accent-primary"
                    aria-hidden
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                    {card.label}
                  </p>
                  <h3 className="mt-1 text-base font-bold text-foreground">
                    {card.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-muted">
                    {card.summary}
                  </p>
                  <span className="mt-4 flex items-center gap-1 text-xs font-semibold text-accent-primary">
                    Learn more
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/methodology"
              className={cn(
                "inline-flex items-center gap-2 rounded-lg border-2 border-accent-primary px-6 py-3 text-sm font-semibold text-accent-primary",
                "hover:bg-accent-primary hover:text-white transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
              )}
            >
              How we build solutions
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
