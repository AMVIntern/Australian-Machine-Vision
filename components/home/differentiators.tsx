import {
  Layers,
  Wrench,
  Factory,
  SlidersHorizontal,
  Globe,
  type LucideIcon,
} from "lucide-react";

interface DifferentiatorItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const featured: DifferentiatorItem = {
  id: "customised",
  title: "Built for the problems others won't take on",
  description:
    "Standard inspection products are designed for common cases. We build systems from the ground up for your product, your line and your defect type, including the non-standard and high-difficulty inspection challenges that off-the-shelf tools cannot solve.",
  icon: SlidersHorizontal,
};

const differentiators: DifferentiatorItem[] = [
  {
    id: "whole-stack",
    title: "Whole-stack capability",
    description:
      "We own the full pipeline, from imaging and lighting to the inspection algorithm, operator software and line integration. We are not tied to a single vendor or technique.",
    icon: Layers,
  },
  {
    id: "production-grade",
    title: "Production-grade engineering",
    description:
      "Our systems run on the factory floor at full line speed, with the reliability, traceability and integration that around-the-clock operation demands.",
    icon: Factory,
  },
  {
    id: "right-tool",
    title: "AI and classical vision combined",
    description:
      "We use HALCON and custom-trained deep learning models together, applying each technique where it performs best. One system, the right algorithm for each task.",
    icon: Wrench,
  },
  {
    id: "supported",
    title: "Customer oriented and globally supported",
    description:
      "We work closely with you through the life of the system, with deployments operating across Australia and international markets and tiered support where it is needed.",
    icon: Globe,
  },
];

export function Differentiators() {
  const FeaturedIcon = featured.icon;

  return (
    <section
      className="bg-background py-20 sm:py-28"
      aria-labelledby="differentiators-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h2
                id="differentiators-heading"
                className="font-display text-4xl font-extrabold leading-[1.02] text-foreground sm:text-5xl"
              >
                What sets our work apart
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-foreground-muted">
                Why manufacturers choose AMV for inspection that has to work in
                real production conditions, not just in the lab.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <article className="chamfer-lg relative overflow-hidden bg-ink p-8 text-white sm:p-10">
              <div
                className="pointer-events-none absolute -right-10 -top-6 h-40 w-64 bg-accent-logo/20"
                style={{ clipPath: "polygon(0 25%, 100% 0, 55% 100%)" }}
                aria-hidden
              />
              <div className="relative flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-accent-logo text-ink">
                  <FeaturedIcon className="h-5 w-5" strokeWidth={2} aria-hidden />
                </span>
                <span className="text-sm font-medium text-accent-logo">
                  Core strength
                </span>
              </div>
              <h3 className="font-display relative mt-8 max-w-xl text-3xl font-bold leading-[1.08] sm:text-[2.5rem]">
                {featured.title}
              </h3>
              <p className="relative mt-5 max-w-xl leading-relaxed text-ink-soft sm:text-lg">
                {featured.description}
              </p>
            </article>

            <div className="mt-px grid sm:grid-cols-2">
              {differentiators.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.id}
                    className="group relative border-b border-border px-1 py-8 sm:px-0 sm:odd:pr-8 sm:even:border-l sm:even:pl-8"
                  >
                    <span
                      className="absolute -top-px left-0 h-0.5 w-0 bg-accent-primary transition-[width] duration-500 ease-out group-hover:w-full"
                      aria-hidden
                    />
                    <Icon className="h-6 w-6 text-accent-primary" strokeWidth={1.75} aria-hidden />
                    <h3 className="mt-5 text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">
                      {item.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
