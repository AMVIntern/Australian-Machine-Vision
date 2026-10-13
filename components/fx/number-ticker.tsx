"use client";

import * as React from "react";
import {
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

// Adapted from Magic UI "Number Ticker" (MIT)
// Server renders the final value; the count-up only runs once in view.

export function NumberTicker({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 40, stiffness: 90 });
  const inView = useInView(ref, { once: true, margin: "-40px" });

  React.useEffect(() => {
    if (reduceMotion || !ref.current) return;
    ref.current.textContent = "0";
  }, [reduceMotion]);

  React.useEffect(() => {
    if (inView && !reduceMotion) motionValue.set(value);
  }, [inView, reduceMotion, motionValue, value]);

  React.useEffect(
    () =>
      spring.on("change", (latest) => {
        if (ref.current) ref.current.textContent = Math.round(latest).toString();
      }),
    [spring]
  );

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {value}
    </span>
  );
}
