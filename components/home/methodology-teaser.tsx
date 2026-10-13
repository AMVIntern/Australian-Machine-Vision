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
      className="border-t border-border bg-white py-20 sm:py-28"
      aria-labelledby="methodology-teaser-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2
            id="methodology-teaser-heading"
            className="font-display text-4xl font-extrabold leading-none text-foreground sm:text-5xl lg:col-span-6"
          >
            How we build it
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-foreground-muted lg:col-span-6 lg:justify-self-end">
            AMV combines HALCON industrial software, custom-trained AI models
            and classical vision algorithms in a single system, applying each
            where it performs best. No single tool fits every inspection
            problem.
          </p>
        </div>

        <div className="mt-14 grid border-y border-border sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.name}
                href={card.href}
                className={cn(
                  "group relative flex flex-col px-1 py-8 transition-colors duration-300 sm:px-6 lg:py-10",
                  "hover:bg-background-tint",
                  i > 0 && "border-t border-border sm:border-t-0",
                  i % 2 === 1 && "sm:border-l",
                  i >= 2 && "sm:border-t lg:border-t-0",
                  i > 0 && "lg:border-l"
                )}
              >
                <span
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent-primary transition-transform duration-500 ease-out group-hover:scale-x-100"
                  aria-hidden
                />
                <Icon className="h-7 w-7 text-accent-primary" strokeWidth={1.6} aria-hidden />
                <h3 className="font-wide mt-8 text-xl font-bold text-foreground">
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

        <div className="mt-10">
          <Link
            href="/methodology"
            className="chamfer inline-flex h-12 items-center gap-2 bg-ink px-7 text-sm font-semibold text-white transition-colors hover:bg-accent-primary"
          >
            How we build solutions
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
