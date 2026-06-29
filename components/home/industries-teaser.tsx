import Link from "next/link";
import { ArrowRight, Globe2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { INDUSTRY_GROUPS } from "@/lib/industries-data";

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
              AMV systems are deployed across more than 10 industries. We work
              wherever automated inspection adds value, and our systems are built
              to the specific demands of each production environment.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRY_GROUPS.map((group) => (
              <div
                key={group}
                className="flex items-center gap-3 rounded-xl border border-border/60 bg-white px-5 py-4 shadow-soft"
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full bg-accent-primary"
                  aria-hidden
                />
                <span className="text-sm font-medium text-foreground">
                  {group}
                </span>
              </div>
            ))}
            <div className="flex items-center gap-3 rounded-xl border border-dashed border-border px-5 py-4">
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-foreground-muted/40"
                aria-hidden
              />
              <span className="text-sm text-foreground-muted">
                And many more
              </span>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/industries"
              className={cn(
                "inline-flex items-center gap-2 rounded-lg border-2 border-accent-primary px-6 py-3 text-sm font-semibold text-accent-primary",
                "hover:bg-accent-primary hover:text-white transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
              )}
            >
              See all industries
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-teal-200/80 bg-gradient-to-br from-teal-600 via-teal-600 to-teal-700 p-6 shadow-soft-lg">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
              <Globe2 className="h-5 w-5" strokeWidth={2} aria-hidden />
            </span>
            <div>
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
