"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

export function FinalCTA() {
  return (
    <section
      className="py-0"
      aria-labelledby="final-cta-heading"
    >
      {/* Full-width teal gradient banner: darker left to lighter right */}
      <motion.div
        className={cn(
          "w-full bg-gradient-to-r from-teal-700 via-teal-600 to-teal-400",
          "py-16 sm:py-20 lg:py-24"
        )}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/contact"
                  className={cn(
                    "inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-base font-semibold text-accent-primary",
                    "shadow-soft hover:bg-white/95 hover:shadow-soft-md",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-teal-600"
                  )}
                >
                  Contact Us
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
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
          </div>
        </div>
      </motion.div>
    </section>
  );
}
