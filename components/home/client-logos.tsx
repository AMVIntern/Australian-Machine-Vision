"use client";

import Image from "next/image";

const clients = [
  { name: "CHEP", src: "/logos/ChepLogo.png", width: 80, height: 48 },
  { name: "Nestle", src: "/logos/NestleLogo.png", width: 88, height: 48 },
  { name: "Saputo", src: "/logos/SaputoLogo.png", width: 124, height: 48 },
  { name: "Textor", src: "/logos/TextorLogo.png", width: 96, height: 48 },
  { name: "Tip Top Bakery", src: "/logos/TipTopBakeryLogo.png", width: 96, height: 48 },
  { name: "Daniels Health", src: "/logos/DanielsHealthLogo.png", width: 104, height: 48 },
  { name: "Symbion", src: "/logos/SymbionLogo.png", width: 104, height: 48 },
  { name: "Timberlink", src: "/logos/TimberLinkLogo.png", width: 104, height: 48 },
];

export function ClientLogos() {
  return (
    <section className="bg-teal-50 py-6" aria-label="Clients">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-foreground-muted">
          Trusted by leading manufacturers
        </p>

        <div className="relative overflow-hidden">
          {/* Gradient masks for fade at edges */}
          <div
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-teal-50 to-transparent sm:w-32"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-teal-50 to-transparent sm:w-32"
            aria-hidden
          />

          <div className="flex animate-marquee items-center gap-14 sm:gap-20">
            {[...clients, ...clients].map((client, i) => (
              <Image
                key={`${client.name}-${i}`}
                src={client.src}
                alt={client.name}
                width={client.width}
                height={client.height}
                className="shrink-0 object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
