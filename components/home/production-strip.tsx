import {
  Gauge,
  Network,
  ShieldCheck,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";

interface ProductionPoint {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const points: ProductionPoint[] = [
  {
    id: "line-speed",
    title: "Runs at line speed",
    description:
      "Full line speed on the factory floor, built for around-the-clock operation.",
    icon: Gauge,
  },
  {
    id: "integration",
    title: "Integrates with your line",
    description:
      "Direct integration with PLCs and line control, plus desktop, web and mobile software.",
    icon: Network,
  },
  {
    id: "validated",
    title: "Validated and traceable",
    description:
      "Accuracy quantified against ground truth, with traceability built in.",
    icon: ShieldCheck,
  },
  {
    id: "supported",
    title: "Globally supported",
    description:
      "Deployments operating overseas, with tiered around-the-clock support.",
    icon: LifeBuoy,
  },
];

export function ProductionStrip() {
  return (
    <section
      className="border-b border-border bg-white py-20 sm:py-24"
      aria-labelledby="production-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2
              id="production-heading"
              className="font-display text-3xl font-extrabold leading-[1.05] text-foreground sm:text-4xl"
            >
              Engineered for production
            </h2>
            <p className="mt-4 max-w-sm text-lg leading-relaxed text-foreground-muted">
              Built to run reliably where it matters, on the line.
            </p>
          </div>

          <ul className="grid border-t border-foreground sm:grid-cols-2 lg:col-span-8" role="list">
            {points.map((point, i) => {
              const Icon = point.icon;
              return (
                <li
                  key={point.id}
                  className={
                    "flex gap-5 border-b border-border py-7 sm:pr-8 " +
                    (i % 2 === 1 ? "sm:border-l sm:pl-8" : "")
                  }
                >
                  <Icon
                    className="mt-0.5 h-6 w-6 shrink-0 text-accent-primary"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <div>
                    <h3 className="font-bold text-foreground">{point.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-foreground-muted">
                      {point.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
