const INDUSTRIES = [
  "Food Processing",
  "FMCG",
  "Dairy",
  "Bakery",
  "Healthcare",
  "Building Products",
  "Transport and Logistics",
  "Industrial Manufacturing",
  "General Manufacturing",
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
          Industries we serve across Australia and global markets
        </p>

        <div className="relative mt-8 overflow-hidden">
          {/* Gradient masks for fade at edges */}
          <div
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-teal-700 to-transparent sm:w-20"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-teal-400 to-transparent sm:w-20"
            aria-hidden
          />

          <div className="flex animate-marquee items-center gap-10 sm:gap-14">
            {[...INDUSTRIES, ...INDUSTRIES].map((industry, i) => (
              <span
                key={`${industry}-${i}`}
                className="whitespace-nowrap text-lg font-semibold text-white/90 sm:text-xl"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
