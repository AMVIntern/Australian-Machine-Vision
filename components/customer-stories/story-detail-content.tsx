"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CustomerStory } from "@/lib/customer-stories";
import { ImpactMetricCard } from "./impact-metric-card";
import { StoryGallery } from "./story-gallery";

export interface StoryDetailContentProps {
  story: CustomerStory;
}

export function StoryDetailContent({ story }: StoryDetailContentProps) {
  const fadeIn = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-cyan-50/60 to-background py-16 sm:py-20"
        aria-labelledby="story-hero-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div
              className="mx-auto mb-6 flex h-16 w-32 items-center justify-center rounded-xl border border-border bg-white shadow-soft"
              aria-hidden
            >
              <span className="text-xs font-semibold text-foreground-muted">
                {story.clientName}
              </span>
            </div>
            <motion.h1
              id="story-hero-heading"
              className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl"
              {...fadeIn}
            >
              {story.title}
            </motion.h1>
            <motion.p
              className="mt-4 text-lg text-foreground-muted"
              {...fadeIn}
            >
              {story.shortDescription}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Problem & Context */}
      <section
        className="py-12 sm:py-16"
        aria-labelledby="problem-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <h2
                id="problem-heading"
                className="text-2xl font-bold text-foreground"
              >
                Problem & context
              </h2>
              <p className="mt-4 text-foreground-muted">{story.problem}</p>
              <ul className="mt-6 space-y-2">
                {story.problem.split(". ").filter(Boolean).slice(0, 3).map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-foreground-muted"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-primary" />
                    {point.trim()}.
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-background-secondary">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-background-secondary to-border/40">
                <div className="h-20 w-20 rounded-xl border-2 border-dashed border-accent-primary/40 bg-white/60" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section
        className="border-y border-border bg-background-secondary py-12 sm:py-16"
        aria-labelledby="solution-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="solution-heading"
            className="text-2xl font-bold text-foreground"
          >
            Solution
          </h2>
          <p className="mt-4 max-w-3xl text-foreground-muted">
            {story.solution}
          </p>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-white">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200/60">
                <div className="text-center text-sm text-foreground-muted">
                  Architecture diagram placeholder
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Technology highlights
              </h3>
              <ul className="mt-4 space-y-2">
                {["Edge inference", "Custom models", "MES integration", "Real-time alerts"].map(
                  (tech, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-foreground-muted"
                    >
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-accent-primary" />
                      {tech}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Timeline */}
      <section
        className="py-12 sm:py-16"
        aria-labelledby="implementation-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="implementation-heading"
            className="text-center text-2xl font-bold text-foreground"
          >
            Implementation Timeline
          </h2>
          <p className="mt-2 text-center text-foreground-muted">
            From pilot to production in 8 weeks
          </p>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {story.implementationSteps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-primary text-lg font-bold text-white"
                  aria-hidden
                >
                  {index + 1}
                </span>
                {step.timeframe && (
                  <p className="mt-4 text-sm font-medium text-accent-primary">
                    {step.timeframe}
                  </p>
                )}
                <h3 className="mt-1 text-base font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-foreground-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Proof */}
      <section
        className="border-y border-border bg-background-secondary py-12 sm:py-16"
        aria-labelledby="visual-proof-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="visual-proof-heading"
            className="text-2xl font-bold text-foreground"
          >
            Visual proof
          </h2>
          <p className="mt-2 text-foreground-muted">
            Inspection examples, overlays, and dashboards from this deployment
          </p>
          <StoryGallery images={story.gallery} className="mt-8" />
        </div>
      </section>

      {/* Results & Impact */}
      <section
        className="py-12 sm:py-16"
        aria-labelledby="results-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="results-heading"
            className="text-2xl font-bold text-foreground"
          >
            Results & Impact
          </h2>
          <p className="mt-1 text-foreground-muted">
            Measurable outcomes that matter
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {story.resultsMetrics.map((metric) => (
              <ImpactMetricCard key={metric.label} metric={metric} />
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonial - same gradient as homepage Ready to Transform */}
      <section
        className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-400 py-16 sm:py-20"
        aria-labelledby="testimonial-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="testimonial-heading" className="sr-only">
            Client testimonial
          </h2>
          <blockquote className="relative mx-auto max-w-3xl text-center">
            <span
              className="absolute -left-2 -top-2 text-6xl font-serif text-white/30 sm:-left-4"
              aria-hidden
            >
              &ldquo;
            </span>
            <p className="relative text-lg text-white sm:text-xl">
              &ldquo;{story.testimonial.quote}&rdquo;
            </p>
            <footer className="mt-6">
              <cite className="not-italic font-semibold text-white">
                {story.testimonial.author}
              </cite>
              <p className="mt-0.5 text-sm text-white/90">
                {[story.testimonial.role, story.testimonial.company]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="py-16 sm:py-20"
        aria-labelledby="story-cta-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="story-cta-heading"
              className="text-2xl font-bold text-foreground sm:text-3xl"
            >
              Ready to Achieve Similar Results?
            </h2>
            <p className="mt-3 text-foreground-muted">
              Let&apos;s discuss how AI vision can transform your quality control process.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className={cn(
                  "inline-flex h-11 items-center justify-center rounded-lg bg-accent-primary px-6 font-medium text-white",
                  "hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
                )}
              >
                Request Pilot
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "inline-flex h-11 items-center justify-center rounded-lg border-2 border-accent-primary bg-white px-6 font-medium text-accent-primary",
                  "hover:bg-accent-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
                )}
              >
                Book Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
