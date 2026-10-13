"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Ruler, Brain, Check, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type FamilyId = "imaging" | "classical" | "ml";

interface CapabilityFamily {
  id: FamilyId;
  shortTitle: string;
  title: string;
  intro: string;
  items: string[];
  icon: LucideIcon;
}

interface Problem {
  id: string;
  label: string;
  families: FamilyId[];
  summary: string;
}

const families: CapabilityFamily[] = [
  {
    id: "imaging",
    shortTitle: "Imaging",
    title: "Image acquisition and imaging",
    intro: "Choosing and engineering the right imaging for the application.",
    items: [
      "2D area-scan imaging",
      "Line-scan imaging",
      "3D laser profiling",
      "Lighting, triggering and calibration",
    ],
    icon: Camera,
  },
  {
    id: "classical",
    shortTitle: "Classical vision",
    title: "Classical and rule-based vision",
    intro: "Precise, deterministic inspection where geometry and rules fit best.",
    items: [
      "Dimensional measurement and metrology",
      "Alignment and pattern matching",
      "Geometric gauging and tolerancing",
      "Rule-based defect and presence checks",
    ],
    icon: Ruler,
  },
  {
    id: "ml",
    shortTitle: "AI and deep learning",
    title: "AI and deep learning inspection",
    intro: "Custom AI models trained on examples of your product, to recognise defects, anomalies and features that rigid rules miss.",
    items: [
      "Object and defect detection (finds and locates problems in the image)",
      "Segmentation (maps exactly which pixels belong to a defect or feature)",
      "Anomaly detection (flags anything that deviates from normal product)",
      "Classification and grading",
      "OCR and text verification (reads date codes, lot numbers and print)",
      "Custom model development",
    ],
    icon: Brain,
  },
];

const problems: Problem[] = [
  {
    id: "defect",
    label: "Defect detection",
    families: ["classical", "ml"],
    summary:
      "Rule-based checks where defects are well defined, or trained models where variation is high.",
  },
  {
    id: "contamination",
    label: "Contamination and foreign object detection",
    families: ["imaging", "ml"],
    summary:
      "Imaging tuned for contrast and sensitivity, paired with anomaly or detection models.",
  },
  {
    id: "presence",
    label: "Presence, absence and component verification",
    families: ["imaging", "classical"],
    summary:
      "Reliable triggering and lighting, with deterministic presence and pattern checks.",
  },
  {
    id: "label",
    label: "Label and print verification",
    families: ["imaging", "ml"],
    summary:
      "OCR models for text, date codes and print quality, with imaging tuned for reliable reads on the line.",
  },
  {
    id: "dimensional",
    label: "Dimensional measurement and metrology",
    families: ["imaging", "classical"],
    summary:
      "Calibrated imaging with geometric measurement and gauging algorithms.",
  },
  {
    id: "fill",
    label: "Fill level estimation",
    families: ["imaging", "classical", "ml"],
    summary:
      "Calibrated imaging, classical measurement routines, and segmentation models such as SAM to define the product region and estimate fill level.",
  },
  {
    id: "surface",
    label: "Surface and structural damage assessment",
    families: ["classical", "ml"],
    summary:
      "Classical texture and shape rules, or segmentation models for subtle damage.",
  },
  {
    id: "orientation",
    label: "Orientation and placement checks",
    families: ["imaging", "classical"],
    summary:
      "Consistent acquisition and alignment algorithms to verify position and pose.",
  },
];

type Selection =
  | { type: "family"; id: FamilyId }
  | { type: "problem"; id: string };

interface Beam {
  key: string;
  d: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

function getProblem(id: string) {
  return problems.find((problem) => problem.id === id) ?? problems[0];
}

/**
 * Animated connector beams between the selected problem and the capability
 * layers it draws on (or the reverse when a layer is selected).
 * Adapted from the Magic UI "Animated Beam" idea (MIT), drawn with plain SVG.
 */
function useBeams(
  containerRef: React.RefObject<HTMLDivElement>,
  problemRefs: React.MutableRefObject<Map<string, HTMLElement>>,
  familyRefs: React.MutableRefObject<Map<FamilyId, HTMLElement>>,
  links: { problem: string; family: FamilyId }[]
) {
  const [beams, setBeams] = React.useState<Beam[]>([]);
  const linkKey = links.map((l) => `${l.problem}:${l.family}`).join("|");

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const box = container.getBoundingClientRect();
      const next: Beam[] = [];
      for (const link of links) {
        const from = problemRefs.current.get(link.problem);
        const to = familyRefs.current.get(link.family);
        if (!from || !to) continue;
        const a = from.getBoundingClientRect();
        const b = to.getBoundingClientRect();
        if (!a.width || !b.width) continue;
        const x1 = a.right - box.left;
        const y1 = a.top + a.height / 2 - box.top;
        const x2 = b.left - box.left;
        const y2 = b.top + Math.min(b.height / 2, 34) - box.top;
        const dx = (x2 - x1) * 0.55;
        next.push({
          key: `${link.problem}:${link.family}`,
          d: `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`,
          x1,
          y1,
          x2,
          y2,
        });
      }
      setBeams(next);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    familyRefs.current.forEach((el) => ro.observe(el));
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
    // linkKey captures the links array contents
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkKey, containerRef, problemRefs, familyRefs]);

  return beams;
}

