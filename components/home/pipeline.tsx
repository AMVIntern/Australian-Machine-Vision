"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FlaskConical,
  Code2,
  Plug,
  ClipboardCheck,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface PipelineStep {
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
      "Assess the problem, trial sensing and algorithm options, and prove it on real product.",
    icon: FlaskConical,
  },
  {
    id: "development",
    number: 2,
    title: "Custom development",
    description:
      "Build the production system: sensing, vision and ML pipeline, software and integration, tailored to your line.",
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

type StepStatus = "upcoming" | "active" | "completed";

function getStepStatus(index: number, activeIndex: number): StepStatus {
  if (index < activeIndex) return "completed";
  if (index === activeIndex) return "active";
  return "upcoming";
}

function useActiveStepIndex(
  stepRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const updateActiveStep = () => {
      const viewportCenter = window.innerHeight * 0.42;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      stepRefs.current.forEach((element, index) => {
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const stepCenter = rect.top + rect.height / 2;
        const distance = Math.abs(stepCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    updateActiveStep();
    window.addEventListener("scroll", updateActiveStep, { passive: true });
    window.addEventListener("resize", updateActiveStep);

    return () => {
      window.removeEventListener("scroll", updateActiveStep);
      window.removeEventListener("resize", updateActiveStep);
    };
  }, [stepRefs]);

  return activeIndex;
}

interface TimelineStepProps {
  step: PipelineStep;
  status: StepStatus;
  isLast: boolean;
  reduceMotion: boolean;
}

const TimelineStep = React.forwardRef<HTMLDivElement, TimelineStepProps>(
  function TimelineStep({ step, status, isLast, reduceMotion }, ref) {
    const Icon = step.icon;
    const isActive = status === "active";
    const isCompleted = status === "completed";

    return (
      <div
        ref={ref}
        className={cn("relative flex gap-5 sm:gap-8", !isLast && "pb-10 sm:pb-12")}
      >
        {/* Node on the timeline */}
        <div className="relative z-10 flex shrink-0 flex-col items-center">
          <motion.span
            layout={!reduceMotion}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white shadow-soft transition-colors duration-300 sm:h-11 sm:w-11",
              isActive &&
                "border-accent-primary bg-accent-primary text-white shadow-soft-lg ring-4 ring-accent-primary/20",
              isCompleted && "border-accent-primary bg-accent-primary text-white",
              status === "upcoming" && "border-border text-foreground-muted"
            )}
            aria-hidden
          >
            {isCompleted || isActive ? (
              <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={2.25} />
            ) : (
              <span className="text-xs font-bold sm:text-sm">{step.number}</span>
            )}
          </motion.span>
        </div>

        {/* Step card */}
        <motion.article
          initial={reduceMotion ? false : { opacity: 0, x: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className={cn(
            "min-w-0 flex-1 rounded-2xl border p-5 transition-all duration-300 sm:p-6",
            isActive
              ? "border-accent-primary/40 bg-white shadow-soft-lg"
              : isCompleted
                ? "border-border/80 bg-white shadow-soft"
                : "border-border/60 bg-white/70 shadow-soft opacity-80"
          )}
        >
          <span
            className={cn(
              "text-xs font-semibold uppercase tracking-wider",
              isActive || isCompleted ? "text-accent-primary" : "text-foreground-muted"
            )}
          >
            Step {step.number}
          </span>
          <h3
            className={cn(
              "mt-1.5 text-lg font-bold sm:text-xl",
              isActive ? "text-foreground" : "text-foreground/90"
            )}
          >
            {step.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted sm:text-base">
            {step.description}
          </p>
        </motion.article>
      </div>
    );
  }
);

export function Pipeline() {
  const reduceMotion = useReducedMotion();
  const timelineRef = React.useRef<HTMLDivElement>(null);
  const stepRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const activeIndex = useActiveStepIndex(stepRefs);
  const [progressHeight, setProgressHeight] = React.useState(0);

  React.useEffect(() => {
    const updateProgress = () => {
      const timeline = timelineRef.current;
      const activeStep = stepRefs.current[activeIndex];
      if (!timeline || !activeStep) return;

      const timelineRect = timeline.getBoundingClientRect();
      const activeRect = activeStep.getBoundingClientRect();
      const nodeCenter = activeRect.top - timelineRect.top + 21;

      setProgressHeight(Math.max(0, nodeCenter));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [activeIndex]);

  return (
    <section
      className="bg-white/80 backdrop-blur-sm py-16 sm:py-20"
      aria-labelledby="pipeline-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="pipeline-heading"
          className="text-center text-3xl font-bold text-foreground sm:text-4xl"
        >
          Our Approach
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-foreground-muted">
          We take responsibility for the whole journey from problem to
          production system, and can enter at whatever stage suits you.
        </p>

        <div
          ref={timelineRef}
          className="relative mx-auto mt-14 max-w-3xl pl-2 sm:mt-16 sm:pl-4"
          aria-label="Engagement stages timeline"
        >
          {/* Track line */}
          <div
            className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-border sm:left-[21px]"
            aria-hidden
          />

          {/* Scroll progress fill */}
          <motion.div
            className="absolute left-[19px] top-2 w-0.5 origin-top bg-gradient-to-b from-teal-400 to-teal-600 sm:left-[21px]"
            animate={{ height: progressHeight }}
            transition={
              reduceMotion ? { duration: 0 } : { duration: 0.35, ease: "easeOut" }
            }
            aria-hidden
          />

          <div className="relative">
            {pipelineSteps.map((step, index) => (
              <TimelineStep
                key={step.id}
                ref={(element) => {
                  stepRefs.current[index] = element;
                }}
                step={step}
                status={getStepStatus(index, activeIndex)}
                isLast={index === pipelineSteps.length - 1}
                reduceMotion={!!reduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
