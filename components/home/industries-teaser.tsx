import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { INDUSTRIES } from "@/lib/industries-data";

export function IndustriesTeaser() {
  return (
    <section
      className="bg-white/80 backdrop-blur-sm py-16 sm:py-20"
      aria-labelledby="industries-teaser-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2
              id="industries-teaser-heading"
              className="text-3xl font-bold text-foreground sm:text-4xl"
            >
              Built for your industry
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-foreground-muted">
              AMV systems are deployed across food processing, industrial and
              general manufacturing environments. Our systems are built to the
              specific demands of each production line.
            </p>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-3" role="list">
            {INDUSTRIES.map((industry) => (
              <li
                key={industry.id}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 bg-background-secondary shadow-soft transition-shadow duration-300 hover:shadow-soft-lg"
              >
                <Image
                  src={industry.imagePlaceholder}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 320px, (min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 p-5">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full bg-accent-secondary"
                    aria-hidden
                  />
                  <span className="text-base font-semibold text-white">
                    {industry.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 text-center">
            <Link
              href="/industries"
              className={cn(
                "group inline-flex items-center gap-2 rounded-lg border-2 border-accent-primary px-6 py-3 text-sm font-semibold text-accent-deep",
                "hover:bg-accent-primary hover:text-white hover:shadow-soft-md transition-[color,background-color,box-shadow] duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
              )}
            >
              See industries and key applications
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </div>

          <div className="relative mt-8 flex items-start gap-4 overflow-hidden rounded-2xl border border-teal-200/80 bg-gradient-to-br from-teal-600 via-teal-600 to-teal-700 p-6 shadow-soft-lg">
            {/* Slow drifting grid with a light beam sweeping across */}
            <div
              className="pointer-events-none absolute inset-0 animate-grid-drift opacity-[0.14] [mask-image:linear-gradient(to_right,transparent,#000_30%,#000_70%,transparent)]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.9) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 animate-sweep bg-gradient-to-r from-transparent via-white/15 to-transparent motion-reduce:hidden"
              aria-hidden
            />
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
              <Globe2 className="h-5 w-5" strokeWidth={2} aria-hidden />
            </span>
            <div className="relative">
              <p className="font-bold text-white">Any industry, any inspection challenge</p>
              <p className="mt-1 text-sm leading-relaxed text-teal-50/90">
                We are not aligned to a single sector. If it moves on a line and
                needs to be inspected, we build the system to do it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
