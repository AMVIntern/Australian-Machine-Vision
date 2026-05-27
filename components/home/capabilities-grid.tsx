"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  Brain,
  Zap,
  Video,
  Plug,
  BarChart3,
  Tags,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface CapabilityItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const capabilities: CapabilityItem[] = [
  {
    id: "edge",
    title: "Edge AI deployment",
    description:
      "Run models on-device or at the edge for low latency and offline capability.",
    icon: Cpu,
  },
  {
    id: "training",
    title: "Custom model training",
    description:
      "Train and fine-tune models on your data for your specific defect classes.",
    icon: Brain,
  },
  {
    id: "realtime",
    title: "Real-time inference",
    description:
      "Sub-50ms inference for high-speed production lines and live feedback.",
    icon: Zap,
  },
  {
    id: "multicam",
    title: "Multi-camera support",
    description:
      "Sync and process streams from multiple cameras with unified analytics.",
    icon: Video,
  },
  {
    id: "hardware",
    title: "Hardware agnostic integration",
    description:
      "Connect to any camera, GPU, or industrial hardware via standard protocols.",
    icon: Plug,
  },
  {
    id: "dashboard",
    title: "Dashboard analytics",
    description:
      "Visualise trends, defect rates, and KPIs in configurable dashboards.",
    icon: BarChart3,
  },
  {
    id: "annotation",
    title: "Data annotation & dataset management",
    description:
      "Streamline dataset labeling, versioning, and curation for continuous model improvement.",
    icon: Tags,
  },
  {
    id: "learning",
    title: "Continuous learning pipeline",
    description:
      "Retrain models on new data and deploy updates without downtime.",
    icon: RefreshCw,
  },
];

const container = {
  animate: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const cardItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 },
};

function CapabilityCard({ capability }: { capability: CapabilityItem }) {
  const Icon = capability.icon;
  return (
    <motion.article
      variants={cardItem}
      className={cn(
        "rounded-xl border border-border p-5 shadow-soft transition-shadow",
        "glass hover:shadow-soft-lg hover:-translate-y-0.5"
      )}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <span
        className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-primary text-white"
        aria-hidden
      >
        <Icon className="h-5 w-5" strokeWidth={2} />
      </span>
      <h3 className="text-sm font-semibold text-foreground">
        {capability.title}
      </h3>
      <p className="mt-1.5 text-sm text-foreground-muted">
        {capability.description}
      </p>
    </motion.article>
  );
}

export function CapabilitiesGrid() {
  return (
    <section
      className="border-y border-border bg-white/80 backdrop-blur-sm py-16 sm:py-20"
      aria-labelledby="capabilities-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="capabilities-heading"
          className="text-center text-3xl font-bold text-foreground sm:text-4xl"
        >
          Core capabilities
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-foreground-muted">
          End-to-end AI vision infrastructure for industrial inspection.
        </p>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-60px" }}
        >
          {capabilities.map((capability) => (
            <CapabilityCard key={capability.id} capability={capability} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
