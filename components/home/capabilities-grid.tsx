"use client";

import * as React from "react";
import { Camera, Ruler, Brain, type LucideIcon } from "lucide-react";
import { ScanHeading, Reveal } from "@/components/ui/reveal";
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
    intro:
      "Custom AI models trained on examples of your product, to recognise defects, anomalies and features that rigid rules miss.",
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

export function CapabilitiesGrid() {
  const [selection, setSelection] = React.useState<Selection>({
    type: "problem",
    id: "defect",
  });

  const selectedProblem =
    selection.type === "problem"
      ? problems.find((p) => p.id === selection.id) ?? null
      : null;
  const selectedFamily =
    selection.type === "family"
      ? families.find((f) => f.id === selection.id) ?? null
      : null;

  const activeFamilies = new Set<FamilyId>(
    selectedProblem ? selectedProblem.families : selectedFamily ? [selectedFamily.id] : []
  );

  return (
    <section
      className="relative bg-ink py-20 text-white sm:py-28"
      aria-labelledby="capabilities-heading"
      data-nav="dark"
    >
      <div className="ink-dots pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <ScanHeading
            as="h2"
            id="capabilities-heading"
            className="font-display text-4xl font-bold leading-none sm:text-5xl lg:col-span-5"
          >
            Capabilities
          </ScanHeading>
          <Reveal className="lg:col-span-7 lg:justify-self-end">
            <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
              We combine AI and deep learning with classical vision and
              precision imaging, applying each where it performs best for your
              inspection problem.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <p className="annot max-w-xl text-ink-soft">
            Select a problem to see which capability layers we combine, or a
            layer to see what is in it.
          </p>

          {/* routing matrix */}
          <div className="mt-6 overflow-x-auto pb-1">
            <div className="min-w-[760px] border border-ink-line">
              {/* family header row */}
              <div className="grid grid-cols-[minmax(280px,1.4fr)_repeat(3,1fr)] border-b border-ink-line">
                <div className="flex items-end px-5 py-4">
                  <span className="annot text-ink-soft">Problems we solve</span>
                </div>
                {families.map((family) => {
                  const Icon = family.icon;
                  const isSelected = selectedFamily?.id === family.id;
                  const isActive = activeFamilies.has(family.id);
                  return (
                    <button
                      key={family.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelection({ type: "family", id: family.id })}
                      className={cn(
                        "relative flex flex-col items-start gap-2 border-l border-ink-line px-5 py-4 text-left transition-colors",
                        "hover:bg-ink-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-logo",
                        isSelected && "bg-ink-raised"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5 transition-colors",
                          isActive ? "text-accent-logo" : "text-ink-soft"
                        )}
                        strokeWidth={1.7}
                        aria-hidden
                      />
                      <span
                        className={cn(
                          "text-sm font-semibold leading-tight transition-colors",
                          isActive ? "text-white" : "text-ink-soft"
                        )}
                      >
                        {family.shortTitle}
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

              {/* problem rows */}
              {problems.map((problem) => {
                const isSelected = selectedProblem?.id === problem.id;
                return (
                  <div
                    key={problem.id}
                    className={cn(
                      "grid grid-cols-[minmax(280px,1.4fr)_repeat(3,1fr)] border-b border-ink-line last:border-b-0 transition-colors",
                      isSelected && "bg-ink-raised"
                    )}
                  >
                    <button
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelection({ type: "problem", id: problem.id })}
                      className={cn(
                        "flex items-center gap-3 px-5 py-3.5 text-left text-[15px] transition-colors",
                        "hover:bg-ink-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-logo",
                        isSelected ? "font-semibold text-white" : "text-ink-soft hover:text-white"
                      )}
                    >
                      <span
                        className={cn(
                          "h-0 w-0 shrink-0 border-y-[4px] border-l-[6px] border-y-transparent transition-colors",
                          isSelected ? "border-l-accent-logo" : "border-l-ink-line"
                        )}
                        aria-hidden
                      />
                      {problem.label}
                    </button>
                    {families.map((family) => {
                      const connected = problem.families.includes(family.id);
                      const lit =
                        connected &&
                        (isSelected || selectedFamily?.id === family.id);
                      return (
                        <div
                          key={family.id}
                          className={cn(
                            "flex items-center justify-center border-l border-ink-line transition-colors",
                            selectedFamily?.id === family.id && "bg-ink-raised"
                          )}
                          aria-hidden
                        >
                          <span
                            className={cn(
                              "rounded-full transition-all duration-300",
                              connected
                                ? lit
                                  ? "h-2.5 w-2.5 bg-accent-logo shadow-[0_0_10px_rgba(20,164,156,0.6)]"
                                  : "h-1.5 w-1.5 bg-ink-soft/70"
                                : "h-1 w-1 bg-ink-line"
                            )}
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {/* readout panel */}
          <div
            className="mt-6 border-l-2 border-accent-logo bg-ink-raised px-6 py-6 sm:px-8"
            aria-live="polite"
          >
            {selectedProblem ? (
              <div className="grid gap-4 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <p className="annot text-accent-logo">Problem</p>
                  <h3 className="font-display mt-2 text-xl font-bold text-white">
                    {selectedProblem.label}
                  </h3>
                </div>
                <div className="lg:col-span-7">
                  <p className="max-w-[58ch] leading-relaxed text-ink-soft">
                    {selectedProblem.summary}
                  </p>
                  <p className="mt-3 text-sm text-white/80">
                    {selectedProblem.families
                      .map((id) => families.find((f) => f.id === id)?.shortTitle)
                      .filter(Boolean)
                      .join(" + ")}
                  </p>
                </div>
              </div>
            ) : selectedFamily ? (
              <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <p className="annot text-accent-logo">Capability layer</p>
                  <h3 className="font-display mt-2 text-xl font-bold text-white">
                    {selectedFamily.title}
                  </h3>
                  <p className="mt-3 max-w-[58ch] leading-relaxed text-ink-soft">
                    {selectedFamily.intro}
                  </p>
                </div>
                <ul className="space-y-2.5 lg:col-span-7" role="list">
                  {selectedFamily.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] text-white/85">
                      <span className="annot mt-0.5 shrink-0 text-accent-logo" aria-hidden>
                        +
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
