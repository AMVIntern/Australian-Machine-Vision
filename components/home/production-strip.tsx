"use client";

import {
  Gauge,
  Network,
  ShieldCheck,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";
import { Reveal, RuleDraw } from "@/components/ui/reveal";

interface ProductionPoint {
  id: string;
  index: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const points: ProductionPoint[] = [
  {
    id: "line-speed",
    index: "01",
    title: "Runs at line speed",
    description:
      "Full line speed on the factory floor, built for around-the-clock operation.",
    icon: Gauge,
  },
  {
    id: "integration",
    index: "02",
    title: "Integrates with your line",
    description:
      "Direct integration with PLCs and line control, plus desktop, web and mobile software.",
    icon: Network,
  },
  {
    id: "validated",
    index: "03",
    title: "Validated and traceable",
    description:
      "Accuracy quantified against ground truth, with traceability built in.",
    icon: ShieldCheck,
  },
  {
    id: "supported",
    index: "04",
    title: "Globally supported",
    description:
      "Deployments operating overseas, with tiered around-the-clock support.",
    icon: LifeBuoy,
  },
];

export function ProductionStrip() {
  return (
    <section
      className="bg-background py-16 sm:py-20"
      aria-labelledby="production-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2
            id="production-heading"
            className="font-display text-2xl font-bold text-foreground sm:text-3xl"
          >
            Engineered for production
          </h2>
          <p className="text-foreground-muted">
            Built to run reliably where it matters, on the line.
          </p>
        </div>

        <RuleDraw className="mt-8" />

        <div className="grid gap-x-10 gap-y-8 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point, i) => {
            const Icon = point.icon;
            return (
              <Reveal key={point.id} delay={i * 0.07}>
                <div>
                  <div className="flex items-center justify-between">
                    <Icon
                      className="h-6 w-6 text-accent-primary"
                      strokeWidth={1.6}
                      aria-hidden
                    />
                    <span className="annot text-foreground-muted" aria-hidden>
                      {point.index}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-bold text-foreground">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                    {point.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
