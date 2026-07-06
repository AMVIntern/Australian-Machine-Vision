"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-teal-50/95 via-cyan-50/80 to-background"
      aria-labelledby="hero-heading"
    >
      {/* Dot grid texture */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle, #0d9488aa 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

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
            initial="initial"
            animate="animate"
          >
            <motion.span
              className="inline-flex w-fit rounded-full border border-accent-primary/40 bg-white/60 px-4 py-1.5 text-sm font-medium text-foreground"
              variants={fadeInUp}
            >
              Transforming Cameras Into Decision-Making Systems
            </motion.span>

            <motion.h1
              id="hero-heading"
              className="mt-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              variants={fadeInUp}
            >
              Our{" "}
              <span className="text-accent-primary">Vision</span>{" "}
              Is Your{" "}
              <span className="text-accent-primary">Solution</span>
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
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/industries"
                  className={cn(
                    "inline-flex h-12 items-center justify-center rounded-lg bg-gradient-to-br from-accent-primary to-teal-400 px-6 font-semibold text-white shadow-soft transition hover:opacity-90 hover:shadow-soft-md",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
                  )}
                >
                  Explore Industries
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contact"
                  className={cn(
                    "inline-flex h-12 items-center justify-center rounded-lg border-2 border-border bg-white px-6 font-semibold text-foreground",
                    "hover:bg-background-secondary",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
                  )}
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-foreground-muted"
              variants={fadeInUp}
            >
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary">
                  <Award className="h-4 w-4" aria-hidden />
                </span>
                20+ years of experience
              </span>
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary">
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
