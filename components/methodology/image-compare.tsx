"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Before and after slider: the camera frame against the same frame after a
 * classical edge-detection pass. Drag, click or use the arrow keys.
 * Adapted from the Motion Primitives "Image Comparison" pattern (MIT).
 */
export function ImageCompare({
  before,
  after,
  beforeLabel,
  afterLabel,
  alt,
  className,
}: {
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
  alt: string;
  className?: string;
}) {
  const [pos, setPos] = React.useState(52);
  const ref = React.useRef<HTMLDivElement>(null);
  const dragging = React.useRef(false);

  const setFromClientX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative aspect-[16/10] w-full touch-pan-y select-none overflow-hidden rounded-md bg-ink",
        className
      )}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        setFromClientX(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <Image src={after} alt="" fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" aria-hidden />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt={alt} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-sm bg-ink/80 px-2 py-1 font-mono text-xs text-white">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-sm bg-accent-logo px-2 py-1 font-mono text-xs text-ink">
        {afterLabel}
      </span>

      <div
        className="absolute inset-y-0 w-px bg-white"
        style={{ left: `${pos}%` }}
        aria-hidden
      />
      <button
        type="button"
        role="slider"
        aria-label={`${beforeLabel} and ${afterLabel} comparison`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
          if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
        }}
        className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-white bg-ink/80 text-white backdrop-blur-sm"
        style={{ left: `${pos}%` }}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
