"use client";

import * as React from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { cn } from "@/lib/utils";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

type HeadingTag = "h1" | "h2" | "h3" | "p" | "span";

/**
 * Splits its text into lines and raises each line out of a mask when it
 * scrolls into view. Falls back to static text under reduced motion.
 */
export function ScanHeading({
  as = "h2",
  children,
  className,
  delay = 0,
  id,
}: {
  as?: HeadingTag;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}) {
  const ref = React.useRef<HTMLElement | null>(null);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let split: SplitText | null = null;
    const ctx = gsap.context(() => {
      split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        linesClass: "scan-line-piece",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 112,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.09,
            delay,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          }),
      });
    }, el);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, [delay]);

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}

/** Fades and lifts a block into place once, when it enters the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(el, {
        y,
        autoAlpha: 0,
        duration: 0.85,
        ease: "power3.out",
        delay,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** A hairline that draws itself from the left when it enters the viewport. */
export function RuleDraw({ className }: { className?: string }) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(el, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.1,
        ease: "power3.inOut",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={cn("h-px w-full bg-border", className)} aria-hidden />
  );
}
