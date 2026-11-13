import Link from "next/link";
import { Award, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import { InspectionLine } from "@/components/home/inspection-line";
import { Initialled } from "@/components/ui/initialled";

// CSS entrance (see .hero-rise in globals.css): it starts with the first paint
// instead of waiting for JavaScript, so the hero text is not held back on phones.
const delay = (seconds: number) => ({ animationDelay: `${seconds}s` });

export function Hero() {
  return (
    <section
      className="bay relative flex min-h-[100svh] flex-col overflow-hidden"
      aria-labelledby="hero-heading"
      data-nav="dark"
    >
      <div className="container relative mx-auto flex-1 px-4 pb-6 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pt-32">
        <p
          className="hero-rise flex items-center gap-3 text-sm font-medium text-ink-soft sm:text-[15px]"
          style={delay(0.05)}
        >
          <span
            className="h-0 w-0 border-x-[6px] border-t-[8px] border-x-transparent border-t-accent-logo"
            aria-hidden
          />
          <span>
            Transforming Cameras Into{" "}
            <span className="whitespace-nowrap">Decision-Making</span> Systems
          </span>
        </p>

        <h1
          id="hero-heading"
          className="font-display mt-6 max-w-[15ch] text-[2.75rem] font-extrabold leading-[0.95] text-white sm:text-6xl lg:text-[5.5rem] xl:text-[6rem]"
        >
          <span className="hero-rise block" style={delay(0.15)}>
            <Initialled text="Our Vision" />
          </span>
          <span className="hero-rise block" style={delay(0.28)}>
            <Initialled text="Is Your Solution" />
          </span>
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,34rem)_1fr] lg:items-end lg:gap-16">
          <p
            className="hero-rise max-w-[56ch] text-lg leading-relaxed text-ink-soft"
            style={delay(0.42)}
          >
            AMV builds custom machine vision and automated inspection systems
            for manufacturers in any industry. We take on the inspection
            challenges that off-the-shelf products cannot handle, applying AI
            and classical vision techniques developed over 25 years of
            production-line integration work.
          </p>

          <div className="hero-rise flex flex-col gap-6" style={delay(0.52)}>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/industries"
                className={cn(
                  "chamfer inline-flex h-12 items-center justify-center bg-accent-logo px-7 font-semibold text-ink transition-colors",
                  "hover:bg-accent-secondary"
                )}
              >
                Explore Industries
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/25 px-7 font-semibold text-white transition-colors hover:border-white hover:bg-white/5"
              >
                Contact Us
              </Link>
            </div>
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-soft" role="list">
              <li className="flex items-center gap-2.5">
                <Award className="h-4 w-4 text-accent-logo" aria-hidden />
                25+ years of experience
              </li>
              <li className="flex items-center gap-2.5">
                <Cpu className="h-4 w-4 text-accent-logo" aria-hidden />
                In-house engineering and software
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        className="hero-fade relative h-[220px] w-full flex-none sm:h-[clamp(240px,36vh,360px)]"
        style={delay(0.6)}
      >
        <InspectionLine />
      </div>
    </section>
  );
}
