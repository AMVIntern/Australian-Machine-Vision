"use client";

import { motion } from "framer-motion";
import {
  Camera,
  Brain,
  ScanSearch,
  AlertCircle,
  Network,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface PipelineStep {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

const pipelineSteps: PipelineStep[] = [
  {
    id: "capture",
    number: 1,
    title: "Camera Capture",
    description: "High-resolution image acquisition at line speed",
    icon: Camera,
  },
  {
    id: "inference",
    number: 2,
    title: "AI Inference",
    description: "Deep learning models analyze images in real-time",
    icon: Brain,
  },
  {
    id: "detection",
    number: 3,
    title: "Detection",
    description: "Identify defects, classify issues, segment regions",
    icon: ScanSearch,
  },
  {
    id: "alerts",
    number: 4,
    title: "Alerts & Analytics",
    description: "Instant notifications and trend visualization",
    icon: AlertCircle,
  },
  {
    id: "integration",
    number: 5,
    title: "Integration",
    description: "Connect to ERP, MES, and quality systems",
    icon: Network,
  },
];

const container = {
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const stepCard = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

function PipelineStepCard({ step }: { step: PipelineStep }) {
  const Icon = step.icon;
  return (
    <motion.div
      variants={stepCard}
      className="relative z-10 flex min-w-0 flex-1 flex-col items-center text-center"
    >
      {/* Icon block: teal gradient, white icon */}
      <div
        className={cn(
          "flex h-14 w-14 shrink-0 items-center justify-center rounded-lg",
          "bg-gradient-to-b from-teal-400 to-teal-600 shadow-soft"
        )}
        aria-hidden
      >
        <Icon className="h-7 w-7 text-white" strokeWidth={2} />
      </div>
      <span
        className="mt-3 text-xs font-semibold uppercase tracking-wide text-teal-800"
        aria-hidden
      >
        Step {step.number}
      </span>
      <h3 className="mt-1 text-sm font-bold text-foreground sm:text-base">
        {step.title}
      </h3>
      <p className="mt-1 max-w-[200px] text-xs leading-snug text-foreground-muted sm:text-sm">
        {step.description}
      </p>
    </motion.div>
  );
}

export function Pipeline() {
  return (
    <section
      className="bg-white/80 backdrop-blur-sm py-16 sm:py-20"
      aria-labelledby="pipeline-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="pipeline-heading"
          className="text-center text-3xl font-bold text-foreground sm:text-4xl"
        >
          How It Works
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-foreground-muted">
          End-to-end AI vision pipeline from capture to action
        </p>

        {/* Desktop: horizontal flow with single connecting line */}
        <motion.div
          className="relative mt-12 hidden lg:flex lg:items-start lg:justify-between lg:gap-4"
          variants={container}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Single solid teal connector line behind steps */}
          <div
            className="absolute left-0 right-0 top-7 h-0.5 bg-accent-primary"
            aria-hidden
          />
          {pipelineSteps.map((step) => (
            <PipelineStepCard key={step.id} step={step} />
          ))}
        </motion.div>

        {/* Mobile: stacked cards with same content order */}
        <motion.div
          className="mt-12 flex flex-col gap-8 lg:hidden"
          variants={container}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-40px" }}
        >
          {pipelineSteps.map((step, index) => {
            const Icon = step.icon;
            return (
            <motion.div
              key={step.id}
              variants={stepCard}
              className="flex flex-col items-center text-center"
            >
              <div
                className={cn(
                  "flex h-14 w-14 shrink-0 items-center justify-center rounded-lg",
                  "bg-gradient-to-b from-teal-400 to-teal-600 shadow-soft"
                )}
                aria-hidden
              >
                <Icon className="h-7 w-7 text-white" strokeWidth={2} />
              </div>
              <span className="mt-3 text-xs font-semibold uppercase tracking-wide text-teal-800">
                Step {step.number}
              </span>
              <h3 className="mt-1 text-sm font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mt-1 max-w-[280px] text-xs text-foreground-muted">
                {step.description}
              </p>
            </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
