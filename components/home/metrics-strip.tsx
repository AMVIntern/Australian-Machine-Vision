"use client";

import { motion } from "framer-motion";
import {
  Target,
  TrendingUp,
  Zap,
  RefreshCw,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface MetricItem {
  id: string;
  value: string;
  label: string;
  icon: LucideIcon;
}

const metrics: MetricItem[] = [
  {
    id: "accuracy",
    value: "99.2%",
    label: "Detection Accuracy",
    icon: Target,
  },
  {
    id: "cost",
    value: "65%",
    label: "Cost Reduction",
    icon: TrendingUp,
  },
  {
    id: "speed",
    value: "400%",
    label: "Speed Improvement",
    icon: Zap,
  },
  {
    id: "latency",
    value: "45ms",
    label: "Inference Latency",
    icon: RefreshCw,
  },
  {
    id: "uptime",
    value: "99.9%",
    label: "Uptime",
    icon: Shield,
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
  transition: { duration: 0.4 },
};

export function MetricsStrip() {
  return (
    <section
      className="border-y border-border bg-white py-12 sm:py-16"
      aria-labelledby="metrics-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="metrics-heading" className="sr-only">
          Key metrics and trust indicators
        </h2>
        <motion.div
          className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6"
          variants={container}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-60px" }}
        >
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.id}
                variants={item}
                className="flex flex-col items-center text-center"
              >
                <div
                  className={cn(
                    "mb-4 flex h-14 w-14 items-center justify-center rounded-lg border border-accent-primary/40 bg-accent-primary/10 text-accent-primary"
                  )}
                  aria-hidden
                >
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <p
                  className="text-2xl font-bold tabular-nums text-foreground sm:text-3xl"
                  data-metric-value
                  aria-label={`${metric.label}: ${metric.value}`}
                >
                  {metric.value}
                </p>
                <p className="mt-1.5 text-sm text-foreground-muted">
                  {metric.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
