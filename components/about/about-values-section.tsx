import {
  Award,
  Lightbulb,
  Handshake,
  Accessibility,
  TrendingUp,
  FileCheck,
} from "lucide-react";

const values = [
  {
    id: "excellence",
    icon: Award,
    title: "Excellence",
    description:
      "We deliver best-in-class accuracy and reliability in every deployment, from pilot to production.",
  },
  {
    id: "innovation",
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We invest in imaging, algorithms and automation so our systems keep solving harder inspection problems.",
  },
  {
    id: "partnership",
    icon: Handshake,
    title: "Partnership",
    description:
      "We work alongside your team to understand your process and deliver solutions that fit.",
  },
  {
    id: "accessibility",
    icon: Accessibility,
    title: "Integration",
    description:
      "Systems that fit your operation, integrating with your existing line and infrastructure where it makes sense.",
  },
  {
    id: "impact",
    icon: TrendingUp,
    title: "Impact",
    description:
      "Measurable outcomes: fewer defects, lower costs, higher throughput, and full traceability.",
  },
  {
    id: "transparency",
    icon: FileCheck,
    title: "Transparency",
    description:
      "Clear metrics, auditable results, and honest communication at every step.",
  },
] as const;

export function AboutValuesSection() {
  return (
    <>
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <h2 className="font-display text-4xl font-extrabold leading-none text-white sm:text-5xl lg:col-span-7">
          Our Core Values
        </h2>
        <p className="max-w-md text-lg text-ink-soft lg:col-span-5 lg:justify-self-end">
          The principles that guide everything we do
        </p>
      </div>
      {/* gap-px over a tinted background draws the hairline grid */}
      <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {values.map((v) => {
          const Icon = v.icon;
          return (
            <article
              key={v.id}
              className="group bg-ink p-7 transition-colors duration-300 hover:bg-ink-raised sm:p-8"
            >
              <Icon
                className="h-6 w-6 text-accent-logo transition-colors group-hover:text-white"
                strokeWidth={1.75}
                aria-hidden
              />
              <h3 className="font-wide mt-6 text-xl font-bold text-white">{v.title}</h3>
              <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-ink-soft">
                {v.description}
              </p>
            </article>
          );
        })}
      </div>
    </>
  );
}
