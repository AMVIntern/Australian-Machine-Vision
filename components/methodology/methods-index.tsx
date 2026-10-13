"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ImageCompare } from "@/components/methodology/image-compare";

type Method = {
  id: string;
  number: string;
  name: string;
  label: string;
  what: string;
  why: string;
  hybrid?: boolean;
  hybridText?: string;
  extra?: string;
};

/** All four methods open, with a sticky index that follows the reader. */
export function MethodsIndex({ methods }: { methods: Method[] }) {
  const [activeId, setActiveId] = React.useState(methods[0].id);

  React.useEffect(() => {
    let frame = 0;
    // The active method is the last one whose top has passed 40% of the viewport.
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let current = methods[0].id;
      for (const m of methods) {
        const el = document.getElementById(m.id);
        if (el && el.getBoundingClientRect().top <= line) current = m.id;
      }
      setActiveId(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [methods]);

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
      <nav className="hidden lg:col-span-3 lg:block" aria-label="Technology stack">
        <ol className="sticky top-28 space-y-1 border-l border-border" role="list">
          {methods.map((method) => {
            const active = activeId === method.id;
            return (
              <li key={method.id}>
                <a
                  href={`#${method.id}`}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "relative flex items-baseline gap-3 py-2.5 pl-5 text-[15px] transition-colors",
                    active ? "font-semibold text-foreground" : "text-foreground-muted hover:text-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "absolute -left-px top-0 h-full w-px transition-colors",
                      active ? "bg-accent-primary" : "bg-transparent"
                    )}
                    aria-hidden
                  />
                  <span className="tabular text-xs text-accent-deep">{method.number}</span>
                  {method.name}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="space-y-20 lg:col-span-9">
        {methods.map((method) => (
          <article key={method.id} id={method.id} className="scroll-mt-28">
            <div className="flex items-baseline gap-4">
              <span className="font-display tabular text-2xl font-extrabold text-accent-primary/40" aria-hidden>
                {method.number}
              </span>
              <div>
                <p className="text-sm font-semibold text-accent-deep">{method.label}</p>
                <h2 className="font-display mt-1 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
                  {method.name}
                </h2>
              </div>
            </div>

            <div className="mt-8 grid border-t border-foreground sm:grid-cols-2">
              <div className="border-b border-border py-6 sm:border-b-0 sm:pr-8">
                <p className="text-sm font-semibold text-foreground">What it is</p>
                <p className="mt-2 leading-relaxed text-foreground-muted">{method.what}</p>
              </div>
              <div className="py-6 sm:border-l sm:border-border sm:pl-8">
                <p className="text-sm font-semibold text-foreground">Why it matters to you</p>
                <p className="mt-2 leading-relaxed text-foreground-muted">{method.why}</p>
              </div>
            </div>

            {method.id === "classical" && (
              <ImageCompare
                className="mt-6"
                before="/methodology/capture.jpg"
                after="/methodology/edges.jpg"
                beforeLabel="Capture"
                afterLabel="Classical vision"
                alt="A production line as the camera captures it, beside the same frame after classical edge detection"
              />
            )}

            {method.hybrid && method.hybridText && (
              <div className="chamfer-lg relative mt-6 overflow-hidden bg-ink p-7 text-white sm:p-8">
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-56 bg-accent-logo/20"
                  style={{ clipPath: "polygon(0 25%, 100% 0, 55% 100%)" }}
                  aria-hidden
                />
                <p className="relative text-sm font-semibold text-accent-logo">
                  The HALCON and AMV Deep Learning hybrid
                </p>
                <p className="relative mt-3 max-w-2xl leading-relaxed text-white/85">
                  {method.hybridText}
                </p>
              </div>
            )}

            {method.extra && (
              <div className="mt-6 rounded-md bg-background-tint p-6 sm:p-7">
                <p className="max-w-[68ch] leading-relaxed text-foreground">{method.extra}</p>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
