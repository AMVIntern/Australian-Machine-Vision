"use client";

import { motion } from "framer-motion";
import {
  Award,
  Lightbulb,
  Handshake,
  Accessibility,
  TrendingUp,
  FileCheck,
  type LucideIcon,
} from "lucide-react";

const values = [
  {
    id: "excellence",
    icon: Award,
    title: "Excellence",
    description:
      "We deliver best-in-class accuracy and reliability in every deployment, from pilot to production.",
  },
  {
    id: "innovation",
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Continuous R&D in computer vision and edge AI keeps our solutions at the cutting edge.",
  },
  {
    id: "partnership",
    icon: Handshake,
    title: "Partnership",
    description:
      "We work alongside your team to understand your process and deliver solutions that fit.",
  },
  {
    id: "accessibility",
    icon: Accessibility,
    title: "Accessibility",
    description:
      "AI vision that works with your existing cameras and infrastructure—no rip-and-replace.",
  },
  {
    id: "impact",
    icon: TrendingUp,
    title: "Impact",
    description:
      "Measurable outcomes: fewer defects, lower costs, higher throughput, and full traceability.",
  },
  {
    id: "transparency",
    icon: FileCheck,
    title: "Transparency",
    description:
      "Clear metrics, auditable results, and honest communication at every step.",
  },
] as const;

const container = {
  animate: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const item = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 },
};

export function AboutValuesSection() {
  return (
    <>
      <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
        Our Core Values
      </h2>
      <p className="mx-auto mt-2 max-w-2xl text-center text-foreground-muted">
        The principles that guide everything we do
      </p>
      <motion.div
        className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-40px" }}
      >
        {values.map((v) => {
          const Icon = v.icon;
          return (
            <motion.article
              key={v.id}
              variants={item}
              className="rounded-xl border border-border bg-white p-6 shadow-soft"
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-primary text-white"
                aria-hidden
              >
                <Icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <h3 className="mt-4 text-lg font-bold text-foreground">
                {v.title}
              </h3>
              <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
                {v.description}
              </p>
            </motion.article>
          );
        })}
      </motion.div>
    </>
  );
}
