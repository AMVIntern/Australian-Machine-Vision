"use client";

import { motion } from "framer-motion";
import {
  Camera,
  Zap,
  Globe,
  Network,
  Package,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface DifferentiatorItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const differentiators: DifferentiatorItem[] = [
  {
    id: "existing-cameras",
    title: "Works with Existing Cameras",
    description:
      "No need to replace your current camera infrastructure—leverage what you already have.",
    icon: Camera,
  },
  {
    id: "rapid-deployment",
    title: "Rapid Deployment",
    description:
      "Go from pilot to production in weeks, not months, with our proven methodology.",
    icon: Zap,
  },
  {
    id: "limited-data",
    title: "High Accuracy with Limited Data",
    description:
      "Advanced techniques achieve >95% accuracy with minimal training samples.",
    icon: Globe,
  },
  {
    id: "scalable",
    title: "Scalable Architecture",
    description:
      "Start with one line and scale across facilities with centralized management.",
    icon: Network,
  },
  {
    id: "industry-models",
    title: "Industry-Specific Models",
    description:
      "Pre-trained on manufacturing defects—customize for your unique needs.",
    icon: Package,
  },
  {
    id: "continuous-improvement",
    title: "Continuous Improvement",
    description:
      "Active learning pipeline ensures models get smarter with every inspection.",
    icon: TrendingUp,
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
        "flex flex-col rounded-xl bg-white p-6 text-left shadow-soft",
        "transition-shadow hover:shadow-soft-lg hover:-translate-y-0.5"
      )}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Icon: top-left, white icon on solid teal rounded square */}
      <span
        className="mb-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent-primary text-white"
        aria-hidden
      >
        <Icon className="h-5 w-5" strokeWidth={2} />
      </span>
      <h3 className="text-base font-bold text-foreground">
        {item.title}
      </h3>
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
          Why Choose AMV
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-foreground-muted">
          The competitive advantages that set us apart
        </p>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
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
