"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

const COMPANIES = [
  { name: "BOSCH", logo: "bosch.png" },
  { name: "NESTLE", logo: "nestle.png" },
  { name: "CHEP", logo: "chep.png" },
  { name: "Daniels Health", logo: "daniels-health.png" },
  { name: "Thales", logo: "thales.png" },
  { name: "Asahi", logo: "asahi.png" },
  { name: "Dulux", logo: "dulux.png" },
  { name: "Saputo", logo: "saputo.png" },
  { name: "Symbion", logo: "symbion.png" },
  { name: "Textor", logo: "textor.png" },
  { name: "Tip Top Bakeries", logo: "tip-top-bakeries.png" },
] as const;

function LogoItem({
  name,
  logo,
}: { name: string; logo: string }) {
  const [useFallback, setUseFallback] = useState(false);

  const handleError = useCallback(() => {
    setUseFallback(true);
  }, []);

  if (useFallback) {
    return (
      <span className="whitespace-nowrap text-lg font-semibold text-white/90 sm:text-xl">
        {name}
      </span>
    );
  }

  return (
    <div className="relative flex h-10 w-[120px] shrink-0 items-center justify-center sm:h-12 sm:w-[140px]">
      <Image
        src={`/logos/${logo}`}
        alt={name}
        width={140}
        height={48}
        className="max-h-10 w-auto max-w-[120px] object-contain object-center brightness-0 invert sm:max-h-12 sm:max-w-[140px]"
        onError={handleError}
      />
    </div>
  );
}

export function LogoCarousel() {
  return (
    <section
      className="border-y border-teal-600/30 bg-gradient-to-r from-teal-700 via-teal-600 to-teal-400 py-10 sm:py-12"
      aria-labelledby="trusted-by-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p
          id="trusted-by-heading"
          className="text-center text-xs font-medium uppercase tracking-widest text-white/85 sm:text-sm"
        >
          Trusted by leading manufacturers and supply chain companies worldwide
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
            {[...COMPANIES, ...COMPANIES].map((company, i) => (
              <div
                key={`${company.name}-${i}`}
                className="flex shrink-0 items-center justify-center"
              >
                <LogoItem name={company.name} logo={company.logo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
