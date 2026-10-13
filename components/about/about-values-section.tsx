"use client";

import {
  Award,
  Lightbulb,
  Handshake,
  Accessibility,
  TrendingUp,
  FileCheck,
  type LucideIcon,
} from "lucide-react";
import { ScanHeading, Reveal } from "@/components/ui/reveal";

const values: {
  id: string;
  index: string;
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    id: "excellence",
    index: "01",
    icon: Award,
    title: "Excellence",
    description:
      "We deliver best-in-class accuracy and reliability in every deployment, from pilot to production.",
  },
  {
    id: "innovation",
    index: "02",
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We invest in imaging, algorithms and automation so our systems keep solving harder inspection problems.",
  },
  {
    id: "partnership",
    index: "03",
    icon: Handshake,
    title: "Partnership",
    description:
      "We work alongside your team to understand your process and deliver solutions that fit.",
  },
  {
    id: "accessibility",
    index: "04",
    icon: Accessibility,
    title: "Integration",
    description:
      "Systems that fit your operation, integrating with your existing line and infrastructure where it makes sense.",
  },
  {
    id: "impact",
    index: "05",
    icon: TrendingUp,
    title: "Impact",
    description:
      "Measurable outcomes: fewer defects, lower costs, higher throughput, and full traceability.",
  },
  {
    id: "transparency",
    index: "06",
    icon: FileCheck,
    title: "Transparency",
    description:
      "Clear metrics, auditable results, and honest communication at every step.",
  },
];

export function AboutValuesSection() {
  return (
    <>
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <ScanHeading
          as="h2"
          className="font-display text-4xl font-bold leading-none text-white sm:text-5xl lg:col-span-6"
        >
          Our Core Values
        </ScanHeading>
        <Reveal className="lg:col-span-6 lg:justify-self-end">
          <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
            The principles that guide everything we do
          </p>
        </Reveal>
      </div>
      <Reveal className="mt-12">
        <div className="grid grid-cols-1 gap-px overflow-hidden border border-ink-line bg-ink-line sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <article
                key={v.id}
                className="group bg-ink p-7 transition-colors duration-300 hover:bg-ink-raised"
              >
                <div className="flex items-center justify-between">
                  <Icon
                    className="h-6 w-6 text-accent-logo transition-colors duration-300 group-hover:text-white"
                    strokeWidth={1.6}
                    aria-hidden
                  />
                  <span className="annot text-ink-soft" aria-hidden>
                    {v.index}
                  </span>
                </div>
                <h3 className="font-display mt-6 text-xl font-bold text-white">
                  {v.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                  {v.description}
                </p>
              </article>
            );
          })}
        </div>
      </Reveal>
    </>
  );
}
