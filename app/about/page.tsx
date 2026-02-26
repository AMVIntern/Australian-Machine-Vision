import type { Metadata } from "next";
import Link from "next/link";
import { Target, Eye } from "lucide-react";
import { AboutValuesSection } from "@/components/about/about-values-section";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Australian Machine Vision—our mission, vision, and expertise in industrial AI and computer vision for quality inspection.",
  openGraph: {
    title: "About | Australian Machine Vision",
    description:
      "Learn about Australian Machine Vision—our mission, vision, and expertise in industrial AI and computer vision for quality inspection.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Australian Machine Vision",
    description:
      "Learn about Australian Machine Vision—our mission, vision, and expertise in industrial AI and computer vision for quality inspection.",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero - Transforming Manufacturing with AI Vision */}
      <section className="border-b border-border bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mx-auto max-w-3xl text-center">
            <h1
              id="about-title"
              className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl"
            >
              Transforming Manufacturing with{" "}
              <span className="text-accent-primary">AI Vision</span>
            </h1>
            <p className="mt-4 text-lg text-foreground-muted">
              Australian Machine Vision is on a mission to make visual quality
              inspection accessible, accurate, and automated for manufacturers
              worldwide.
            </p>
          </header>
        </div>
      </section>

      {/* Two-column: Our Mission + Our Vision */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span
                className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent-primary text-white shadow-soft"
                aria-hidden
              >
                <Target className="h-7 w-7" strokeWidth={2} />
              </span>
              <h2 className="mt-5 text-2xl font-bold text-foreground">
                Our Mission
              </h2>
              <p className="mt-4 text-foreground-muted leading-relaxed">
                To empower manufacturers with AI-powered vision technology that
                eliminates defects, ensures consistent quality standards, and
                scales inspection without scaling headcount. We believe every
                production line can benefit from real-time, accurate visual
                inspection.
              </p>
              <p className="mt-4 text-foreground-muted leading-relaxed">
                We deliver solutions that work with existing cameras and
                infrastructure—so you can deploy quickly and see measurable ROI
                from day one.
              </p>
            </div>
            <div>
              <span
                className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent-primary text-white shadow-soft"
                aria-hidden
              >
                <Eye className="h-7 w-7" strokeWidth={2} />
              </span>
              <h2 className="mt-5 text-2xl font-bold text-foreground">
                Our Vision
              </h2>
              <p className="mt-4 text-foreground-muted leading-relaxed">
                A world where zero-defect manufacturing is the norm—enabled by
                AI-powered quality control that sees what humans miss, runs
                24/7, and gets smarter over time. We envision factories where
                visual inspection is fully automated, auditable, and integrated
                into every critical process.
              </p>
              <p className="mt-4 text-foreground-muted leading-relaxed">
                From automotive to pharma, FMCG to electronics, we&apos;re
                building the platform that makes this possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team / collaboration image placeholder */}
      <section className="border-y border-border bg-background-secondary/30 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
            <div className="aspect-video w-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <span className="text-sm text-foreground-muted">
                Team / collaboration image placeholder
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Core Values - 3x2 grid */}
      <section className="border-y border-border bg-background-secondary/30 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AboutValuesSection />
        </div>
      </section>

      {/* Statistics */}
      <section className="py-12 sm:py-16" aria-labelledby="about-stats-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="about-stats-heading" className="sr-only">
            Key statistics
          </h2>
          <div className="flex flex-wrap justify-center gap-10 sm:gap-16">
            <div className="text-center">
              <p className="text-3xl font-bold tabular-nums text-accent-primary sm:text-4xl">
                150+
              </p>
              <p className="mt-1 text-sm text-accent-primary">
                Manufacturing Clients
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold tabular-nums text-accent-primary sm:text-4xl">
                50M+
              </p>
              <p className="mt-1 text-sm text-accent-primary">
                Inspections Per Day
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold tabular-nums text-accent-primary sm:text-4xl">
                99.2%
              </p>
              <p className="mt-1 text-sm text-accent-primary">
                Average Accuracy
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold tabular-nums text-accent-primary sm:text-4xl">
                6
              </p>
              <p className="mt-1 text-sm text-accent-primary">
                Our Team Members
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Teal CTA band */}
      <section
        className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-400 py-16 sm:py-20"
        aria-labelledby="about-cta-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="about-cta-heading"
              className="text-3xl font-bold text-white sm:text-4xl"
            >
              Join Us In Transforming Manufacturing
            </h2>
            <p className="mt-4 text-lg text-white/95">
              Whether you&apos;re looking to deploy AI vision or join our team,
              we&apos;d love to hear from you.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className={cn(
                  "inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-base font-semibold text-accent-primary",
                  "shadow-soft hover:bg-white/95",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-teal-600"
                )}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
