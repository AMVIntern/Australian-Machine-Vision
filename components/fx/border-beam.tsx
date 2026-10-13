import * as React from "react";
import { cn } from "@/lib/utils";

// Adapted from Magic UI "Border Beam" (MIT)
// A short gradient segment that travels around the border of its parent.

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
}

export function BorderBeam({
  className,
  size = 220,
  duration = 9,
  delay = 0,
  borderWidth = 1.5,
  colorFrom = "#ffffff",
  colorTo = "#22d3ee",
}: BorderBeamProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        className
      )}
      style={{
        border: `${borderWidth}px solid transparent`,
        maskImage:
          "linear-gradient(transparent, transparent), linear-gradient(#000, #000)",
        maskClip: "padding-box, border-box",
        maskComposite: "intersect",
      }}
    >
      <div
        className="absolute aspect-square animate-border-beam"
        style={{
          width: size,
          background: `linear-gradient(to left, ${colorFrom}, ${colorTo}, transparent)`,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          offsetAnchor: "90% 50%",
          animationDuration: `${duration}s`,
          animationDelay: `-${delay}s`,
        }}
      />
    </div>
  );
}
