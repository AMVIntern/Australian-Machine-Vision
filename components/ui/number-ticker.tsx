"use client";

import * as React from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/** Counts up to `value` once it scrolls into view. Adapted from Magic UI (MIT). */
export function NumberTicker({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  // The server and first client render both show the final value, so
  // hydration matches; the count-up resets to zero only after mount.
  const [display, setDisplay] = React.useState(value);

  React.useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    if (!inView) {
      setDisplay(0);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  return (
    <span ref={ref} className="tabular">
      {display}
      {suffix}
    </span>
  );
}
