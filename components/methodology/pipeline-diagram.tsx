"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Camera, Cpu, ScanSearch, CheckCircle2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const STAGES = [
  {
    id: "camera",
    number: "01",
    icon: Camera,
    label: "Camera and Lighting",
    short: "Capture",
    explanation:
      "Every system starts with the right camera, lens and lighting for your product and line speed. Lighting angle, wavelength and intensity are often what make a defect visible rather than missed. We design the imaging setup as part of the system, not an afterthought.",
  },
  {
    id: "preprocess",
    number: "02",
    icon: Cpu,
    label: "Pre-processing",
    short: "Prepare",
    explanation:
      "Raw images are calibrated, normalised and enhanced before analysis. This corrects lens distortion, lighting variation and camera noise, so the analysis works on consistent image data even when your production environment shifts.",
  },
  {
    id: "analysis",
    number: "03",
    icon: ScanSearch,
    label: "Analysis",
    short: "Inspect",
    explanation:
      "Where the inspection happens. HALCON handles precise, rule-based measurement. Custom AI models handle variable defects that fixed rules miss. Classical vision runs fast, deterministic checks. In most systems, two or all three run in parallel within a single pass.",
  },
  {
    id: "decision",
    number: "04",
    icon: CheckCircle2,
    label: "Inspection Decision",
    short: "Decide",
    explanation:
      "Results are combined into a single outcome: pass, fail or a quality grade, made at full line speed. What counts as a pass is configured to your quality specification, not a generic threshold.",
  },
  {
    id: "action",
    number: "05",
    icon: Zap,
    label: "Line Action",
    short: "Action",
    explanation:
      "The system acts on the decision: reject, divert, alert the operator, or log the result. Every result is logged with a timestamp and image for traceability, feeding the cloud dashboard for remote monitoring.",
  },
];

export function PipelineDiagram() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = STAGES[activeIndex];
  const reduceMotion = useReducedMotion();

  return (
    <div className="rounded-2xl border border-border bg-white p-4 shadow-soft sm:p-6">
      {/* Image */}
      <div className="overflow-hidden rounded-xl">
        <Image
          src="/methodology.png"
          alt="AMV inspection pipeline: Camera and Lighting, Pre-processing, Analysis, Inspection Decision, Line Action"
          width={1536}
          height={480}
          className="h-auto w-full"
          priority
        />
      </div>

      {/* Stage tabs */}
      <div
        className="mt-5 grid grid-cols-5 gap-1.5 sm:gap-2"
        role="tablist"
        aria-label="Inspection pipeline stages"
      >
        {STAGES.map((stage, i) => {
          const Icon = stage.icon;
          const isActive = i === activeIndex;
          return (
            <button
              key={stage.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "group relative flex flex-col items-center gap-1.5 rounded-xl border px-1 py-2.5 text-center transition-colors duration-200 sm:py-3",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2",
                isActive
                  ? "border-transparent"
                  : "border-border bg-white hover:border-teal-300 hover:bg-teal-50/40"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="stage-highlight"
                  className="absolute -inset-px rounded-xl border border-teal-500 bg-teal-50 shadow-soft"
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 380, damping: 34 }
                  }
                  aria-hidden
                />
              )}
              <span
                className={cn(
                  "relative flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-300 sm:h-9 sm:w-9",
                  isActive
                    ? "bg-teal-600 text-white"
                    : "bg-teal-50 text-teal-600 group-hover:bg-teal-100"
                )}
              >
                <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
              </span>
              <span
                className={cn(
                  "relative text-[10px] font-bold uppercase tracking-wide sm:text-xs",
                  isActive ? "text-teal-700" : "text-foreground-muted"
                )}
              >
                {stage.short}
              </span>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      <div className="mt-4 overflow-hidden rounded-xl bg-background-secondary/60 p-5" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={reduceMotion ? false : { opacity: 0, y: 6, filter: "blur(3px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -4, filter: "blur(3px)" }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-600 text-[10px] font-bold text-white">
                {active.number}
              </span>
              <h3 className="text-base font-bold text-foreground">{active.label}</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
              {active.explanation}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
