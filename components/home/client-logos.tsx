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
    <section className="border-b border-border bg-white" aria-label="Clients">
      <div className="container mx-auto flex flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:gap-10 lg:px-8">
        <p className="shrink-0 text-sm font-medium text-foreground-muted md:w-40">
          Trusted by leading organisations
        </p>

        <div
          className="group relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:[mask-image:none] motion-reduce:[-webkit-mask-image:none]"
        >
          {/* Reduced motion: one complete, wrapped row instead of a frozen ticker */}
          <div className="flex w-max animate-marquee items-center gap-14 group-hover:[animation-play-state:paused] sm:gap-20 motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-10 motion-reduce:gap-y-6">
            {[...clients, ...clients].map((client, i) => (
              <Image
                key={`${client.name}-${i}`}
                src={client.src}
                alt={i < clients.length ? client.name : ""}
                aria-hidden={i >= clients.length}
                width={client.width}
                height={client.height}
                className={`h-auto max-h-14 w-auto shrink-0 object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0${i >= clients.length ? " motion-reduce:hidden" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
