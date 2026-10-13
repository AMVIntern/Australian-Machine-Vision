"use client";

import { useState } from "react";
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

  return (
    <div className="border border-border bg-white p-4 sm:p-6">
      <div className="overflow-hidden">
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
        className="mt-6 grid grid-cols-5 border-y border-border"
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
                "group relative flex flex-col items-center gap-1.5 px-1 py-3 text-center transition-colors duration-200 sm:py-4",
                "border-l border-border first:border-l-0",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-primary",
                isActive ? "bg-background-secondary/70" : "hover:bg-background-secondary/40"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 transition-colors",
                  isActive ? "text-accent-primary" : "text-foreground-muted"
                )}
                strokeWidth={1.7}
                aria-hidden
              />
              <span
                className={cn(
                  "text-[11px] font-semibold sm:text-xs",
                  isActive ? "text-foreground" : "text-foreground-muted"
                )}
              >
                {stage.short}
              </span>
              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent-logo transition-transform duration-300",
                  isActive ? "scale-x-100" : "scale-x-0"
                )}
                aria-hidden
              />
            </button>
          );
        })}
      </div>

      <div className="mt-5 px-1 pb-2">
        <div className="flex items-baseline gap-3">
          <span className="annot text-accent-deep" aria-hidden>
            {active.number}
          </span>
          <h2 className="text-base font-bold text-foreground">{active.label}</h2>
        </div>
        <p
          key={active.id}
          className="mt-3 max-w-[68ch] text-[15px] leading-relaxed text-foreground-muted"
        >
          {active.explanation}
        </p>
      </div>
    </div>
  );
}
