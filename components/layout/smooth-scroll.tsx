"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";
import "lenis/dist/lenis.css";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, anchors: { offset: -96 } }}>
      {children}
    </ReactLenis>
  );
}
