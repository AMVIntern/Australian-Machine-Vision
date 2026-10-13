"use client";

import * as React from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ActionPictogram,
  AnalysisPictogram,
  CapturePictogram,
  ClassicalGlyph,
  DecidePictogram,
  DeepLearningGlyph,
  HalconGlyph,
  PreparePictogram,
} from "@/components/methodology/pipeline-pictograms";

const STAGES = [
  {
    id: "camera",
    number: "01",
    label: "Camera and Lighting",
    short: "Capture",
    pictogram: CapturePictogram,
    explanation:
      "Every system starts with the right camera, lens and lighting for your product and line speed. Lighting angle, wavelength and intensity are often what make a defect visible rather than missed. We design the imaging setup as part of the system, not an afterthought.",
  },
  {
    id: "preprocess",
    number: "02",
    label: "Pre-processing",
    short: "Prepare",
    pictogram: PreparePictogram,
    explanation:
      "Raw images are calibrated, normalised and enhanced before analysis. This corrects lens distortion, lighting variation and camera noise, so the analysis works on consistent image data even when your production environment shifts.",
  },
  {
    id: "analysis",
    number: "03",
    label: "Analysis",
    short: "Inspect",
    pictogram: AnalysisPictogram,
    explanation:
      "Where the inspection happens. HALCON handles precise, rule-based measurement. Custom AI models handle variable defects that fixed rules miss. Classical vision runs fast, deterministic checks. In most systems, two or all three run in parallel within a single pass.",
  },
  {
    id: "decision",
    number: "04",
    label: "Inspection Decision",
    short: "Decide",
    pictogram: DecidePictogram,
    explanation:
      "Results are combined into a single outcome: pass, fail or a quality grade, made at full line speed. What counts as a pass is configured to your quality specification, not a generic threshold.",
  },
  {
    id: "action",
    number: "05",
    label: "Line Action",
    short: "Action",
    pictogram: ActionPictogram,
    explanation:
      "The system acts on the decision: reject, divert, alert the operator, or log the result. Every result is logged with a timestamp and image for traceability, feeding the cloud dashboard for remote monitoring.",
  },
];

const LANES = [
  { id: "halcon", name: "HALCON", Glyph: HalconGlyph },
  { id: "deep-learning", name: "AI / Deep Learning", Glyph: DeepLearningGlyph },
  { id: "classical", name: "Classical Vision", Glyph: ClassicalGlyph },
];

// Wide layout geometry, in px: station boxes are 144 tall (signal at 72) and
// the analysis lanes sit at 26, 72 and 118. Connectors are 48 wide.
const STRAIGHT = ["M0,72H48"];
const SPLIT = [
  "M0,72H48",
  "M0,72H16Q24,72 24,64V34Q24,26 32,26H48",
  "M0,72H16Q24,72 24,80V110Q24,118 32,118H48",
];
const MERGE = [
  "M0,72H48",
  "M0,26H16Q24,26 24,34V64Q24,72 32,72H48",
  "M0,118H16Q24,118 24,110V80Q24,72 32,72H48",
];
const CONNECTORS = [
  { paths: STRAIGHT, heads: [72] },
  { paths: SPLIT, heads: [26, 72, 118] },
  { paths: MERGE, heads: [72] },
  { paths: STRAIGHT, heads: [72] },
];

// One pass of the signal, in seconds: when each connector pulse leaves and
// when each station lights as it arrives. Analysis holds briefly to "process".
const PULSE_AT = [0.12, 0.62, 1.38, 1.9];
const ARRIVE_AT = [0, 0.54, 1.04, 1.8, 2.32];

type Run = { id: number; to: number } | null;

