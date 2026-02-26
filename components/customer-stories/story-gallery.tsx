"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/lib/customer-stories";

export interface StoryGalleryProps {
  images: GalleryImage[];
  className?: string;
}

const gradientByType: Record<string, string> = {
  "bounding-box": "from-accent-primary/20 to-accent-secondary/20",
  defect: "from-rose-100 to-amber-100",
  "before-after": "from-slate-200 to-slate-300",
  dashboard: "from-background-secondary to-border",
  general: "from-background-secondary to-border",
};

export function StoryGallery({ images, className }: StoryGalleryProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2",
        className
      )}
    >
      {images.map((img, index) => (
        <motion.figure
          key={img.id}
          className="group overflow-hidden rounded-xl border border-border bg-white shadow-soft"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.06 }}
        >
          <div
            className={cn(
              "relative aspect-video w-full bg-gradient-to-br",
              gradientByType[img.type ?? "general"] ?? "from-background-secondary to-border"
            )}
          >
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <div className="h-14 w-14 rounded-lg border-2 border-dashed border-foreground-muted/30 bg-white/50" />
            </motion.div>
          </div>
          {img.caption && (
            <figcaption className="p-3 text-sm text-foreground-muted">
              {img.caption}
            </figcaption>
          )}
        </motion.figure>
      ))}
    </div>
  );
}
