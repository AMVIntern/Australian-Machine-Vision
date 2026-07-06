"use client";

import Image from "next/image";

const clients = [
  { name: "CHEP", src: "/logos/ChepLogo.png", width: 90, height: 54, className: "brightness-0 invert opacity-75" },
  { name: "Nestle", src: "/logos/NestleLogo.png", width: 100, height: 54, className: "brightness-0 invert opacity-75" },
  { name: "Saputo", src: "/logos/SaputoLogo.png", width: 140, height: 54, className: "brightness-0 invert opacity-75" },
  { name: "Textor", src: "/logos/TextorLogo.png", width: 110, height: 54, className: "brightness-0 invert opacity-75" },
  { name: "Tip Top Bakery", src: "/logos/TipTopBakeryLogo.png", width: 110, height: 54, className: "brightness-0 invert opacity-75" },
  { name: "Daniels Health", src: "/logos/DanielsHealthLogo.png", width: 120, height: 54, className: "opacity-80" },
  { name: "Symbion", src: "/logos/SymbionLogo.png", width: 120, height: 54, className: "brightness-0 invert opacity-75" },
  { name: "Timberlink", src: "/logos/TimberLinkLogo.png", width: 120, height: 54, className: "brightness-0 invert opacity-75" },
];

export function ClientLogos() {
  return (
    <section
      className="border-y border-teal-600/30 bg-gradient-to-r from-teal-700 via-teal-600 to-teal-400 py-5 sm:py-6"
      aria-label="Clients"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-white/85 sm:text-sm">
          Trusted by leading manufacturers
        </p>
        <div className="relative mt-8 overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-teal-700 to-transparent sm:w-40" aria-hidden />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-teal-400 to-transparent sm:w-40" aria-hidden />
          <div className="flex animate-marquee items-center gap-16 sm:gap-20">
            {[...clients, ...clients].map((client, i) => (
              <Image
                key={`${client.name}-${i}`}
                src={client.src}
                alt={client.name}
                width={client.width}
                height={client.height}
                className={`shrink-0 object-contain ${client.className}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
