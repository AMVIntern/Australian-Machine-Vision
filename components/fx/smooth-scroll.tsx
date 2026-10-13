"use client";

import * as React from "react";
import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";
import "lenis/dist/lenis.css";

// Adapted from the Lenis React integration (MIT, darkroom.engineering)
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{ lerp: 0.1, anchors: { offset: -96 }, autoRaf: true }}
    >
      {children}
    </ReactLenis>
  );
}
