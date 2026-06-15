"use client";

import { motion } from "framer-motion";
import {
  Award,
  Network,
  Cpu,
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
    id: "experience",
    title: "Decades of Experience",
    description:
      "More than 20 years delivering machine vision and automated inspection across food processing, FMCG, packaging and industrial manufacturing, in Australia and global markets.",
    icon: Award,
  },
  {
    id: "partners",
    title: "Technology Partners",
    description:
      "A wide network of trusted partners across the global vision industry, giving access to the best available hardware, imaging platforms and processing technologies.",
    icon: Network,
  },
  {
    id: "engineering",
    title: "In-House Engineering and Software",
    description:
      "Our teams design, build and support every system, combining the best available components with custom software and automation integration.",
    icon: Cpu,
  },
  {
    id: "value",
    title: "Value for Investment",
    description:
      "We solve the challenges that off the shelf systems cannot, delivering measurable improvements in accuracy, throughput and consistency.",
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
          What we bring to every inspection project
        </p>

        <motion.div
          className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2"
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
