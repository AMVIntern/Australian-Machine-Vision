"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Award, Cpu } from "lucide-react";
import { DotGrid } from "@/components/fx/dot-grid";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const stagger = {
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

// Adapted from Magic UI "Blur Fade" / "Text Animate" (MIT)
const wordReveal = {
  initial: { opacity: 0, y: 14, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

const headlineWords: { text: string; accent?: boolean }[] = [
  { text: "Our" },
  { text: "Vision", accent: true },
  { text: "Is" },
  { text: "Your" },
  { text: "Solution", accent: true },
];

// impeccable-disable side-tab, border-accent-on-rounded -- these are the four
// corner brackets of the detection box around "Vision", not card borders.

/** Corner brackets that lock on to a word like a detection box. */
function DetectionBox({ reduceMotion }: { reduceMotion: boolean }) {
  const corners = [
    { pos: "left-0 top-0 border-l-2 border-t-2 rounded-tl-[3px]", from: { x: -10, y: -10 } },
    { pos: "right-0 top-0 border-r-2 border-t-2 rounded-tr-[3px]", from: { x: 10, y: -10 } },
    { pos: "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-[3px]", from: { x: -10, y: 10 } },
    { pos: "bottom-0 right-0 border-b-2 border-r-2 rounded-br-[3px]", from: { x: 10, y: 10 } },
  ];

  return (
    <span
      className="pointer-events-none absolute -inset-x-1.5 -bottom-1 -top-0.5 sm:-inset-x-2.5"
      aria-hidden
    >
      {corners.map((corner, i) => (
        <motion.span
          key={i}
          className={cn(
            "absolute h-3 w-3 border-accent-primary sm:h-4 sm:w-4",
            corner.pos
          )}
          initial={
            reduceMotion ? false : { opacity: 0, x: corner.from.x, y: corner.from.y }
          }
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 1.15, duration: 0.55, ease: EASE }}
        />
      ))}
    </span>
  );
}

export function Hero() {
  const reduceMotion = !!useReducedMotion();

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-teal-50/95 via-cyan-50/80 to-background"
      aria-labelledby="hero-heading"
    >
      {/* Interactive dot grid texture */}
      <DotGrid />

      {/* Subtle gradient orbs */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      >
        <div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-accent-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent-secondary/15 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 pb-4 pt-10 sm:px-6 sm:pb-4 sm:pt-12 lg:px-8 lg:pb-6 lg:pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            className="flex flex-col items-center"
            variants={stagger}
            initial={reduceMotion ? false : "initial"}
            animate="animate"
          >
            <motion.span
              className="relative inline-flex w-fit overflow-hidden rounded-full border border-accent-primary/40 bg-white/60 px-4 py-1.5 text-sm font-medium text-foreground shadow-soft backdrop-blur-sm"
              variants={fadeInUp}
            >
              <span className="shiny-text animate-shine">
                Transforming Cameras Into Decision-Making Systems
              </span>
            </motion.span>

            <motion.h1
              id="hero-heading"
              className="mt-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              variants={{
                animate: {
                  transition: { staggerChildren: 0.09, delayChildren: 0.1 },
                },
              }}
            >
              {headlineWords.map((word, i) => (
                <span key={word.text}>
                  <motion.span
                    variants={wordReveal}
                    className={cn(
                      "relative inline-block",
                      word.accent && "text-accent-primary",
                      word.text === "Vision" && "mx-1.5 sm:mx-2.5"
                    )}
                  >
                    {word.text}
                    {word.text === "Vision" && (
                      <DetectionBox reduceMotion={reduceMotion} />
                    )}
                  </motion.span>
                  {i < headlineWords.length - 1 && " "}
                </span>
              ))}
            </motion.h1>

            <motion.p
              className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted sm:text-xl"
              variants={fadeInUp}
            >
              AMV builds custom machine vision and automated inspection systems
              for manufacturers in any industry. We take on the inspection
              challenges that off-the-shelf products cannot handle, applying AI
              and classical vision techniques developed over 20 years of
              production-line integration work.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
              variants={fadeInUp}
            >
              <motion.div
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                <Link
                  href="/industries"
                  className={cn(
                    "btn-shine inline-flex h-12 items-center justify-center rounded-lg bg-gradient-to-br from-accent-primary to-teal-400 px-6 font-semibold text-white shadow-soft transition hover:shadow-soft-lg",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
                  )}
                >
                  Explore Industries
                </Link>
              </motion.div>
              <motion.div
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                <Link
                  href="/contact"
                  className={cn(
                    "inline-flex h-12 items-center justify-center rounded-lg border-2 border-border bg-white px-6 font-semibold text-foreground transition-colors",
                    "hover:border-accent-primary/40 hover:bg-background-secondary",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
                  )}
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-foreground-muted"
              variants={fadeInUp}
            >
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary ring-1 ring-accent-primary/15">
                  <Award className="h-4 w-4" aria-hidden />
                </span>
                20+ years of experience
              </span>
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary ring-1 ring-accent-primary/15">
                  <Cpu className="h-4 w-4" aria-hidden />
                </span>
                In-house engineering and software
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
