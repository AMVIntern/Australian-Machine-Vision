"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/fx/animated-grid-pattern";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger = {
  animate: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

export function FinalCTA() {
  const reduceMotion = useReducedMotion();
  const hover = reduceMotion ? undefined : { scale: 1.03 };
  const tap = reduceMotion ? undefined : { scale: 0.98 };

  return (
    <section
      className="py-0"
      aria-labelledby="final-cta-heading"
    >
      {/* Full-width teal gradient banner: darker left to lighter right */}
      <motion.div
        className={cn(
          "relative w-full overflow-hidden bg-gradient-to-r from-teal-700 via-teal-600 to-teal-400",
          "py-16 sm:py-20 lg:py-24"
        )}
        initial={reduceMotion ? false : "initial"}
        whileInView="animate"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <AnimatedGridPattern
          className="[mask-image:radial-gradient(ellipse_55%_75%_at_50%_50%,transparent_35%,#000_100%)]"
          stroke="rgba(255,255,255,0.09)"
          maxOpacity={0.14}
          numSquares={30}
        />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h2
              id="final-cta-heading"
              className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
              variants={fadeIn}
            >
              Let&apos;s Solve Your Inspection Challenge
            </motion.h2>
            <motion.p
              className="mt-4 text-lg text-white/95 sm:text-xl"
              variants={fadeIn}
            >
              If you are reviewing your inspection capability or planning
              upgrades across multiple sites, our team can help you identify the
              right approach.
            </motion.p>
            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
              variants={fadeIn}
            >
              <motion.div whileHover={hover} whileTap={tap}>
                <Link
                  href="/contact"
                  className={cn(
                    "btn-shine btn-shine-teal inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-base font-semibold text-accent-primary",
                    "shadow-soft hover:bg-white/95 hover:shadow-soft-md",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-teal-600"
                  )}
                >
                  Contact Us
                </Link>
              </motion.div>
              <motion.div whileHover={hover} whileTap={tap}>
                <Link
                  href="/contact"
                  className={cn(
                    "inline-flex h-12 items-center justify-center rounded-lg bg-teal-500 px-8 text-base font-semibold text-white",
                    "hover:bg-teal-400",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-teal-600"
                  )}
                >
                  Talk to Our Team
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 backdrop-blur-sm"
              variants={fadeIn}
            >
              <Lock className="h-4 w-4 shrink-0 text-white" aria-hidden />
              <p className="text-sm font-medium text-white">
                Your work stays confidential. We do not publish client names or project details without permission.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
