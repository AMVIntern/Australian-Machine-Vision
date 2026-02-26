"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Clock, ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
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
      {/* Subtle gradient orbs */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      >
        <div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-accent-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent-secondary/15 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Text column */}
          <motion.div
            className="flex flex-col"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            <motion.span
              className="inline-flex w-fit rounded-full border border-accent-primary/40 bg-white/60 px-4 py-1.5 text-sm font-medium text-foreground"
              variants={fadeInUp}
            >
              AI-Powered Visual Inspection
            </motion.span>
            <motion.h1
              id="hero-heading"
              className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              variants={fadeInUp}
            >
              Detect Defects in{" "}
              <span className="text-accent-primary">Real-Time</span>
            </motion.h1>
            <motion.p
              className="mt-6 max-w-xl text-lg text-foreground-muted"
              variants={fadeInUp}
            >
              Transform your quality control with AI vision systems that detect
              defects, optimize processes, and reduce costs—achieving 99%+
              accuracy at production speed.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              variants={fadeInUp}
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contact"
                  className={cn(
                    "inline-flex h-11 items-center justify-center rounded-lg bg-gradient-to-br from-accent-primary to-teal-400 px-6 font-medium text-white shadow-soft transition-shadow hover:opacity-90 hover:shadow-soft-md",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
                  )}
                >
                  Book Demo
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/about"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" }),
                    "rounded-lg border border-border bg-white"
                  )}
                >
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              className="mt-8 flex flex-wrap gap-6 text-sm text-foreground-muted"
              variants={fadeInUp}
            >
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary">
                  <Check className="h-4 w-4" aria-hidden />
                </span>
                No hardware replacement
              </span>
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary">
                  <Clock className="h-4 w-4" aria-hidden />
                </span>
                Deploy in weeks
              </span>
            </motion.div>
          </motion.div>

          {/* Visual column – image placeholder + overlay badges */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-background-secondary shadow-soft-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              {/* Image placeholder – CV inspection visual */}
              <div
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200/80"
                aria-hidden
              >
                <div className="flex h-48 w-48 items-center justify-center rounded-full border-2 border-slate-300/60 bg-slate-200/50">
                  <div className="h-16 w-16 rounded-full bg-cyan-400/80 shadow-lg" />
                </div>
              </div>
              {/* Overlay badges – defect / confidence / processing */}
              <div className="absolute left-4 top-4 rounded-full border border-green-500/30 bg-green-500/90 px-3 py-1.5 text-xs font-medium text-white shadow-soft">
                ✓ Defect Detected
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-green-500/30 bg-green-500/90 px-3 py-1.5 text-xs font-medium text-white shadow-soft">
                Confidence: 98.7%
              </div>
              <div className="absolute bottom-4 left-4 rounded-full border border-border bg-white/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-soft">
                Processing: 32ms
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