export function CapabilitiesGrid() {
  const [selection, setSelection] = React.useState<Selection>({
    type: "family",
    id: "imaging",
  });
  const containerRef = React.useRef<HTMLDivElement>(null);
  const problemRefs = React.useRef(new Map<string, HTMLElement>());
  const familyRefs = React.useRef(new Map<FamilyId, HTMLElement>());

  const links = React.useMemo(() => {
    if (selection.type === "family") {
      return problems
        .filter((p) => p.families.includes(selection.id))
        .map((p) => ({ problem: p.id, family: selection.id }));
    }
    return getProblem(selection.id).families.map((family) => ({
      problem: selection.id,
      family,
    }));
  }, [selection]);

  const litFamilies = new Set(links.map((l) => l.family));
  const litProblems = new Set(links.map((l) => l.problem));
  const beams = useBeams(containerRef, problemRefs, familyRefs, links);
  const activeProblem = selection.type === "problem" ? getProblem(selection.id) : null;

  return (
    <section
      className="bay relative overflow-hidden py-20 sm:py-28"
      aria-labelledby="capabilities-heading"
      data-nav="dark"
    >
      <div className="dot-field pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2
            id="capabilities-heading"
            className="font-display text-4xl font-extrabold leading-none sm:text-6xl lg:col-span-6"
          >
            Capabilities
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-ink-soft lg:col-span-6 lg:justify-self-end">
            We combine AI and deep learning with classical vision and precision
            imaging, applying each where it performs best for your inspection
            problem.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative mt-14 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_7rem_minmax(0,1.15fr)] lg:gap-0"
        >
          {/* Beams (desktop) */}
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block"
            aria-hidden
          >
            {beams.map((beam, i) => (
              <g key={beam.key}>
                <path d={beam.d} fill="none" stroke="rgb(250 250 249 / 0.14)" strokeWidth={1.5} />
                <path
                  d={beam.d}
                  pathLength={1}
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeDasharray="0.16 1"
                  className="beam-pulse"
                  style={{ animationDelay: `${i * 0.18}s` }}
                />
                <circle cx={beam.x1} cy={beam.y1} r={3.5} fill="#14a49c" />
                <circle cx={beam.x2} cy={beam.y2} r={3.5} fill="#22d3ee" />
              </g>
            ))}
          </svg>

          {/* Problems */}
          <div className="order-2 lg:order-1">
            <h3 className="text-lg font-bold text-white">Problems we solve</h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Select a problem to see which capability layers we combine.
            </p>

            <ul className="mt-6 flex flex-wrap gap-2 lg:block lg:space-y-1.5" role="list" aria-label="Inspection problems">
              {problems.map((problem) => {
                const selected = selection.type === "problem" && selection.id === problem.id;
                const lit = litProblems.has(problem.id);
                return (
                  <li key={problem.id}>
                    <button
                      ref={(el) => {
                        if (el) problemRefs.current.set(problem.id, el);
                        else problemRefs.current.delete(problem.id);
                      }}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setSelection({ type: "problem", id: problem.id })}
                      className={cn(
                        "group flex w-full items-center justify-between gap-4 rounded-md border px-4 py-3 text-left text-sm font-medium transition-colors duration-300 sm:text-[15px]",
                        selected
                          ? "border-accent-logo bg-accent-logo text-ink"
                          : lit
                            ? "border-accent-logo/50 bg-white/[0.06] text-white"
                            : "border-white/10 text-white/60 hover:border-white/25 hover:text-white"
                      )}
                    >
                      {problem.label}
                      <span
                        className={cn(
                          "hidden h-2 w-2 shrink-0 rounded-full transition-colors lg:block",
                          selected ? "bg-ink" : lit ? "bg-accent-secondary" : "bg-white/20"
                        )}
                        aria-hidden
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            <AnimatePresence mode="wait" initial={false}>
              {activeProblem && (
                <motion.div
                  key={activeProblem.id}
                  className="mt-6 rounded-md border border-white/10 bg-white/[0.04] p-5"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  aria-live="polite"
                >
                  <p className="text-xs font-semibold text-accent-logo">Problem we solve</p>
                  <p className="mt-1 font-bold text-white">{activeProblem.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{activeProblem.summary}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden lg:order-2 lg:block" aria-hidden />

          {/* Capability layers */}
          <div className="order-1 space-y-3 lg:order-3" role="group" aria-label="Capability families">
            {families.map((family) => {
              const Icon = family.icon;
              const selected = selection.type === "family" && selection.id === family.id;
              const lit = litFamilies.has(family.id);
              return (
                <div
                  key={family.id}
                  ref={(el) => {
                    if (el) familyRefs.current.set(family.id, el);
                    else familyRefs.current.delete(family.id);
                  }}
                  className={cn(
                    "overflow-hidden rounded-md border transition-[border-color,background-color,opacity] duration-300",
                    selected
                      ? "border-accent-logo bg-white/[0.07]"
                      : lit
                        ? "border-accent-logo/60 bg-white/[0.05]"
                        : "border-white/10 bg-white/[0.02] opacity-60 hover:opacity-100"
                  )}
                >
                  <button
                    type="button"
                    aria-expanded={selected}
                    onClick={() => setSelection({ type: "family", id: family.id })}
                    className="flex w-full items-center gap-4 p-4 text-left sm:p-5"
                  >
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-md transition-colors",
                        lit ? "bg-accent-logo text-ink" : "bg-white/10 text-white"
                      )}
                      aria-hidden
                    >
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-bold text-white">{family.shortTitle}</span>
                      <span className="mt-0.5 block text-sm text-ink-soft">{family.title}</span>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {selected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="border-t border-white/10 px-4 pb-5 pt-4 sm:px-5">
                          <p className="text-sm leading-relaxed text-ink-soft">{family.intro}</p>
                          <p className="mt-4 text-xs font-semibold text-accent-logo">Techniques we apply</p>
                          <ul className="mt-2.5 space-y-2" role="list">
                            {family.items.map((item) => (
                              <li key={item} className="flex items-start gap-2.5 text-sm text-white/90">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-logo" strokeWidth={2.5} aria-hidden />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
