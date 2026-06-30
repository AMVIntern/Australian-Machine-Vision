import { Lock, Globe2 } from "lucide-react";

export function AgnosticBand() {
  return (
    <section
      className="border-y border-border bg-background py-12 sm:py-16"
      aria-label="Our approach and confidentiality"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-teal-200/80 bg-gradient-to-br from-teal-600 via-teal-600 to-teal-700 p-8 shadow-soft-lg">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white"
              aria-hidden
            >
              <Globe2 className="h-6 w-6" strokeWidth={2} />
            </span>
            <h2 className="mt-5 text-xl font-bold text-white">
              Any industry, any inspection challenge
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-teal-50/90">
              We are not aligned to a single sector. If it moves on a line and
              needs to be inspected, we build the system to do it.
            </p>
          </div>

          <div className="rounded-2xl border border-teal-200/80 bg-gradient-to-br from-teal-600 via-teal-600 to-teal-700 p-8 shadow-soft-lg">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white"
              aria-hidden
            >
              <Lock className="h-6 w-6" strokeWidth={2} />
            </span>
            <h2 className="mt-5 text-xl font-bold text-white">
              Your work stays confidential
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-teal-50/90">
              We do not publish client names, line details or project outcomes
              without permission. Every engagement is treated as commercially
              sensitive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
