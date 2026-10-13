"use client";

import * as React from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

/** The AMV mark, assembling as the section scrolls into view. */
function AssemblingMark() {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center 55%"],
  });
  const spring = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 });
  // Reduced motion reads a progress pinned at 1, so the mark rests assembled.
  // The styles stay motion values in both modes: the server renders the
  // scattered start inline, and only motion values repaint it after hydration.
  const assembled = useMotionValue(1);
  const p = reduceMotion ? assembled : spring;

  const leftX = useTransform(p, [0, 1], [-140, 0]);
  const leftY = useTransform(p, [0, 1], [90, 0]);
  const leftR = useTransform(p, [0, 1], [-14, 0]);
  const rightX = useTransform(p, [0, 1], [150, 0]);
  const rightY = useTransform(p, [0, 1], [-80, 0]);
  const rightR = useTransform(p, [0, 1], [12, 0]);
  const triScale = useTransform(p, [0, 1], [0.86, 1]);
  const triOpacity = useTransform(p, [0, 0.5, 1], [0.2, 0.85, 1]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[34rem]">
      <svg viewBox="0 0 628 340" className="h-auto w-full overflow-visible" aria-hidden>
        <motion.polygon
          points="8,88 250,58 352,336"
          fill="#14a49c"
          style={{ x: leftX, y: leftY, rotate: leftR, transformOrigin: "180px 200px" }}
        />
        <motion.polygon
          points="372,44 600,6 556,124"
          fill="#14a49c"
          style={{ x: rightX, y: rightY, rotate: rightR, transformOrigin: "480px 60px" }}
        />
        <motion.polygon
          points="26,40 612,40 330,332"
          fill="#201c20"
          style={{ scale: triScale, opacity: triOpacity, transformOrigin: "320px 180px" }}
        />
      </svg>
    </div>
  );
}

export function FinalCTA({
  showSecondary = true,
  showNote = true,
  headingId = "final-cta-heading",
}: {
  showSecondary?: boolean;
  showNote?: boolean;
  headingId?: string;
}) {
  return (
    <section
      className="relative overflow-hidden bg-background-tint py-24 sm:py-32"
      aria-labelledby={headingId}
    >
      <div className="dot-field-light pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2
              id={headingId}
              className="font-display max-w-[16ch] text-4xl font-extrabold leading-[1.02] text-foreground sm:text-6xl"
            >
              Let&apos;s Solve Your Inspection Challenge
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted sm:text-xl">
              If you are reviewing your inspection capability or planning
              upgrades across multiple sites, our team can help you identify the
              right approach.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className={cn(
                  "chamfer inline-flex h-12 items-center justify-center bg-ink px-8 text-base font-semibold text-white transition-colors",
                  "hover:bg-accent-primary"
                )}
              >
                Contact Us
              </Link>
              {showSecondary && (
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-foreground/20 bg-white px-8 text-base font-semibold text-foreground transition-colors hover:border-accent-deep hover:text-accent-deep"
                >
                  Talk to Our Team
                </Link>
              )}
            </div>

            {showNote && (
              <p className="mt-10 flex max-w-xl items-start gap-3 border-t border-border pt-6 text-sm leading-relaxed text-foreground-muted">
                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-accent-primary" aria-hidden />
                Your work stays confidential. We do not publish client names or project details without permission.
              </p>
            )}
          </div>

          <div className="lg:col-span-5">
            <AssemblingMark />
          </div>
        </div>
      </div>
    </section>
  );
}
