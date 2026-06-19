"use client";

import { motion } from "framer-motion";
import {
  Gauge,
  Network,
  ShieldCheck,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";

interface ProductionPoint {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const points: ProductionPoint[] = [
  {
    id: "line-speed",
    title: "Runs at line speed",
    description:
      "Full line speed on the factory floor, built for around-the-clock operation.",
    icon: Gauge,
  },
  {
    id: "integration",
    title: "Integrates with your line",
    description:
      "Direct integration with PLCs and line control, plus desktop, web and mobile software.",
    icon: Network,
  },
  {
    id: "validated",
    title: "Validated and traceable",
    description:
      "Accuracy quantified against ground truth, with traceability built in.",
    icon: ShieldCheck,
  },
  {
    id: "supported",
    title: "Globally supported",
    description:
      "Deployments operating overseas, with tiered around-the-clock support.",
    icon: LifeBuoy,
  },
];

const container = {
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 },
};

export function ProductionStrip() {
  return (
    <section
      className="border-y border-border bg-background-secondary/50 py-14 sm:py-16"
      aria-labelledby="production-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="production-heading"
          className="text-center text-2xl font-bold text-foreground sm:text-3xl"
        >
          Engineered for production
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-foreground-muted">
          Built to run reliably where it matters, on the line.
        </p>

        <motion.div
          className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-60px" }}
        >
          {points.map((point) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.id}
                variants={item}
                className="flex flex-col items-center text-center"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 text-white shadow-soft"
                  aria-hidden
                >
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </span>
                <h3 className="mt-4 text-base font-bold text-foreground">
                  {point.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                  {point.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
