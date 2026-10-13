"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { INDUSTRIES } from "@/lib/industries-data";
import { ScanHeading, Reveal } from "@/components/ui/reveal";

export function IndustriesTeaser() {
  return (
    <section
      className="bg-background py-20 sm:py-28"
      aria-labelledby="industries-teaser-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <ScanHeading
            as="h2"
            id="industries-teaser-heading"
            className="font-display text-4xl font-bold leading-none text-foreground sm:text-5xl lg:col-span-6"
          >
            Built for your industry
          </ScanHeading>
          <Reveal className="lg:col-span-6 lg:justify-self-end">
            <p className="max-w-xl text-lg leading-relaxed text-foreground-muted">
              AMV systems are deployed across food processing, industrial and
              general manufacturing environments. Our systems are built to the
              specific demands of each production line.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {INDUSTRIES.map((industry, i) => (
            <Reveal key={industry.id} delay={i * 0.08}>
              <Link
                href="/industries"
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
              >
                <div className="scan-hover relative aspect-[4/5] overflow-hidden bg-ink">
                  <Image
                    src={industry.imagePlaceholder}
                    alt={`${industry.name} inspection`}
                    fill
                    className="object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  {/* region-of-interest frame drawn on hover */}
                  <span
                    className="pointer-events-none absolute inset-4 border border-dashed border-accent-secondary/0 transition-colors duration-300 group-hover:border-accent-secondary/80"
                    aria-hidden
                  />
                  <span
                    className="pointer-events-none absolute left-4 top-4 h-3.5 w-3.5 border-l-2 border-t-2 border-accent-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  />
                  <span
                    className="pointer-events-none absolute bottom-4 right-4 h-3.5 w-3.5 border-b-2 border-r-2 border-accent-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  />
                  <span
                    className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent px-5 pb-4 pt-14"
                  >
                    <span className="font-display block text-xl font-bold text-white">
                      {industry.name}
                    </span>
                  </span>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-foreground-muted">
                  {industry.headline}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="grid items-center gap-6 border border-border bg-background-secondary/60 px-6 py-6 sm:px-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="font-display text-xl font-bold text-foreground">
                Any industry, any inspection challenge
              </p>
              <p className="mt-1.5 max-w-xl leading-relaxed text-foreground-muted">
                We are not aligned to a single sector. If it moves on a line and
                needs to be inspected, we build the system to do it.
              </p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <Link
                href="/industries"
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent-deep transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
              >
                See industries and key applications
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
