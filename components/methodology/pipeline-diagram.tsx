"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
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

  return (
    <div>
      <div className="overflow-hidden rounded-md border border-border bg-white p-3 sm:p-5">
        <Image
          src="/methodology.png"
          alt="AMV inspection pipeline: Camera and Lighting, Pre-processing, Analysis, Inspection Decision, Line Action"
          width={1536}
          height={480}
          className="h-auto w-full"
          priority
        />
      </div>

      <div
        className="relative mt-4 grid grid-cols-5 border-b border-border"
        role="tablist"
        aria-label="Inspection pipeline stages"
      >
        {STAGES.map((stage, i) => {
          const Icon = stage.icon;
          const isActive = i === activeIndex;
          return (
            <button
              key={stage.id}
              type="button"
              role="tab"
              id={`stage-tab-${stage.id}`}
              aria-selected={isActive}
              aria-controls="stage-panel"
              onClick={() => setActiveIndex(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") setActiveIndex((i + 1) % STAGES.length);
                if (e.key === "ArrowLeft") setActiveIndex((i - 1 + STAGES.length) % STAGES.length);
              }}
              className={cn(
                "group relative flex flex-col items-center gap-2 px-1 py-4 text-center transition-colors",
                isActive ? "text-foreground" : "text-foreground-muted hover:text-foreground"
              )}
            >
              <Icon
                className={cn("h-5 w-5 transition-colors", isActive ? "text-accent-primary" : "")}
                strokeWidth={1.75}
                aria-hidden
              />
              <span className="text-xs font-semibold sm:text-sm">{stage.short}</span>
              {isActive && (
                <motion.span
                  layoutId="stage-indicator"
                  className="absolute inset-x-2 -bottom-px h-0.5 bg-accent-primary"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  aria-hidden
                />
              )}
            </button>
          );
        })}
      </div>

      <div
        id="stage-panel"
        role="tabpanel"
        aria-labelledby={`stage-tab-${active.id}`}
        className="mt-6 min-h-[9rem]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22 }}
            className="grid gap-4 sm:grid-cols-[10rem_1fr]"
          >
            <div className="flex items-baseline gap-3 sm:block">
              <span className="font-display tabular text-3xl font-extrabold text-accent-primary">
                {active.number}
              </span>
              <h2 className="font-bold text-foreground sm:mt-1">{active.label}</h2>
            </div>
            <p className="max-w-2xl leading-relaxed text-foreground-muted">{active.explanation}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
