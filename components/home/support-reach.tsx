"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { RefreshCw, ScreenShare, Timer, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Map units match public/maps/reach-pacific.svg (Natural Earth 110m,
// equal-earth projection centred on 150 W).
const MAP_W = 1000;
const MAP_H = 825;
const SEAFORD: [number, number] = [234.9, 718.4];

// Great-circle paths from Seaford, projected the same way as the map.
const ARCS = [
  { id: "nz", d: "M234.9,718.4L267.2,727L299.4,733.2L331.6,736.9L363.4,738.1" },
  {
    id: "us",
    d: "M234.9,718.4L271.5,697.6L305.7,672.4L338,643.4L369.2,611.3L399.6,576.9L429.6,540.7L489.3,465.5L549.8,390.7L580.9,354.9L612.7,321.1L645.6,289.9L680,261.9L716.4,238L755.2,218.6",
  },
  {
    id: "ca",
    d: "M234.9,718.4L257.5,680.9L278.8,639.8L321.2,550.5L366.5,456.4L391,409.3L416.8,363.1L444.3,318.6L473.7,276.4L505.4,237.5L540,202.6L558.7,187.1L578.4,172.9L599.3,160.4L621.6,149.5L645.3,140.5L670.6,133.4L697.4,128.4L725.6,125.6",
  },
];

const LABELS: { name: string; at: [number, number]; side: "center" | "right" }[] = [
  { name: "Australia", at: [165.2, 638.5], side: "center" },
  { name: "New Zealand", at: [378, 738.1], side: "right" },
  { name: "United States", at: [755.2, 218.6], side: "center" },
  { name: "Canada", at: [725.6, 125.6], side: "center" },
];

interface SupportPoint {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const points: SupportPoint[] = [
  {
    id: "remote",
    title: "Remote support",
    description:
      "Live dashboards and remote access let our engineers see how your system is running, find the cause of a problem and fix it without waiting for a site visit.",
    icon: ScreenShare,
  },
  {
    id: "live-changes",
    title: "Changes on live systems",
    description:
      "When your product, packaging or quality standard changes, we update the system quickly, even while it is running in production.",
    icon: RefreshCw,
  },
  {
    id: "response",
    title: "Fast response",
    description:
      "If something is affecting production, it goes to the top of our list. Customers have especially praised us for this.",
    icon: Timer,
  },
];

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

function ReachMap() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const reduceMotion = useReducedMotion();
  const maskId = React.useId().replace(/:/g, "");

  return (
    <div ref={ref} className="relative aspect-[1000/825] w-full">
      {/* Edges fade into the section so the map has no hard frame */}
      <div className="absolute inset-0 [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent),linear-gradient(to_bottom,transparent,black_5%,black_95%,transparent)] [-webkit-mask-composite:source-in] [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent),linear-gradient(to_bottom,transparent,black_5%,black_95%,transparent)]">
        <Image
          src="/maps/reach-pacific.svg"
          alt=""
          fill
          unoptimized
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="select-none"
        />
      </div>

      {/* Support links from the Seaford base. Masks reveal the dotted lines
          so they can draw in without losing their dash pattern. */}
      <svg
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden
      >
        <defs>
          {ARCS.map((arc, i) => (
            <mask
              key={arc.id}
              id={`${maskId}-${arc.id}`}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width={MAP_W}
              height={MAP_H}
            >
              {/* The server renders the hidden start; reduced motion lands
                  on the drawn state through its animation target. */}
              <motion.path
                d={arc.d}
                fill="none"
                stroke="#fff"
                strokeWidth={8}
                strokeLinecap="round"
                initial={reduceMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: reduceMotion || inView ? 1 : 0 }}
                transition={{ duration: 1.5, delay: 0.25 + i * 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </mask>
          ))}
        </defs>
        {ARCS.map((arc) => (
          <path
            key={arc.id}
            d={arc.d}
            fill="none"
            stroke="#22d3ee"
            strokeOpacity={0.85}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeDasharray="0.5 5"
            vectorEffect="non-scaling-stroke"
            mask={`url(#${maskId}-${arc.id})`}
          />
        ))}
        <g transform={`translate(${SEAFORD[0]} ${SEAFORD[1]})`}>
          <circle r={9} fill="#1c1917" fillOpacity={0.55} stroke="#fafaf9" strokeWidth={1.25} />
          <polygon points="-4.5,-3 4.5,-3 0,4" fill="#fafaf9" />
        </g>
      </svg>

      <div className="absolute inset-0 hidden md:block" aria-hidden>
        {LABELS.map((label) => (
          <span
            key={label.name}
            className={cn(
              "absolute -translate-y-1/2 whitespace-nowrap rounded-sm bg-ink/85 px-2 py-1 text-xs font-semibold text-white",
              label.side === "center" ? "-translate-x-1/2" : ""
            )}
            style={{ left: pct(label.at[0], MAP_W), top: pct(label.at[1], MAP_H) }}
          >
            {label.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function Legend() {
  return (
    <ul className="mt-6 grid gap-4 text-[15px] sm:grid-cols-3 sm:gap-6" role="list">
      <li className="flex items-start gap-3">
        <span className="mt-1 h-3.5 w-5 shrink-0 rounded-[2px] bg-accent-logo" aria-hidden />
        <span className="leading-snug">
          <span className="block font-semibold text-white">In production</span>
          <span className="text-ink-soft">Multiple Australian states and New Zealand</span>
        </span>
      </li>
      <li className="flex items-start gap-3">
        <span
          className="mt-1 h-3.5 w-5 shrink-0 rounded-[2px] border border-accent-logo bg-[repeating-linear-gradient(-45deg,rgb(20_164_156/0.8)_0_1.5px,rgb(20_164_156/0.12)_1.5px_4.5px)]"
          aria-hidden
        />
        <span className="leading-snug">
          <span className="block font-semibold text-white">Pilot systems</span>
          <span className="text-ink-soft">United States and Canada</span>
        </span>
      </li>
      <li className="flex items-start gap-3">
        <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0" aria-hidden>
          <circle cx="10" cy="10" r="8" fill="none" stroke="#fafaf9" strokeWidth="1.25" />
          <polygon points="5.5,7 14.5,7 10,14" fill="#fafaf9" />
        </svg>
        <span className="leading-snug">
          <span className="block font-semibold text-white">Our base</span>
          <span className="text-ink-soft">Seaford, Victoria</span>
        </span>
      </li>
    </ul>
  );
}

export function SupportReach() {
  return (
    <section
      className="bay relative overflow-hidden py-20 sm:py-28"
      aria-labelledby="support-heading"
      data-nav="dark"
    >
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2
            id="support-heading"
            className="font-display text-4xl font-extrabold leading-none text-white sm:text-6xl lg:col-span-6"
          >
            Your line comes first
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-ink-soft lg:col-span-6 lg:justify-self-end">
            AMV systems run on production lines across Australia and in New
            Zealand, with pilot systems in the United States and Canada.
            Wherever yours runs, it gets the same close support.
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <ReachMap />
            <Legend />
          </div>

          <ul className="grid content-start border-t border-white/15 lg:col-span-5 lg:self-center" role="list">
            {points.map((point) => {
              const Icon = point.icon;
              return (
                <li key={point.id} className="flex gap-5 border-b border-white/10 py-7">
                  <Icon
                    className="mt-0.5 h-6 w-6 shrink-0 text-accent-logo"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <div>
                    <h3 className="font-wide text-lg font-bold text-white">{point.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">
                      {point.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
