"use client";

import { motion } from "framer-motion";
import {
  Package,
  Milk,
  Croissant,
  Layers,
  HeartPulse,
  Truck,
  Droplet,
  Boxes,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Sector {
  id: string;
  title: string;
  challenge: string;
  icon: LucideIcon;
}

const sectors: Sector[] = [
  {
    id: "fmcg",
    title: "FMCG and packaged food",
    challenge:
      "Quality and contamination inspection of products and packaging at high line speeds, foreign object detection and pack integrity.",
    icon: Package,
  },
  {
    id: "dairy",
    title: "Dairy and food processing",
    challenge:
      "Surface defect and spoilage detection on perishable product, with presence and condition checks.",
    icon: Milk,
  },
  {
    id: "bakery",
    title: "Bakery and packaged goods",
    challenge:
      "Label, date code and print verification on packaging, with pack and seal inspection.",
    icon: Croissant,
  },
  {
    id: "hygiene",
    title: "Hygiene and nonwoven manufacturing",
    challenge:
      "Continuous web inspection of fabric and ribbon material, with edge and width measurement, pattern verification and defect detection on fast moving material.",
    icon: Layers,
  },
  {
    id: "healthcare",
    title: "Healthcare and medical handling",
    challenge:
      "Contamination inspection of reusable medical containers, with fill level and condition assessment and safe handling verification.",
    icon: HeartPulse,
  },
  {
    id: "pharma",
    title: "Pharmaceutical distribution and logistics",
    challenge:
      "Contamination and integrity inspection of totes and transit containers in distribution environments.",
    icon: Truck,
  },
  {
    id: "biologics",
    title: "Blood, biologics and medical labelling",
    challenge:
      "Label presence, correctness and legibility verification on critical medical products.",
    icon: Droplet,
  },
  {
    id: "rtp",
    title: "Returnable transit packaging and supply chain",
    challenge:
      "Structural damage, missing component and out of spec assessment of pallets and reusable assets using 3D and 2D vision.",
    icon: Boxes,
  },
];

const container = {
  animate: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const cardItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 },
};

export function IndustriesServed() {
  return (
    <section
      className="bg-white/80 backdrop-blur-sm py-16 sm:py-20"
      aria-labelledby="industries-served-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="industries-served-heading"
          className="text-center text-3xl font-bold text-foreground sm:text-4xl"
        >
          Industries we serve
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-foreground-muted">
          The same underlying capability adapts to very different products and
          environments. The sensing, lighting and algorithm are tuned to each
          task.
        </p>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-60px" }}
        >
          {sectors.map((sector) => {
            const Icon = sector.icon;
            return (
              <motion.article
                key={sector.id}
                variants={cardItem}
                className={cn(
                  "flex flex-col rounded-2xl border border-border bg-white p-5 shadow-soft",
                  "transition-all hover:-translate-y-1 hover:border-accent-primary/40 hover:shadow-soft-lg"
                )}
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 text-white shadow-soft"
                  aria-hidden
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <h3 className="mt-4 text-sm font-bold text-foreground">
                  {sector.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                  {sector.challenge}
                </p>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Breadth callout */}
        <div className="mx-auto mt-10 max-w-4xl rounded-2xl border-l-4 border-accent-primary bg-background-secondary/50 p-6">
          <p className="text-base font-semibold text-foreground">
            Breadth of deployment is itself a capability.
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
            Operating across this many materials and environments means our
            toolkit and engineering practices are proven against a wide range of
            real world conditions, lighting and failure modes.
          </p>
        </div>
      </div>
    </section>
  );
}
