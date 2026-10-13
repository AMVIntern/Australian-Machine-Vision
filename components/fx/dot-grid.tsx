"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

// Adapted from React Bits "Dot Grid" (MIT, DavidHDev)
// At rest it draws the same 28px teal dot texture the site has always used.
// Dots near the pointer brighten toward cyan and ease away from it. The
// canvas only redraws while the pointer moves or dots are still easing.

interface DotGridProps {
  className?: string;
  spacing?: number;
  radius?: number;
  push?: number;
  /** 0 to 1, scales how strongly dots react to the pointer */
  intensity?: number;
  /** Base dot alpha at rest */
  alpha?: number;
}

const BASE = [13, 148, 136]; // #0d9488
const ACTIVE = [34, 211, 238]; // #22d3ee

export function DotGrid({
  className,
  spacing = 28,
  radius = 150,
  push = 7,
  intensity = 1,
  alpha = 0.67,
}: DotGridProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let influence = new Float32Array(0);
    let raf = 0;
    const pointer = { x: -9999, y: -9999, active: false };

    const interactive =
      !reduceMotion && window.matchMedia("(pointer: fine)").matches;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const half = spacing / 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const f = influence[i] * intensity;
          let x = half + c * spacing;
          let y = half + r * spacing;
          if (f > 0.001) {
            const dx = x - pointer.x;
            const dy = y - pointer.y;
            const d = Math.hypot(dx, dy) || 1;
            x += (dx / d) * push * f;
            y += (dy / d) * push * f;
          }
          const red = BASE[0] + (ACTIVE[0] - BASE[0]) * f;
          const green = BASE[1] + (ACTIVE[1] - BASE[1]) * f;
          const blue = BASE[2] + (ACTIVE[2] - BASE[2]) * f;
          ctx.fillStyle = `rgba(${red | 0},${green | 0},${blue | 0},${alpha + (1 - alpha) * f})`;
          ctx.beginPath();
          ctx.arc(x, y, 1 + f * 1.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const step = () => {
      let moving = false;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          let target = 0;
          if (pointer.active) {
            const d = Math.hypot(
              spacing / 2 + c * spacing - pointer.x,
              spacing / 2 + r * spacing - pointer.y
            );
            const t = Math.max(0, 1 - d / radius);
            target = t * t;
          }
          const next = influence[i] + (target - influence[i]) * 0.16;
          if (Math.abs(target - next) > 0.004) moving = true;
          influence[i] = Math.abs(target - next) > 0.004 ? next : target;
        }
      }
      draw();
      raf = moving ? requestAnimationFrame(step) : 0;
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(step);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / spacing);
      rows = Math.ceil(height / spacing);
      influence = new Float32Array(cols * rows);
      draw();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
      kick();
    };
    const onLeave = () => {
      pointer.active = false;
      kick();
    };

    if (interactive) {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [reduceMotion, spacing, radius, push, intensity, alpha]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
