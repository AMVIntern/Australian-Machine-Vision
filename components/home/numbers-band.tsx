import { cn } from "@/lib/utils";

interface ScaleFigure {
  id: string;
  figure: string;
  suffix?: string;
  label: string;
}

interface RangeFigure {
  id: string;
  figure: string;
  unit: string;
  unitSpoken: string;
  label: string;
  note: string;
}

const scale: ScaleFigure[] = [
  { id: "years", figure: "20", suffix: "+", label: "Years delivering machine vision" },
  { id: "products", figure: "1M", suffix: "+", label: "Products inspected every day" },
  { id: "hours", figure: "24/7", label: "Operation on live production lines" },
];

// Precision and speed come from different systems, so each figure names the
// system it was achieved on rather than reading as one combined spec.
const range: RangeFigure[] = [
  {
    id: "accuracy",
    figure: "0.1",
    unit: "mm",
    unitSpoken: "millimetres",
    label: "Measurement accuracy",
    note: "On our most precise system to date.",
  },
  {
    id: "speed",
    figure: "600",
    unit: "m/min",
    unitSpoken: "metres per minute",
    label: "Line speed",
    note: "On the fastest line we inspect, 10 metres every second.",
  },
];

const figureClass =
  "font-display text-6xl font-extrabold leading-none text-foreground lg:text-[5.25rem]";

export function NumbersBand() {
  return (
    <section
      className="border-b border-border bg-white py-20 sm:py-24"
      aria-labelledby="numbers-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2
            id="numbers-heading"
            className="font-display text-4xl font-extrabold leading-none text-foreground sm:text-5xl lg:col-span-6"
          >
            Proven on the line
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-foreground-muted lg:col-span-6 lg:justify-self-end">
            The experience, scale, speed and precision behind the systems we
            build and support.
          </p>
        </div>

        <ul className="mt-14 grid border-t border-foreground sm:grid-cols-3" role="list">
          {scale.map((item, i) => (
            <li
              key={item.id}
              className={cn(
                "py-8 sm:py-10",
                i > 0 && "border-t border-border sm:border-l sm:border-t-0 sm:pl-8",
                i < scale.length - 1 && "sm:pr-8"
              )}
            >
              <p className={figureClass}>
                {item.figure}
                {item.suffix && <span className="text-accent-primary">{item.suffix}</span>}
              </p>
              <p className="mt-4 font-semibold text-foreground">{item.label}</p>
            </li>
          ))}
        </ul>

        <div className="grid border-b border-border sm:grid-cols-3">
          <div className="border-t border-border py-8 sm:py-10 sm:pr-8">
            <h3 className="font-bold text-foreground">Designed for each line</h3>
            <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-foreground-muted">
              Precision and speed depend on the product, the optics and the
              setup, so we engineer both for every system. These are the
              furthest we have taken them so far.
            </p>
          </div>
          <ul className="grid sm:col-span-2 sm:grid-cols-2" role="list">
            {range.map((item, i) => (
              <li
                key={item.id}
                className={cn(
                  "border-t border-border py-8 sm:border-l sm:py-10 sm:pl-8",
                  i < range.length - 1 && "sm:pr-8"
                )}
              >
                <p className={figureClass}>
                  {item.figure}
                  <span
                    className="ml-2 text-[0.36em] font-bold tracking-normal text-accent-primary"
                    aria-hidden
                  >
                    {item.unit}
                  </span>
                  <span className="sr-only"> {item.unitSpoken}</span>
                </p>
                <p className="mt-4 font-semibold text-foreground">{item.label}</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-foreground-muted">
                  {item.note}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
