const APPLICATIONS = [
  "Foreign Material Detection",
  "Surface and Structural Defect Detection",
  "Dimensional Measurement and Tolerance Verification",
  "Packaging and Label Inspection",
  "Fill Level and Completeness Checks",
  "Assembly Verification",
  "Quality Control, In and Out of Specification",
  "Automated Trending and Process Analytics",
  "Real Time Decision Support for Operators",
] as const;

export function IndustriesStrip() {
  return (
    <section
      className="border-y border-teal-600/30 bg-gradient-to-r from-teal-700 via-teal-600 to-teal-400 py-10 sm:py-12"
      aria-labelledby="industries-strip-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p
          id="industries-strip-heading"
          className="text-center text-xs font-medium uppercase tracking-widest text-white/85 sm:text-sm"
        >
          Core inspection applications across food, industrial and general manufacturing
        </p>

        <div className="relative mt-8 overflow-hidden">
          {/* Gradient masks for fade at edges */}
          <div
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-teal-700 to-transparent sm:w-40"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-teal-400 to-transparent sm:w-40"
            aria-hidden
          />

          <div className="flex animate-marquee items-center gap-10 sm:gap-14">
            {[...APPLICATIONS, ...APPLICATIONS].map((app, i) => (
              <span
                key={`${app}-${i}`}
                className="whitespace-nowrap text-lg font-semibold text-white/90 sm:text-xl"
              >
                {app}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
