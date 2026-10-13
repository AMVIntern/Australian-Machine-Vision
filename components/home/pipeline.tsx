"use client";

import * as React from "react";
import {
  motion,
  useMotionValueEvent,
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

function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);
  React.useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);
  return matches;
}

function StepPanel({ step, active }: { step: PipelineStep; active: boolean }) {
  const Icon = step.icon;
  return (
    <article
      className={cn(
        "flex h-full flex-col justify-between rounded-md border p-7 transition-colors duration-500 sm:p-8",
        active ? "border-accent-logo bg-white/[0.06]" : "border-white/10 bg-white/[0.02]"
      )}
    >
      <div className="flex items-start justify-between">
        <span
          className={cn(
            "font-display text-7xl font-extrabold leading-none transition-colors duration-500 sm:text-8xl",
            active ? "text-accent-logo" : "text-transparent"
          )}
          style={{ WebkitTextStroke: active ? "0px" : "1px rgb(20 164 156 / 0.7)" }}
          aria-hidden
        >
          {step.number}
        </span>
        <Icon
          className={cn("h-7 w-7 transition-colors", active ? "text-accent-logo" : "text-white/40")}
          strokeWidth={1.6}
          aria-hidden
        />
      </div>
      <div className="mt-10">
        <p className="text-sm font-medium text-ink-soft">Step {step.number}</p>
        <h3 className="font-wide mt-1.5 text-2xl font-bold leading-tight text-white">
          {step.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
          {step.description}
        </p>
      </div>
    </article>
  );
}

function Heading() {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
      <h2
        id="pipeline-heading"
        className="font-display text-4xl font-extrabold leading-none text-white sm:text-6xl lg:col-span-6"
      >
        Our Approach
      </h2>
      <p className="max-w-xl text-lg leading-relaxed text-ink-soft lg:col-span-6 lg:justify-self-end">
        We take responsibility for the whole journey from problem to
        production system, and can enter at whatever stage suits you.
      </p>
    </div>
  );
}

function PinnedTrack() {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLOListElement>(null);
  const [distance, setDistance] = React.useState(0);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [reached, setReached] = React.useState(0);

  React.useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return;
      const style = getComputedStyle(viewport);
      const inner =
        viewport.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      setDistance(Math.max(0, track.scrollWidth - inner));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, (v) => -v * distance);
  const markerLeft = useTransform(smooth, (v) => `${v * 100}%`);

  useMotionValueEvent(smooth, "change", (v) => {
    const span = pipelineSteps.length - 1;
    setActiveIndex(Math.min(span, Math.round(v * span)));
    // Rail stops light only once the marker has actually passed them.
    setReached(Math.min(span, Math.floor(v * span + 0.02)));
  });

  return (
    <div ref={wrapperRef} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Heading />
        </div>

        <div ref={viewportRef} className="container mx-auto mt-12 px-4 sm:px-6 lg:px-8">
          <motion.ol
            ref={trackRef}
            style={{ x }}
            className="flex w-max gap-5"
            aria-label="Engagement stages timeline"
          >
            {pipelineSteps.map((step, i) => (
              <li key={step.id} className="h-[23rem] w-[26rem]">
                <StepPanel step={step} active={i === activeIndex} />
              </li>
            ))}
          </motion.ol>

          {/* Progress rail with the mark riding along it */}
          <div className="relative mt-10 h-6" aria-hidden>
            <div className="absolute inset-x-0 top-1/2 h-px bg-white/15" />
            <motion.div
              className="absolute left-0 top-1/2 h-px origin-left bg-accent-secondary"
              style={{ scaleX: smooth, width: "100%" }}
            />
            {pipelineSteps.map((step, i) => (
              <span
                key={step.id}
                className={cn(
                  "absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors duration-300",
                  i <= reached ? "border-accent-secondary bg-accent-secondary" : "border-white/30 bg-ink"
                )}
                style={{ left: `${(i / (pipelineSteps.length - 1)) * 100}%` }}
              />
            ))}
            <motion.span
              className="absolute -top-3 h-0 w-0 -translate-x-1/2 border-x-[8px] border-t-[11px] border-x-transparent border-t-accent-logo"
              style={{ left: markerLeft }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StackedSteps() {
  return (
    <div className="container mx-auto px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <Heading />
      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Engagement stages timeline">
        {pipelineSteps.map((step) => (
          <li key={step.id}>
            <StepPanel step={step} active={false} />
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Pipeline() {
  const reduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px) and (min-height: 700px)");
  const pinned = isDesktop && !reduceMotion;

  return (
    <section className="bay relative" aria-labelledby="pipeline-heading" data-nav="dark">
      <div className="dot-field pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="relative">{pinned ? <PinnedTrack /> : <StackedSteps />}</div>
    </section>
  );
}
