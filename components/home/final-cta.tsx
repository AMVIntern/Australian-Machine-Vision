"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { ScanHeading, Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function FinalCTA({
  headingId = "final-cta-heading",
  showSecondary = true,
  showNote = true,
}: {
  headingId?: string;
  showSecondary?: boolean;
  showNote?: boolean;
}) {
  return (
    <section
      className="relative overflow-hidden bg-ink py-24 text-white sm:py-32"
      aria-labelledby={headingId}
      data-nav="dark"
    >
      <div className="ink-dots pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reg-marks mx-auto max-w-4xl px-6 py-10 text-center sm:px-10 sm:py-14">
          <ScanHeading
            as="h2"
            id={headingId}
            className="font-display text-4xl font-bold leading-[1.05] sm:text-6xl"
          >
            Let&apos;s Solve Your{" "}
            <span className="text-accent-logo">Inspection</span> Challenge
          </ScanHeading>
          <Reveal>
            <p className="mx-auto mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-soft sm:text-xl">
              If you are reviewing your inspection capability or planning
              upgrades across multiple sites, our team can help you identify
              the right approach.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className={cn(
                  "inline-flex h-12 items-center justify-center rounded-sm bg-accent-logo px-8 text-base font-semibold text-ink",
                  "transition-colors hover:bg-accent-secondary",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                )}
              >
                Contact Us
              </Link>
              {showSecondary && (
                <Link
                  href="/contact"
                  className={cn(
                    "inline-flex h-12 items-center justify-center rounded-sm border border-white/25 px-8 text-base font-semibold text-white",
                    "transition-colors hover:border-accent-logo hover:text-accent-logo",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  )}
                >
                  Talk to Our Team
                </Link>
              )}
            </div>
          </Reveal>
          {showNote && (
          <Reveal delay={0.2}>
            <div className="mt-10 inline-flex items-start gap-2.5 text-left sm:items-center">
              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-accent-logo sm:mt-0" aria-hidden />
              <p className="text-sm text-ink-soft">
                Your work stays confidential. We do not publish client names or
                project details without permission.
              </p>
            </div>
          </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
