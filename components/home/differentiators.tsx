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
}

const differentiators: DifferentiatorItem[] = [
  {
    id: "whole-stack",
    title: "Whole-stack capability",
    description:
      "We own the full pipeline, from sensor and lighting to the inspection algorithm, operator software and line-control integration. We are not tied to a single vendor or technique.",
    icon: Layers,
  },
  {
    id: "right-tool",
    title: "Right tool for the job",
    description:
      "Some defects suit precise geometric measurement, others need a trained model. We combine both in one system, using each where it is strongest.",
    icon: Wrench,
  },
  {
    id: "production-grade",
    title: "Production-grade engineering",
    description:
      "Our systems run on the factory floor at full line speed, with the reliability, traceability and integration that around-the-clock operation demands.",
    icon: Factory,
  },
  {
    id: "customised",
    title: "Built to be customised",
    description:
      "Every application is deeply configurable and tailored to your exact line, product mix and process. This adaptability is our core strength.",
    icon: SlidersHorizontal,
    featured: true,
  },
  {
    id: "supported",
    title: "Customer oriented and globally supported",
    description:
      "We work closely with you through the life of the system, with deployments operating overseas and tiered support where it is needed.",
    icon: Globe,
  },
];

const container = {
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 },
};

function DifferentiatorCard({ item }: { item: DifferentiatorItem }) {
  const Icon = item.icon;
  return (
    <motion.article
      variants={cardItem}
      className={cn(
        "relative flex w-full flex-col rounded-xl bg-white p-6 text-left shadow-soft",
        "transition-all hover:-translate-y-0.5 hover:shadow-soft-lg",
        "sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.875rem)]",
        item.featured
          ? "border-2 border-accent-primary"
          : "border border-transparent"
      )}
    >
      {item.featured && (
        <span className="absolute right-4 top-4 rounded-full bg-accent-primary/10 px-2.5 py-0.5 text-xs font-semibold text-accent-primary">
          Core strength
        </span>
      )}
      <span
        className="mb-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent-primary text-white"
        aria-hidden
      >
        <Icon className="h-5 w-5" strokeWidth={2} />
      </span>
      <h3 className="text-base font-bold text-foreground">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
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
          className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-4"
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
