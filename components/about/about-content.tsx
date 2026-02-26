"use client";

import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Users,
  Cpu,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.4 },
};

const sections = [
  {
    id: "mission",
    icon: Target,
    title: "Our mission",
    content:
      "To make industrial quality inspection faster, more accurate, and accessible—so every manufacturer can deploy AI vision without replacing existing infrastructure.",
  },
  {
    id: "vision",
    icon: Eye,
    title: "Company vision",
    content:
      "A world where defect detection is real-time, consistent, and scalable. We combine deep learning with practical deployment so our customers focus on production, not inspection bottlenecks.",
  },
  {
    id: "founder",
    icon: Users,
    title: "Our story",
    content:
      "Founded by engineers who saw the gap between research and production, Australian Machine Vision brings cutting-edge computer vision to the factory floor. Our team has deep experience in manufacturing and ML—placeholder for expanded founder story.",
  },
  {
    id: "expertise",
    icon: Cpu,
    title: "Expertise in computer vision",
    content:
      "We specialise in defect detection, classification, and segmentation for automotive, FMCG, pharma, and general manufacturing. From edge deployment to cloud APIs, we deliver solutions that integrate with your MES and quality systems.",
  },
  {
    id: "innovation",
    icon: FlaskConical,
    title: "Innovation and research focus",
    content:
      "We invest in continuous learning pipelines, few-shot adaptation, and real-time inference so our models stay accurate as your product mix changes. Our R&D keeps pace with the latest in industrial AI.",
  },
] as const;

function SectionBlock({
  icon: Icon,
  title,
  content,
}: {
  icon: LucideIcon;
  title: string;
  content: string;
}) {
  return (
    <motion.section
      className={cn(
        "rounded-xl border border-border bg-white p-6 shadow-soft sm:p-8",
        "bg-background-secondary/50"
      )}
      {...fadeIn}
    >
      <motion.span
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-primary text-white"
        aria-hidden
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <Icon className="h-6 w-6" strokeWidth={2} />
      </motion.span>
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      <p className="mt-3 text-foreground-muted leading-relaxed">{content}</p>
    </motion.section>
  );
}

export function AboutContent() {
  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <SectionBlock
          key={section.id}
          icon={section.icon}
          title={section.title}
          content={section.content}
        />
      ))}
    </div>
  );
}
