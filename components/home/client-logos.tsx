"use client";

import Image from "next/image";

const clients = [
  { name: "Timberlink", src: "/logos/TimberLinkLogo.png", width: 140, height: 64 },
  { name: "Australian Red Cross", src: "/logos/AustralianRedCross.png", width: 150, height: 75 },
  { name: "Symbion", src: "/logos/SymbionLogo.png", width: 140, height: 64 },
  { name: "Daniels Health", src: "/logos/DanielsHealthLogo.png", width: 104, height: 48 },
  { name: "Tip Top Bakery", src: "/logos/TipTopBakeryLogo.png", width: 96, height: 48 },
  { name: "Textor", src: "/logos/TextorLogo.png", width: 96, height: 48 },
  { name: "Saputo", src: "/logos/SaputoLogo.png", width: 124, height: 48 },
  { name: "Nestle", src: "/logos/NestleLogo.png", width: 120, height: 64 },
  { name: "CHEP", src: "/logos/ChepLogo.png", width: 108, height: 64 },
  { name: "RMIT", src: "/logos/RMITLogo.png", width: 124, height: 48 },
];

export function ClientLogos() {
  return (
    <section className="bg-teal-50 py-6" aria-label="Clients">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-foreground-muted">
          Trusted by leading organisations
        </p>

        <div className="pause-on-hover mask-fade-x relative overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-14 sm:gap-20">
            {[...clients, ...clients].map((client, i) => (
              <Image
                key={`${client.name}-${i}`}
                src={client.src}
                alt={i < clients.length ? client.name : ""}
                aria-hidden={i >= clients.length ? true : undefined}
                width={client.width}
                height={client.height}
                className="shrink-0 object-contain opacity-90 transition duration-300 hover:scale-105 hover:opacity-100"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
