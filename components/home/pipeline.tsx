"use client";

import * as React from "react";
import {
  FlaskConical,
  Code2,
  Plug,
  ClipboardCheck,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ScanHeading, Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

interface PipelineStep {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

const pipelineSteps: PipelineStep[] = [
  {
    id: "feasibility",
    number: 1,
    title: "Feasibility and POC",
    description:
      "Assess the problem, trial imaging and algorithm options, and prove it on real product.",
    icon: FlaskConical,
  },
  {
    id: "development",
    number: 2,
    title: "Custom development",
    description:
      "Build the production system: imaging, vision and ML pipeline, software and integration, tailored to your line.",
    icon: Code2,
  },
  {
    id: "deployment",
    number: 3,
    title: "Deployment and commissioning",
    description:
      "Install on-site, integrate with line controls, calibrate and tune against live production.",
    icon: Plug,
  },
  {
    id: "validation",
    number: 4,
    title: "Validation",
    description:
      "Establish ground truth, quantify accuracy, and document performance and limitations.",
    icon: ClipboardCheck,
  },
  {
    id: "support",
    number: 5,
    title: "Support and refinement",
    description:
      "Train operators, provide ongoing support, and refine models and thresholds in service.",
    icon: LifeBuoy,
  },
];

function StepsList({
  ghost,
  className,
}: {
  ghost?: boolean;
  className?: string;
}) {
  return (
    <ol className={cn("divide-y divide-border", className)} role="list" aria-hidden={ghost || undefined}>
      {pipelineSteps.map((step) => {
        const Icon = step.icon;
        return (
          <li
            key={step.id}
            className="grid items-start gap-3 py-6 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-7"
          >
            <span
              className={cn(
                "annot lg:col-span-1",
                ghost ? "text-foreground/20" : "text-accent-deep"
              )}
              aria-hidden
            >
              {String(step.number).padStart(2, "0")}
            </span>
            <span
              className={cn("hidden lg:col-span-1 lg:flex", ghost ? "text-foreground/15" : "text-accent-primary")}
              aria-hidden
            >
              <Icon className="h-6 w-6" strokeWidth={1.6} />
            </span>
            <h3
              className={cn(
                "font-display text-2xl font-bold leading-tight lg:col-span-4",
                ghost ? "text-foreground/20" : "text-foreground"
              )}
            >
              {step.title}
            </h3>
            <p
              className={cn(
                "leading-relaxed lg:col-span-6",
                ghost ? "text-foreground/15" : "text-foreground-muted"
              )}
            >
              {step.description}
            </p>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * The approach section scans itself: pinned while a sheet of light passes
 * down the five steps, developing each one from a ghost outline into full
 * ink, with a live y-position readout riding the line.
 */
export function Pipeline() {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const scanAreaRef = React.useRef<HTMLDivElement | null>(null);
  const devRef = React.useRef<HTMLDivElement | null>(null);
  const lineRef = React.useRef<HTMLDivElement | null>(null);
  const readoutRef = React.useRef<HTMLSpanElement | null>(null);

  React.useEffect(() => {
    const section = sectionRef.current;
    const scanArea = scanAreaRef.current;
    const dev = devRef.current;
    const line = lineRef.current;
    const readout = readoutRef.current;
    if (!section || !scanArea || !dev || !line) return;

    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.set(line, { opacity: 1 });
        const st = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=130%",
          pin: true,
          scrub: 0.4,
          onUpdate: (self) => {
            const p = self.progress;
            const h = scanArea.offsetHeight;
            dev.style.clipPath = `inset(0 0 ${(1 - p) * 100}% 0)`;
            line.style.transform = `translateY(${p * h}px)`;
            if (readout) {
              readout.textContent = `y ${String(Math.round(p * h)).padStart(4, "0")} px`;
            }
          },
        });
        return () => st.kill();
      }
    );
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="border-y border-border bg-background-secondary/50"
      aria-labelledby="pipeline-heading"
    >
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <ScanHeading
            as="h2"
            id="pipeline-heading"
            className="font-display text-4xl font-bold leading-none text-foreground sm:text-5xl lg:col-span-5"
          >
            Our Approach
          </ScanHeading>
          <Reveal className="lg:col-span-7 lg:justify-self-end">
            <p className="max-w-xl text-lg leading-relaxed text-foreground-muted">
              We take responsibility for the whole journey from problem to
              production system, and can enter at whatever stage suits you.
            </p>
          </Reveal>
        </div>

        <div ref={scanAreaRef} className="relative mt-12 border-t border-foreground/70">
          {/* undeveloped layer */}
          <div className="absolute inset-0" aria-hidden>
            <StepsList ghost />
          </div>
          {/* developed layer, revealed by the scan */}
          <div ref={devRef} className="relative bg-transparent">
            <StepsList />
          </div>
          {/* the scan line and its readout; shown only while pinned on desktop */}
          <div
            ref={lineRef}
            className="pointer-events-none absolute inset-x-0 top-0 opacity-0"
            aria-hidden
          >
            <div className="relative h-px bg-accent-secondary shadow-[0_0_14px_rgba(34,211,238,0.65)]">
              <span
                ref={readoutRef}
                className="annot absolute -top-2.5 right-0 bg-background-secondary px-2 text-accent-deep"
              >
                y 0000 px
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
