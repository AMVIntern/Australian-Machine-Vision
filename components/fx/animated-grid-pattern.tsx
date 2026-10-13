"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

// Adapted from Magic UI "Animated Grid Pattern" (MIT)
// A fine grid with a handful of cells that softly light up and fade out.

interface AnimatedGridPatternProps {
  className?: string;
  cell?: number;
  numSquares?: number;
  maxOpacity?: number;
  duration?: number;
  stroke?: string;
  fill?: string;
}

interface Square {
  id: number;
  pos: [number, number];
}

export function AnimatedGridPattern({
  className,
  cell = 44,
  numSquares = 26,
  maxOpacity = 0.22,
  duration = 4,
  stroke = "rgba(255,255,255,0.14)",
  fill = "rgba(255,255,255,1)",
}: AnimatedGridPatternProps) {
  const id = React.useId().replace(/:/g, "");
  const containerRef = React.useRef<SVGSVGElement>(null);
  const reduceMotion = useReducedMotion();
  const [dims, setDims] = React.useState({ width: 0, height: 0 });
  const [squares, setSquares] = React.useState<Square[]>([]);

  const randomPos = React.useCallback(
    (): [number, number] => [
      Math.floor((Math.random() * dims.width) / cell),
      Math.floor((Math.random() * dims.height) / cell),
    ],
    [dims, cell]
  );

  React.useEffect(() => {
    if (!dims.width || !dims.height || reduceMotion) return;
    setSquares(
      Array.from({ length: numSquares }, (_, i) => ({ id: i, pos: randomPos() }))
    );
  }, [dims, numSquares, randomPos, reduceMotion]);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setDims({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const reposition = (squareId: number) => {
    setSquares((current) =>
      current.map((sq) => (sq.id === squareId ? { ...sq, pos: randomPos() } : sq))
    );
  };

  return (
    <svg
      ref={containerRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    >
      <defs>
        <pattern id={`grid-${id}`} width={cell} height={cell} patternUnits="userSpaceOnUse">
          <path d={`M.5 ${cell}V.5H${cell}`} fill="none" stroke={stroke} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#grid-${id})`} />
      <svg x={0} y={0} className="overflow-visible">
        {squares.map(({ pos: [x, y], id: squareId }, index) => (
          <motion.rect
            key={`${squareId}-${x}-${y}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{
              duration,
              repeat: 1,
              delay: index * 0.12,
              repeatType: "reverse",
            }}
            onAnimationComplete={() => reposition(squareId)}
            width={cell - 1}
            height={cell - 1}
            x={x * cell + 1}
            y={y * cell + 1}
            fill={fill}
          />
        ))}
      </svg>
    </svg>
  );
}
