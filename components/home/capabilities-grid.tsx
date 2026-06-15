"use client";

import { motion } from "framer-motion";
import {
  Box,
  Camera,
  Cpu,
  ScanLine,
  Thermometer,
  SlidersHorizontal,
  Brain,
  Lightbulb,
  ScanBarcode,
  Check,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface CapabilityItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const technologies: CapabilityItem[] = [
  {
    id: "3d",
    title: "3D vision and depth sensing",
    description: "Capture shape and depth for volume, position and form checks.",
    icon: Box,
  },
  {
    id: "2d",
    title: "High resolution 2D imaging",
    description: "Sharp imaging for fine detail and surface inspection.",
    icon: Camera,
  },
  {
    id: "smart-cameras",
    title: "Smart cameras and embedded vision",
    description: "Self-contained inspection at the point of capture.",
    icon: Cpu,
  },
  {
    id: "scan",
    title: "Line scan and area scan imaging",
    description: "Continuous or framed capture to suit your line.",
    icon: ScanLine,
  },
  {
    id: "spectral",
    title: "Multispectral, hyperspectral and thermal",
    description: "See beyond visible light for material and heat analysis.",
    icon: Thermometer,
  },
  {
    id: "lighting",
    title: "Lighting and optics design",
    description: "Application-specific lighting and optics for reliable imaging.",
    icon: Lightbulb,
  },
  {
    id: "image-processing",
    title: "Advanced image processing",
    description: "Proven algorithms for measurement and defect detection.",
    icon: SlidersHorizontal,
  },
  {
    id: "code-reading",
    title: "Code and character reading",
    description: "Read barcodes, text and labels for verification and traceability.",
    icon: ScanBarcode,
  },
  {
    id: "deep-learning",
    title: "Deep learning detection",
    description: "Trained models for complex and variable defects.",
    icon: Brain,
  },
];

const applications: string[] = [
  "Quality control, in and out of specification",
  "Dimensional measurement and tolerance verification",
  "Foreign material detection",
  "Surface and structural defect detection",
  "Packaging and label inspection",
  "Fill level and completeness checks",
  "Assembly verification",
  "Automated trending and process analytics",
  "Real time decision support for operators",
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

function TechnologyCard({ item }: { item: CapabilityItem }) {
  const Icon = item.icon;
  return (
    <motion.article
      variants={cardItem}
      className={cn(
        "group flex w-full flex-col rounded-2xl border border-border bg-white p-6 shadow-soft",
        "transition-all hover:-translate-y-1 hover:border-accent-primary/40 hover:shadow-soft-lg",
        "sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.875rem)]"
      )}
    >
      <span
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl",
          "bg-gradient-to-br from-teal-400 to-teal-600 text-white shadow-soft",
          "transition-transform group-hover:scale-105"
        )}
        aria-hidden
      >
        <Icon className="h-6 w-6" strokeWidth={2} />
      </span>
      <h4 className="mt-4 text-base font-bold text-foreground">{item.title}</h4>
      <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
        {item.description}
      </p>
    </motion.article>
  );
}

export function CapabilitiesGrid() {
  return (
    <section
      className="border-y border-border bg-gradient-to-b from-background-secondary/40 to-white py-16 sm:py-20"
      aria-labelledby="capabilities-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="capabilities-heading"
          className="text-center text-3xl font-bold text-foreground sm:text-4xl"
        >
          Capabilities
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-foreground-muted">
          A broad range of vision technologies, applied to the inspection
          challenges that matter most.
        </p>

        {/* Vision technologies */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-border" aria-hidden />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-primary">
            Vision technologies
          </h3>
          <span className="h-px w-8 bg-border" aria-hidden />
        </div>
        <motion.div
          className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-4"
          variants={container}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-60px" }}
        >
          {technologies.map((item) => (
            <TechnologyCard key={item.id} item={item} />
          ))}
        </motion.div>

        {/* Key applications */}
        <div className="mt-16 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-border" aria-hidden />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-primary">
            Key applications
          </h3>
          <span className="h-px w-8 bg-border" aria-hidden />
        </div>
        <motion.div
          className="mx-auto mt-8 max-w-5xl rounded-3xl border border-border bg-white p-6 shadow-soft sm:p-8"
          variants={container}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-60px" }}
        >
          <ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {applications.map((app) => (
              <motion.li
                key={app}
                variants={cardItem}
                className="flex items-start gap-3 rounded-lg p-1 transition-colors"
              >
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-primary text-white"
                  aria-hidden
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-sm font-medium leading-snug text-foreground">
                  {app}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
