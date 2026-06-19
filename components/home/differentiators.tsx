"use client";

import { motion } from "framer-motion";
import {
  Layers,
  Wrench,
  Factory,
  SlidersHorizontal,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface DifferentiatorItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  featured?: boolean;
  gridClass: string;
}

const differentiators: DifferentiatorItem[] = [
  {
    id: "customised",
    title: "Built to be customised",
    description:
      "Every application is deeply configurable and tailored to your exact line, product mix and process. This adaptability is our core strength.",
    icon: SlidersHorizontal,
    featured: true,
    gridClass: "lg:col-span-2 lg:row-span-2",
  },
  {
    id: "whole-stack",
    title: "Whole-stack capability",
    description:
      "We own the full pipeline, from sensor and lighting to the inspection algorithm, operator software and line-control integration. We are not tied to a single vendor or technique.",
    icon: Layers,
    gridClass: "lg:col-span-1",
  },
  {
    id: "production-grade",
    title: "Production-grade engineering",
    description:
      "Our systems run on the factory floor at full line speed, with the reliability, traceability and integration that around-the-clock operation demands.",
    icon: Factory,
    gridClass: "lg:col-span-1",
  },
  {
    id: "right-tool",
    title: "Right tool for the job",
    description:
      "Some defects suit precise geometric measurement, others need a trained model. We combine both in one system, using each where it is strongest.",
    icon: Wrench,
    gridClass: "lg:col-span-1",
  },
  {
    id: "supported",
    title: "Customer oriented and globally supported",
    description:
      "We work closely with you through the life of the system, with deployments operating overseas and tiered support where it is needed.",
    icon: Globe,
    gridClass: "lg:col-span-1",
  },
];

const container = {
  animate: {
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
};

const cardItem = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.38 },
};

function DifferentiatorCard({ item }: { item: DifferentiatorItem }) {
  const Icon = item.icon;
  const isFeatured = item.featured;

  return (
    <motion.article
      variants={cardItem}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl text-left transition-all",
        "hover:-translate-y-0.5 hover:shadow-soft-lg",
        item.gridClass,
        isFeatured
          ? "min-h-[280px] border border-teal-200/80 bg-gradient-to-br from-teal-600 via-teal-600 to-teal-700 p-7 shadow-soft-lg sm:min-h-[320px] sm:p-8 lg:min-h-0 lg:p-9"
          : "border border-border/60 bg-white p-6 shadow-soft"
      )}
    >
      {isFeatured && (
        <>
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-0 right-0 opacity-[0.07]"
            aria-hidden
          >
            <Icon className="h-48 w-48 -translate-y-4 translate-x-4" strokeWidth={1} />
          </div>
        </>
      )}

      {isFeatured && (
        <span className="relative z-10 mb-5 inline-flex w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
          Core strength
        </span>
      )}

      <span
        className={cn(
          "relative z-10 mb-4 flex shrink-0 items-center justify-center rounded-xl",
          isFeatured
            ? "h-12 w-12 bg-white/20 text-white backdrop-blur-sm"
            : "h-11 w-11 bg-accent-primary text-white"
        )}
        aria-hidden
      >
        <Icon className={cn(isFeatured ? "h-6 w-6" : "h-5 w-5")} strokeWidth={2} />
      </span>

      <h3
        className={cn(
          "relative z-10 font-bold",
          isFeatured
            ? "text-2xl leading-tight text-white sm:text-3xl"
            : "text-base text-foreground"
        )}
      >
        {item.title}
      </h3>

      <p
        className={cn(
          "relative z-10 mt-3 leading-relaxed",
          isFeatured
            ? "max-w-md text-sm text-teal-50/95 sm:text-base"
            : "text-sm text-foreground-muted"
        )}
      >
        {item.description}
      </p>
    </motion.article>
  );
}

export function Differentiators() {
  return (
    <section
      className="bg-white/80 backdrop-blur-sm py-16 sm:py-20"
      aria-labelledby="differentiators-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="differentiators-heading"
          className="text-center text-3xl font-bold text-foreground sm:text-4xl"
        >
          What sets our work apart
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-foreground-muted">
          Why manufacturers choose AMV for inspection that has to work in
          production.
        </p>

        <motion.div
          className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:gap-5"
          variants={container}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-60px" }}
        >
          {differentiators.map((item) => (
            <DifferentiatorCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
