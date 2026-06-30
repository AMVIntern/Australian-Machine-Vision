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
  accent: {
    border: string;
    bg: string;
    icon: string;
    pill: string;
  };
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
    accent: {
      border: "border-sky-400",
      bg: "bg-sky-50",
      icon: "text-sky-600",
      pill: "bg-sky-500/15 text-sky-800 ring-sky-400/40",
    },
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
    accent: {
      border: "border-amber-400",
      bg: "bg-amber-50",
      icon: "text-amber-700",
      pill: "bg-amber-500/15 text-amber-900 ring-amber-400/40",
    },
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
    accent: {
      border: "border-violet-400",
      bg: "bg-violet-50",
      icon: "text-violet-700",
      pill: "bg-violet-500/15 text-violet-900 ring-violet-400/40",
    },
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

const panelVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.25 },
};

function getFamily(id: FamilyId) {
  return families.find((family) => family.id === id) ?? families[0];
}

function getProblem(id: string) {
  return problems.find((problem) => problem.id === id) ?? problems[0];
}

function FamilySelector({
  selection,
  highlightedFamilies,
  onSelect,
}: {
  selection: Selection;
  highlightedFamilies: Set<FamilyId>;
  onSelect: (id: FamilyId) => void;
}) {
  return (
    <div
      className="grid grid-cols-1 gap-3 sm:grid-cols-3"
      role="tablist"
      aria-label="Capability families"
    >
      {families.map((family) => {
        const Icon = family.icon;
        const isSelected =
          selection.type === "family" && selection.id === family.id;
        const isHighlighted = highlightedFamilies.has(family.id);

        return (
          <button
            key={family.id}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onSelect(family.id)}
            className={cn(
              "group relative flex items-center gap-3 rounded-xl border-2 bg-white p-4 text-left shadow-soft transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2",
              isSelected
                ? cn("border-accent-primary shadow-soft-lg", family.accent.bg)
                : isHighlighted
                  ? cn("border-accent-primary/50", family.accent.bg)
                  : "border-border hover:border-accent-primary/30 hover:shadow-soft-lg"
            )}
          >
            <span
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white shadow-soft",
                family.accent.icon
              )}
              aria-hidden
            >
              <Icon className="h-5 w-5" strokeWidth={2} />
            </span>
            <span>
              <span className="block text-sm font-bold text-foreground">
                {family.shortTitle}
              </span>
              <span className="mt-0.5 block text-xs leading-snug text-foreground-muted">
                {family.title}
              </span>
            </span>
            {isHighlighted && !isSelected && (
              <span
                className="absolute right-3 top-3 h-2 w-2 rounded-full bg-accent-primary"
                aria-hidden
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

function FamilyPanel({ family }: { family: CapabilityFamily }) {
  const Icon = family.icon;
  const relatedProblems = problems.filter((problem) =>
    problem.families.includes(family.id)
  );

  return (
    <motion.div key={`family-${family.id}`} {...panelVariants}>
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
        <div className="lg:w-[55%]">
          <div className="flex items-start gap-4">
            <span
              className={cn(
                "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl shadow-soft",
                family.accent.bg,
                family.accent.icon
              )}
              aria-hidden
            >
              <Icon className="h-7 w-7" strokeWidth={2} />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent-primary">
                Capability layer
              </p>
              <h3 className="mt-1 text-xl font-bold text-foreground sm:text-2xl">
                {family.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted sm:text-base">
                {family.intro}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
            Techniques we apply
          </p>
          <ul className="mt-3 space-y-2.5">
            {family.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm text-foreground sm:text-base"
              >
                <span
                  className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/15 text-green-600"
                  aria-hidden
                >
                  <Check className="h-3 w-3" strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
          Applications
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {relatedProblems.map((problem) => (
            <span
              key={problem.id}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium ring-1 ring-inset",
                family.accent.pill
              )}
            >
              {problem.label}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProblemPanel({ problem }: { problem: Problem }) {
  const applicableFamilies = families.filter((family) =>
    problem.families.includes(family.id)
  );

  return (
    <motion.div key={`problem-${problem.id}`} {...panelVariants}>
      <p className="text-xs font-semibold uppercase tracking-wider text-accent-primary">
        Problem we solve
      </p>
      <h3 className="mt-1 text-xl font-bold text-foreground sm:text-2xl">
        {problem.label}
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground-muted sm:text-base">
        {problem.summary}
      </p>

      <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-foreground-muted">
        Capability layers involved
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {applicableFamilies.map((family) => {
          const Icon = family.icon;
          return (
            <div
              key={family.id}
              className={cn(
                "rounded-xl border-l-4 bg-white p-4 shadow-soft",
                family.accent.border,
                family.accent.bg
              )}
            >
              <div className="flex items-center gap-3">
                <span className={family.accent.icon} aria-hidden>
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <h4 className="text-sm font-bold text-foreground">
                  {family.title}
                </h4>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-foreground-muted">
                {family.intro}
              </p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export function CapabilitiesGrid() {
  const [selection, setSelection] = React.useState<Selection>({
    type: "family",
    id: "imaging",
  });

  const highlightedFamilies = React.useMemo(() => {
    if (selection.type === "family") {
      return new Set<FamilyId>([selection.id]);
    }
    const problem = getProblem(selection.id);
    return new Set(problem.families);
  }, [selection]);

  const handleFamilySelect = (id: FamilyId) => {
    setSelection({ type: "family", id });
  };

  const handleProblemSelect = (id: string) => {
    setSelection({ type: "problem", id });
  };

  return (
    <section
      className="border-y border-border bg-gradient-to-b from-background-secondary/40 to-white py-16 sm:py-20"
      aria-labelledby="capabilities-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="capabilities-heading"
          className="text-center text-3xl font-bold text-foreground sm:text-4xl"
        >
          Capabilities
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-foreground-muted">
          We combine AI and deep learning with classical vision and precision
          imaging, applying each where it performs best for your inspection
          problem.
        </p>

        <div className="mx-auto mt-12 max-w-5xl space-y-6">
          <FamilySelector
            selection={selection}
            highlightedFamilies={highlightedFamilies}
            onSelect={handleFamilySelect}
          />

          <div className="overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-soft-lg sm:p-8">
            <AnimatePresence mode="wait">
              {selection.type === "family" ? (
                <FamilyPanel family={getFamily(selection.id)} />
              ) : (
                <ProblemPanel problem={getProblem(selection.id)} />
              )}
            </AnimatePresence>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-border" aria-hidden />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-primary">
                Problems we solve
              </h3>
              <span className="h-px flex-1 bg-border" aria-hidden />
            </div>
            <p className="mt-2 text-center text-sm text-foreground-muted">
              Select a problem to see which capability layers we combine.
            </p>

            <div
              className="mt-5 flex flex-wrap justify-center gap-2 sm:gap-2.5"
              role="list"
              aria-label="Inspection problems"
            >
              {problems.map((problem) => {
                const isSelected =
                  selection.type === "problem" && selection.id === problem.id;

                return (
                  <button
                    key={problem.id}
                    type="button"
                    role="listitem"
                    onClick={() => handleProblemSelect(problem.id)}
                    className={cn(
                      "rounded-full border px-3.5 py-2 text-left text-xs font-medium transition-all sm:text-sm",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2",
                      isSelected
                        ? "border-accent-primary bg-accent-primary text-white shadow-soft"
                        : "border-border bg-white text-foreground hover:border-accent-primary/40 hover:bg-teal-50/50"
                    )}
                  >
                    {problem.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
