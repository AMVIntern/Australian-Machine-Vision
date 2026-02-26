"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CustomerStory } from "@/lib/customer-stories";

export interface StoryCardProps {
  story: CustomerStory;
  index?: number;
}

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export function StoryCard({ story, index = 0 }: StoryCardProps) {
  return (
    <motion.article
      variants={cardVariants}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-soft",
        "transition-shadow hover:shadow-soft-lg hover:-translate-y-1",
        "glass"
      )}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Link href={`/customer-stories/${story.slug}`} className="flex flex-col flex-1">
        {/* Top inspection image placeholder with gradient overlay */}
        <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-background-secondary to-border/40">
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200/80"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          >
            <div className="h-16 w-16 rounded-lg border-2 border-dashed border-accent-primary/40 bg-white/60" />
          </motion.div>
          <div
            className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent"
            aria-hidden
          />
          {/* Client logo badge placeholder */}
          <div
            className="absolute bottom-3 left-3 rounded-lg border border-white/30 bg-white/90 px-3 py-1.5 shadow-soft backdrop-blur-sm"
            aria-hidden
          >
            <span className="text-xs font-semibold text-foreground">
              {story.clientName}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h2 className="text-lg font-bold text-foreground group-hover:text-accent-primary transition-colors">
            {story.title}
          </h2>
          <p className="mt-2 text-sm text-foreground-muted line-clamp-2">
            {story.shortDescription}
          </p>
          {/* Metric highlights */}
          <ul className="mt-4 flex flex-wrap gap-3" role="list">
            {story.metrics.slice(0, 3).map((m) => (
              <li
                key={m.label}
                className="rounded-md bg-accent-primary/10 px-2 py-1 text-xs font-medium text-accent-primary"
              >
                {m.value} {m.label}
              </li>
            ))}
          </ul>
          <span
            className={cn(
              "mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-primary",
              "group-hover:gap-2 transition-all"
            )}
          >
            Read Case Study
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
