"use client";

import { motion } from "framer-motion";
import { Camera, Ruler, Brain, Check, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CapabilityFamily {
  id: string;
  title: string;
  intro: string;
  items: string[];
  icon: LucideIcon;
}

const families: CapabilityFamily[] = [
  {
    id: "sensing",
    title: "Image acquisition and sensing",
    intro: "Choosing and engineering the right imaging for the application.",
    items: [
      "2D area-scan imaging",
      "Line-scan imaging",
      "3D laser profiling",
      "Lighting, triggering and calibration",
    ],
    icon: Camera,
  },
  {
    id: "classical",
    title: "Classical and rule-based vision",
    intro: "Precise, deterministic inspection where geometry and rules fit best.",
    items: [
      "Dimensional measurement and metrology",
      "Alignment and pattern matching",
      "Geometric gauging and tolerancing",
      "Rule-based defect and presence checks",
    ],
    icon: Ruler,
  },
  {
    id: "ml",
    title: "Machine learning and deep learning",
    intro: "Trained models for complex, variable and hard to define defects.",
    items: [
      "Object and defect detection",
      "Semantic and instance segmentation",
      "Anomaly and contamination detection",
      "Classification and grading",
      "Custom model development",
    ],
    icon: Brain,
  },
];

const problems: string[] = [
  "Defect detection",
  "Contamination and foreign object detection",
  "Presence, absence and component verification",
  "Label and print verification",
  "Dimensional measurement and metrology",
  "Fill level estimation",
  "Surface and structural damage assessment",
  "Orientation and placement checks",
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

function FamilyCard({ family }: { family: CapabilityFamily }) {
  const Icon = family.icon;
  return (
    <motion.article
      variants={cardItem}
      className={cn(
        "flex flex-col rounded-2xl border border-border bg-white p-6 shadow-soft",
        "transition-all hover:-translate-y-1 hover:border-accent-primary/40 hover:shadow-soft-lg"
      )}
    >
      <span
        className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 text-white shadow-soft"
        aria-hidden
      >
        <Icon className="h-6 w-6" strokeWidth={2} />
      </span>
      <h3 className="mt-4 text-base font-bold text-foreground">
        {family.title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
        {family.intro}
      </p>
      <ul className="mt-4 space-y-2 border-t border-border pt-4">
        {family.items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 text-sm text-foreground"
          >
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-primary"
              aria-hidden
            />
            {item}
          </li>
        ))}
      </ul>
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
          We own the full pipeline, from sensor and lighting to the inspection
          algorithm, and choose the right combination for each problem.
        </p>

        {/* Capability families */}
        <motion.div
          className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-3"
          variants={container}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-60px" }}
        >
          {families.map((family) => (
            <FamilyCard key={family.id} family={family} />
          ))}
        </motion.div>

        {/* Problems we solve */}
        <div className="mt-16 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-border" aria-hidden />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-primary">
            Problems we solve
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
          <ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
            {problems.map((problem) => (
              <motion.li
                key={problem}
                variants={cardItem}
                className="flex items-start gap-3"
              >
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-primary text-white"
                  aria-hidden
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-sm font-medium leading-snug text-foreground">
                  {problem}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
