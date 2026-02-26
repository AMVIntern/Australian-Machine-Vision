"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface VisualProofItem {
  id: string;
  title: string;
  caption: string;
  alt: string;
  type: "before-after" | "bounding-box" | "segmentation" | "heatmap" | "dashboard";
}

const visualProofItems: VisualProofItem[] = [
  {
    id: "before-after",
    title: "Before vs after",
    caption: "Raw image and AI-enhanced inspection result.",
    alt: "Before and after inspection comparison placeholder",
    type: "before-after",
  },
  {
    id: "bounding-box",
    title: "Bounding box overlay",
    caption: "Defect detection with bounding box annotations.",
    alt: "Bounding box overlay example on inspection image placeholder",
    type: "bounding-box",
  },
  {
    id: "segmentation",
    title: "Segmentation mask",
    caption: "Pixel-level segmentation for defect regions.",
    alt: "Segmentation mask overlay placeholder",
    type: "segmentation",
  },
  {
    id: "heatmap",
    title: "Heatmap",
    caption: "Attention or confidence heatmap overlay.",
    alt: "Heatmap visualisation placeholder",
    type: "heatmap",
  },
  {
    id: "dashboard",
    title: "Dashboard",
    caption: "Analytics dashboard with live metrics.",
    alt: "Dashboard screenshot placeholder",
    type: "dashboard",
  },
];

const container = {
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

function getPlaceholderStyles(type: VisualProofItem["type"]) {
  switch (type) {
    case "before-after":
      return "from-slate-200 to-slate-300";
    case "bounding-box":
      return "from-accent-primary/20 to-accent-secondary/20";
    case "segmentation":
      return "from-teal-200 to-cyan-200";
    case "heatmap":
      return "from-amber-200 to-orange-200";
    case "dashboard":
      return "from-background-secondary to-border";
    default:
      return "from-background-secondary to-border";
  }
}

function VisualProofCard({ item }: { item: VisualProofItem }) {
  const gradient = getPlaceholderStyles(item.type);
  return (
    <motion.article
      variants={cardItem}
      className="group flex flex-col"
    >
      <motion.div
        className="relative overflow-hidden rounded-xl border border-border bg-white shadow-soft transition-shadow hover:shadow-soft-lg"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        {/* Image placeholder with overlay area */}
        <div
          className={cn(
            "relative aspect-video w-full bg-gradient-to-br",
            gradient
          )}
          aria-hidden
        >
          <div
          className="absolute inset-0 flex items-center justify-center"
          role="img"
          aria-label={item.alt}
        >
          <div className="h-16 w-16 rounded-lg border-2 border-dashed border-foreground-muted/30 bg-white/50" />
        </div>
          {/* Overlay annotation placeholder */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-foreground/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          >
            <div className="rounded-lg border-2 border-accent-primary/50 bg-white/90 px-3 py-1.5 text-xs font-medium text-accent-primary">
              Annotation overlay
            </div>
          </motion.div>
        </div>
        <div className="p-3">
          <h3 className="text-sm font-semibold text-foreground">
            {item.title}
          </h3>
          <p className="mt-0.5 text-xs text-foreground-muted">{item.caption}</p>
        </div>
      </motion.div>
    </motion.article>
  );
}

export function VisualProof() {
  return (
    <section
      className="py-16 sm:py-20"
      aria-labelledby="visual-proof-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="visual-proof-heading"
          className="text-center text-3xl font-bold text-foreground sm:text-4xl"
        >
          Visual proof
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-foreground-muted">
          Inspection examples, overlays, and dashboards from real deployments.
        </p>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-60px" }}
        >
          {visualProofItems.map((item) => (
            <VisualProofCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