function Connector({ index, run }: { index: number; run: Run }) {
  const { paths, heads } = CONNECTORS[index];
  return (
    <div className="pt-10" aria-hidden>
      <svg viewBox="0 0 48 144" className="h-36 w-12 overflow-visible" fill="none">
        {paths.map((d) => (
          <path key={d} d={d} stroke="#fafaf9" strokeOpacity={0.28} />
        ))}
        {heads.map((y) => (
          <polygon key={y} points={`41,${y - 4} 48,${y} 41,${y + 4}`} fill="#fafaf9" fillOpacity={0.5} />
        ))}
        {run &&
          index < run.to &&
          paths.map((d, j) => (
            <path
              key={`${run.id}-${j}`}
              d={d}
              pathLength={1}
              stroke="#22d3ee"
              strokeWidth={2}
              // Butt caps and a gap longer than the path: a parked dash at
              // either end has zero length, so it draws nothing.
              strokeLinecap="butt"
              strokeDasharray="0.2 2"
              className="signal-pulse"
              style={{ animationDelay: `${PULSE_AT[index]}s` }}
            />
          ))}
      </svg>
    </div>
  );
}

function Flash({ index, run }: { index: number; run: Run }) {
  if (!run || index > run.to) return null;
  return (
    <span
      key={run.id}
      className="station-flash pointer-events-none absolute -inset-px rounded-md border border-accent-secondary"
      style={{ animationDelay: `${ARRIVE_AT[index]}s` }}
      aria-hidden
    />
  );
}

