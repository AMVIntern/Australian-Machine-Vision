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
    <section className="border-b border-border bg-background py-10" aria-label="Clients">
      <div className="container mx-auto grid items-center gap-6 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <p className="annot text-foreground-muted lg:col-span-3">
          Trusted by leading
          <br className="hidden lg:block" /> organisations
        </p>

        <div
          className="group relative overflow-hidden lg:col-span-9"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="flex w-max animate-marquee items-center gap-14 group-hover:[animation-play-state:paused] sm:gap-20">
            {[0, 1].map((set) => (
              <div
                key={set}
                className="flex items-center gap-14 sm:gap-20"
                aria-hidden={set === 1 || undefined}
              >
                {clients.map((client) => (
                  <Image
                    key={`${client.name}-${set}`}
                    src={client.src}
                    alt={set === 0 ? client.name : ""}
                    width={client.width}
                    height={client.height}
                    className="shrink-0 object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
