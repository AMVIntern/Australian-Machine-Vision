"use client";

import {
  Layers,
  Wrench,
  Factory,
  SlidersHorizontal,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { ScanHeading, Reveal, RuleDraw } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

interface DifferentiatorItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  featured?: boolean;
}

const differentiators: DifferentiatorItem[] = [
  {
    id: "customised",
    title: "Built for the problems others won't take on",
    description:
      "Standard inspection products are designed for common cases. We build systems from the ground up for your product, your line and your defect type, including the non-standard and high-difficulty inspection challenges that off-the-shelf tools cannot solve.",
    icon: SlidersHorizontal,
    featured: true,
  },
  {
    id: "whole-stack",
    title: "Whole-stack capability",
    description:
      "We own the full pipeline, from imaging and lighting to the inspection algorithm, operator software and line integration. We are not tied to a single vendor or technique.",
    icon: Layers,
  },
  {
    id: "production-grade",
    title: "Production-grade engineering",
    description:
      "Our systems run on the factory floor at full line speed, with the reliability, traceability and integration that around-the-clock operation demands.",
    icon: Factory,
  },
  {
    id: "right-tool",
    title: "AI and classical vision combined",
    description:
      "We use HALCON and custom-trained deep learning models together, applying each technique where it performs best. One system, the right algorithm for each task.",
    icon: Wrench,
  },
  {
    id: "supported",
    title: "Customer oriented and globally supported",
    description:
      "We work closely with you through the life of the system, with deployments operating across Australia and international markets and tiered support where it is needed.",
    icon: Globe,
  },
];

export function Differentiators() {
  return (
    <section
      className="bg-background py-20 sm:py-28"
      aria-labelledby="differentiators-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <ScanHeading
            as="h2"
            id="differentiators-heading"
            className="font-display text-4xl font-bold leading-none text-foreground sm:text-5xl lg:col-span-6"
          >
            What sets our work apart
          </ScanHeading>
          <Reveal className="lg:col-span-6 lg:justify-self-end">
            <p className="max-w-xl text-lg leading-relaxed text-foreground-muted">
              Why manufacturers choose AMV for inspection that has to work in
              real production conditions, not just in the lab.
            </p>
          </Reveal>
        </div>

        <div className="mt-14">
          <RuleDraw className="bg-foreground/60" />
          {differentiators.map((item) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.id}>
                <article
                  className={cn(
                    "group relative grid gap-4 border-b border-border py-8 transition-colors duration-300 lg:grid-cols-12 lg:gap-8 lg:py-10",
                    item.featured
                      ? "bg-ink px-5 text-white sm:px-8 lg:items-center"
                      : "hover:bg-background-secondary/60 lg:items-start lg:px-2"
                  )}
                >
                  {item.featured && (
                    <span
                      className="absolute inset-y-0 left-0 w-[3px] bg-accent-logo"
                      aria-hidden
                    />
                  )}
                  <span
                    className={cn(
                      "flex transition-colors lg:col-span-1",
                      item.featured
                        ? "text-accent-logo"
                        : "text-foreground-muted group-hover:text-accent-primary"
                    )}
                    aria-hidden
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.6} />
                  </span>
                  <div className="lg:col-span-5">
                    {item.featured && (
                      <p className="annot mb-2 text-accent-logo">Core strength</p>
                    )}
                    <h3
                      className={cn(
                        "font-display text-2xl font-bold leading-tight",
                        item.featured
                          ? "text-white sm:text-3xl"
                          : "text-foreground"
                      )}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <p
                    className={cn(
                      "leading-relaxed lg:col-span-6",
                      item.featured ? "text-ink-soft" : "text-foreground-muted"
                    )}
                  >
                    {item.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