export function PipelineDiagram() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [run, setRun] = React.useState<Run>(null);
  const reduceMotion = useReducedMotion();
  const schematicRef = React.useRef<HTMLDivElement>(null);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(schematicRef, { once: true, amount: 0.6 });
  const active = STAGES[activeIndex];

  // One full pass when the diagram first comes into view.
  React.useEffect(() => {
    if (inView && !reduceMotion) setRun((r) => r ?? { id: 1, to: STAGES.length - 1 });
  }, [inView, reduceMotion]);

  const select = (i: number, focus = false) => {
    setActiveIndex(i);
    if (focus) tabRefs.current[i]?.focus();
    // The signal runs from the camera to the chosen stage.
    if (!reduceMotion) setRun((r) => ({ id: (r?.id ?? 0) + 1, to: i }));
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const last = STAGES.length - 1;
    const next =
      e.key === "ArrowRight" ? (i === last ? 0 : i + 1)
      : e.key === "ArrowLeft" ? (i === 0 ? last : i - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    select(next, true);
  };

  return (
    <div className="chamfer-lg relative overflow-hidden bg-ink p-5 text-white sm:p-8 lg:p-10">
      <div className="dot-field pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <h2 className="sr-only">Inspection pipeline</h2>

      {/* Wide layout: the stations are the tabs */}
      <div
        ref={schematicRef}
        className="relative hidden grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)_3rem_minmax(0,1.6fr)_3rem_minmax(0,1fr)_3rem_minmax(0,1fr)] lg:grid"
        role="tablist"
        aria-label="Inspection pipeline stages"
      >
        {STAGES.map((stage, i) => {
          const isActive = i === activeIndex;
          const Pictogram = stage.pictogram;
          return (
            <React.Fragment key={stage.id}>
              <button
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`stage-tab-${stage.id}`}
                aria-selected={isActive}
                aria-controls="stage-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => select(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="group flex min-w-0 flex-col text-left"
              >
                <span className="flex h-7 items-center gap-2 text-sm">
                  <span className="font-display tabular font-extrabold text-accent-logo">
                    {stage.number}
                  </span>
                  <span className="font-medium text-ink-soft">{stage.short}</span>
                </span>

                <span
                  className={cn(
                    "relative mt-3 flex h-36 w-full rounded-md border transition-colors duration-300",
                    isActive
                      ? "border-accent-logo bg-accent-logo/[0.08]"
                      : "border-white/15 bg-white/[0.025] group-hover:border-white/35"
                  )}
                >
                  {stage.id === "analysis" ? (
                    <span className="flex w-full flex-col justify-between p-1.5">
                      {LANES.map(({ id, name, Glyph }) => (
                        <span
                          key={id}
                          className={cn(
                            "flex h-10 items-center gap-2.5 rounded-sm border bg-ink/70 px-3 transition-colors duration-300",
                            isActive ? "border-accent-logo/40" : "border-white/10"
                          )}
                        >
                          <Glyph className="h-4 w-4 shrink-0 text-accent-logo" />
                          <span className="truncate text-[13px] font-semibold text-white">{name}</span>
                        </span>
                      ))}
                    </span>
                  ) : (
                    <Pictogram className="m-auto h-[6.25rem] w-[85%] max-w-[8.5rem]" />
                  )}
                  <Flash index={i} run={run} />
                </span>

                <span
                  className={cn(
                    "font-wide mt-4 block text-[15px] font-bold leading-tight transition-colors",
                    isActive ? "text-white" : "text-white/80 group-hover:text-white"
                  )}
                >
                  {stage.label}
                </span>
              </button>
              {i < CONNECTORS.length && <Connector index={i} run={run} />}
            </React.Fragment>
          );
        })}
      </div>

      <div
        id="stage-panel"
        role="tabpanel"
        aria-labelledby={`stage-tab-${active.id}`}
        className="relative mt-9 hidden min-h-[7rem] border-t border-white/10 pt-7 lg:block"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="grid grid-cols-[12rem_1fr] gap-6"
          >
            <div>
              <span className="font-display tabular text-3xl font-extrabold text-accent-logo">
                {active.number}
              </span>
              <h3 className="mt-1 font-bold text-white">{active.label}</h3>
            </div>
            <p className="max-w-2xl leading-relaxed text-ink-soft">{active.explanation}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Narrow layout: every stage and its explanation, top to bottom */}
      <ol className="relative lg:hidden">
        {STAGES.map((stage, i) => {
          const Pictogram = stage.pictogram;
          const last = i === STAGES.length - 1;
          return (
            <li
              key={stage.id}
              className={cn(
                "relative grid grid-cols-[4.5rem_minmax(0,1fr)] gap-4 sm:grid-cols-[5.5rem_minmax(0,1fr)] sm:gap-6",
                !last && "pb-9"
              )}
            >
              <div className="relative">
                <span className="flex h-[3.75rem] w-[4.5rem] items-center justify-center rounded-md border border-white/15 bg-white/[0.025] sm:h-[4.5rem] sm:w-[5.5rem]">
                  <Pictogram className="h-[3.25rem] w-16 sm:h-16 sm:w-20" />
                </span>
                {!last && (
                  <span
                    className="absolute bottom-0 left-1/2 top-[3.75rem] w-px -translate-x-1/2 bg-white/25 sm:top-[4.5rem]"
                    aria-hidden
                  >
                    <span className="absolute -bottom-px left-1/2 h-0 w-0 -translate-x-1/2 border-x-[4px] border-t-[6px] border-x-transparent border-t-white/50" />
                  </span>
                )}
              </div>
              <div>
                <p className="flex items-center gap-2 text-sm">
                  <span className="font-display tabular font-extrabold text-accent-logo">
                    {stage.number}
                  </span>
                  <span className="font-medium text-ink-soft">{stage.short}</span>
                </p>
                <h3 className="font-wide mt-1 text-lg font-bold leading-tight text-white">
                  {stage.label}
                </h3>
                {stage.id === "analysis" && (
                  <ul className="mt-3 flex flex-wrap gap-2" role="list">
                    {LANES.map(({ id, name, Glyph }) => (
                      <li
                        key={id}
                        className="flex items-center gap-2 rounded-sm border border-white/15 bg-white/[0.04] px-2.5 py-1 text-[13px] font-semibold text-white"
                      >
                        <Glyph className="h-3.5 w-3.5 text-accent-logo" />
                        {name}
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{stage.explanation}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
