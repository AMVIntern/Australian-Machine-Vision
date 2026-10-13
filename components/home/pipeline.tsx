"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
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
        {/* The server renders the hidden starting state inline, so reduced
            motion still needs an animation target to land on visible. */}
        <motion.article
          {...(reduceMotion
            ? { initial: false, animate: { opacity: 1, x: 0 } }
            : { initial: { opacity: 0, x: 16 }, whileInView: { opacity: 1, x: 0 } })}
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
              isActive || isCompleted ? "text-accent-deep" : "text-foreground-muted"
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

  // Adapted from Aceternity "Tracing Beam" / "Timeline" (MIT): the beam head
  // tracks the same viewport line (42%) used to pick the active step.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 42%", "end 42%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.001,
  });
  const headTop = useTransform(progress, (v) => `${Math.min(100, Math.max(0, v * 100))}%`);
  const headOpacity = useTransform(progress, [0, 0.02, 0.98, 1], [0, 1, 1, 0.6]);

  return (
    <section
      className="border-y border-border bg-background-secondary/40 py-16 sm:py-20"
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
          {/* Track line, scroll-linked fill and glowing head */}
          <div
            className="absolute bottom-2 left-[19px] top-2 w-0.5 rounded-full bg-border sm:left-[21px]"
            aria-hidden
          >
            <motion.div
              className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-teal-400 via-teal-500 to-teal-600"
              style={{ scaleY: reduceMotion ? scrollYProgress : progress }}
            />
            {/* Always rendered so server and client markup match during
                hydration; reduced motion hides it through its style. */}
            <motion.span
              className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-secondary shadow-[0_0_0_3px_rgba(34,211,238,0.22),0_0_6px_rgba(34,211,238,0.35)]"
              style={{ top: headTop, opacity: reduceMotion ? 0 : headOpacity }}
            />
          </div>

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
