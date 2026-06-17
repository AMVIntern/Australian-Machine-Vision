import type { Metadata } from "next";
import Link from "next/link";
import { Target, Eye } from "lucide-react";
import { AboutValuesSection } from "@/components/about/about-values-section";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Australian Machine Vision. Our mission, vision and 20+ years of experience in machine vision and automated inspection for manufacturing.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Australian Machine Vision",
    description:
      "Learn about Australian Machine Vision. Our mission, vision, and expertise in industrial machine vision for quality inspection.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Australian Machine Vision",
    description:
      "Learn about Australian Machine Vision. Our mission, vision, and expertise in industrial machine vision for quality inspection.",
  },
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero - Our Vision is Your Solution */}
      <section className="border-b border-border bg-gradient-to-br from-teal-50/95 via-cyan-50/80 to-background py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mx-auto max-w-3xl text-center">
            <h1
              id="about-title"
              className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl"
            >
              Our <span className="text-accent-primary">Vision</span> is Your{" "}
              <span className="text-accent-primary">Solution</span>
            </h1>
            <p className="mt-4 text-lg text-foreground-muted">
              AMV delivers end-to-end machine vision and automated inspection,
              from feasibility and proof of concept through custom build,
              on-site commissioning and ongoing support. We work across food,
              packaging, healthcare, hygiene and logistics, in Australia and
              global markets, combining advanced imaging and proven engineering
              to solve inspection challenges that standard systems cannot.
            </p>
          </header>
        </div>
      </section>

      {/* Two-column: Our Mission + Our Vision */}
      <section className="bg-white/80 backdrop-blur-sm py-12 sm:py-16">
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
                To deliver machine vision and automated inspection systems that
                solve real production challenges. We help manufacturers across
                food, packaging, healthcare, hygiene and logistics achieve the
                accuracy, reliability and repeatability that off the shelf
                systems cannot.
              </p>
              <p className="mt-4 text-foreground-muted leading-relaxed">
                Every project starts with a clear understanding of your
                production environment and quality requirements, so the
                solution fits the way your line actually runs.
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
                Our vision is your solution. We combine advanced imaging, robust
                algorithms and a wide network of trusted technology partners to
                build inspection systems that perform in real world conditions,
                not just in the lab.
              </p>
              <p className="mt-4 text-foreground-muted leading-relaxed">
                We then select and integrate the technologies that deliver the
                most reliable, scalable and cost effective outcome for each
                customer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership - Director */}
      <section
        className="border-y border-border bg-white/80 backdrop-blur-sm py-12 sm:py-16"
        aria-labelledby="leadership-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="leadership-heading"
            className="text-center text-2xl font-bold text-foreground sm:text-3xl"
          >
            Leadership
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-foreground-muted">
            The experience behind every system we deliver.
          </p>

          <div className="mx-auto mt-10 grid max-w-4xl items-center gap-8 sm:grid-cols-[auto,1fr] sm:gap-12">
            {/* Photo placeholder - replace with a portrait of Ken at /public/team/ken-razga.jpg */}
            <div className="mx-auto flex h-44 w-44 items-center justify-center overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-teal-50 to-cyan-50 shadow-soft sm:h-52 sm:w-52">
              <span className="text-4xl font-bold text-accent-primary">KR</span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground">Ken Razga</h3>
              <p className="mt-1 text-sm font-medium text-accent-primary">
                Director
              </p>
              <p className="mt-4 text-foreground-muted leading-relaxed">
                Ken leads Australian Machine Vision, bringing more than 20 years
                of hands-on experience in machine vision and industrial
                automation. He has worked closely with manufacturers across
                food, industrial and general manufacturing to solve inspection
                challenges that off the shelf systems cannot.
              </p>
              <p className="mt-3 text-foreground-muted leading-relaxed">
                His focus is practical engineering and measurable results,
                making sure every system we deliver is reliable, well integrated
                and built for real production conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Core Values - 3x2 grid */}
      <section className="border-y border-border bg-white/80 backdrop-blur-sm py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AboutValuesSection />
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-white/80 backdrop-blur-sm py-12 sm:py-16" aria-labelledby="about-stats-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="about-stats-heading" className="sr-only">
            Key statistics
          </h2>
          <div className="flex flex-wrap justify-center gap-10 sm:gap-16">
            <div className="text-center">
              <p className="text-3xl font-bold tabular-nums text-accent-primary sm:text-4xl">
                20+
              </p>
              <p className="mt-1 text-sm text-accent-primary">
                Years of Experience
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-accent-primary sm:text-4xl">
                Global
              </p>
              <p className="mt-1 text-sm text-accent-primary">
                Australia and International Markets
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-accent-primary sm:text-4xl">
                In-House
              </p>
              <p className="mt-1 text-sm text-accent-primary">
                Engineering and Software
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-accent-primary sm:text-4xl">
                Trusted
              </p>
              <p className="mt-1 text-sm text-accent-primary">
                Technology Partner Network
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
              Let&apos;s Solve Your Inspection Challenge
            </h2>
            <p className="mt-4 text-lg text-white/95">
              If you are reviewing your inspection capability or planning
              upgrades across multiple sites, our team can help you identify the
              right approach.
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
