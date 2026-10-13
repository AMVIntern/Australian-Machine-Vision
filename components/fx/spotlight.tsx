"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Adapted from Magic UI "Magic Card" and Aceternity "Card Spotlight" (MIT)
// Drop inside any `relative overflow-hidden` card. It tracks the pointer on
// its parent and paints a soft radial glow plus a glowing border segment.

interface SpotlightProps {
  className?: string;
  /** Fill glow colour */
  color?: string;
  /** Border glow colour */
  borderColor?: string;
  size?: number;
}

export function Spotlight({
  className,
  color = "rgba(13, 148, 136, 0.10)",
  borderColor = "rgba(13, 148, 136, 0.55)",
  size = 360,
}: SpotlightProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    const host = ref.current?.parentElement;
    if (!host) return;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = host.getBoundingClientRect();
      host.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
      host.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
      setActive(true);
    };
    const onLeave = () => setActive(false);

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-0 rounded-[inherit] transition-opacity duration-300",
        active ? "opacity-100" : "opacity-0",
        className
      )}
    >
      <span
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background: `radial-gradient(${size}px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${color}, transparent 70%)`,
        }}
      />
      <span
        className="absolute inset-0 rounded-[inherit] p-px"
        style={{
          background: `radial-gradient(${Math.round(size * 0.7)}px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${borderColor}, transparent 70%)`,
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
        }}
      />
    </span>
  );
}
