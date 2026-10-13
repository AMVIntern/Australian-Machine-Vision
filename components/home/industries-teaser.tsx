"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { INDUSTRIES } from "@/lib/industries-data";

export function IndustriesTeaser() {
  const [active, setActive] = React.useState(0);

  return (
    <section
      className="bg-background py-20 sm:py-28"
      aria-labelledby="industries-teaser-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2
            id="industries-teaser-heading"
            className="font-display text-4xl font-extrabold leading-none text-foreground sm:text-5xl lg:col-span-6"
          >
            Built for your industry
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-foreground-muted lg:col-span-6 lg:justify-self-end">
            AMV systems are deployed across food processing, industrial and
            general manufacturing environments. Our systems are built to the
            specific demands of each production line.
          </p>
        </div>

        <ul className="mt-14 flex flex-col gap-3 lg:h-[34rem] lg:flex-row" role="list">
          {INDUSTRIES.map((industry, i) => {
            const isActive = active === i;
            return (
              <li
                key={industry.id}
                className={cn(
                  "group relative min-h-[22rem] overflow-hidden rounded-md bg-ink transition-[flex-grow] duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] lg:min-h-0",
                  isActive ? "lg:flex-[2.4]" : "lg:flex-1"
                )}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <Image
                  src={industry.imagePlaceholder}
                  alt={`${industry.name} inspection`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className={cn(
                    "object-cover transition duration-700",
                    isActive ? "scale-100 opacity-80" : "scale-105 opacity-50 grayscale-[40%]"
                  )}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-6 xl:p-8">
                  <h3 className="font-wide text-2xl font-bold leading-tight text-white sm:text-[1.75rem] lg:text-2xl">
                    {industry.name}
                  </h3>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-500",
                      isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[1fr] opacity-100 lg:grid-rows-[0fr] lg:opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-white/80">
                        {industry.headline}
                      </p>
                      <ul className="mt-5 hidden max-w-xl flex-wrap gap-2 sm:flex" role="list">
                        {industry.capabilities.map((cap) => (
                          <li
                            key={cap}
                            className="rounded-sm border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm"
                          >
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                {/* keyboard reachability for the panel */}
                <Link
                  href="/industries"
                  className="absolute inset-0 rounded-md focus-visible:outline-offset-[-3px]"
                  aria-label={`${industry.name}: see industries and key applications`}
                />
              </li>
            );
          })}
        </ul>

        <div className="chamfer-lg mt-3 flex flex-col gap-6 bg-ink p-6 text-white sm:p-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-accent-logo text-ink">
              <Globe2 className="h-5 w-5" strokeWidth={2} aria-hidden />
            </span>
            <div>
              <p className="text-lg font-bold">Any industry, any inspection challenge</p>
              <p className="mt-1 max-w-xl text-[15px] leading-relaxed text-ink-soft">
                We are not aligned to a single sector. If it moves on a line and
                needs to be inspected, we build the system to do it.
              </p>
            </div>
          </div>
          <Link
            href="/industries"
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-md border border-white/25 px-5 text-sm font-semibold transition-colors hover:border-accent-logo hover:text-accent-logo"
          >
            See industries and key applications
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
