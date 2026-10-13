"use client";

import * as React from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Counts up from zero when it enters the viewport. Static under reduced motion. */
export function NumberTicker({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const counter = { n: 0 };
    const tween = gsap.to(counter, {
      n: value,
      duration: 1.4,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = `${Math.round(counter.n)}${suffix}`;
      },
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, suffix]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}

// keep the module tree-shaken reference so plugins register
void ScrollTrigger;
