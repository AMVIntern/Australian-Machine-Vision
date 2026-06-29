"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

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

export function MethodsAccordion({ methods }: { methods: Method[] }) {
  const [openId, setOpenId] = useState<string>(methods[0].id);

  return (
    <div className="space-y-2">
      {methods.map((method) => {
        const isOpen = openId === method.id;
        return (
          <div
            key={method.id}
            id={method.id}
            className={cn(
              "scroll-mt-24 rounded-2xl border transition-colors duration-200",
              isOpen ? "border-teal-300/60 bg-white shadow-soft-md" : "border-border bg-white"
            )}
          >
            <button
              onClick={() => setOpenId(isOpen ? "" : method.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-5 px-6 py-5 text-left"
            >
              <span
                className="hidden shrink-0 text-3xl font-bold tabular-nums text-accent-primary/25 sm:block"
                aria-hidden
              >
                {method.number}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-primary">
                  {method.label}
                </p>
                <h2 className="mt-0.5 text-lg font-bold text-foreground sm:text-xl">
                  {method.name}
                </h2>
              </div>
              <ChevronDown
                className={cn(
                  "ml-2 h-5 w-5 shrink-0 text-foreground-muted transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
                aria-hidden
              />
            </button>

            {isOpen && (
              <div className="animate-in fade-in px-6 pb-6 duration-200">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-border/60 bg-background-secondary/50 p-5">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-foreground-muted">
                      What it is
                    </p>
                    <p className="text-sm leading-relaxed text-foreground-muted">
                      {method.what}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-background-secondary/50 p-5">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-foreground-muted">
                      Why it matters to you
                    </p>
                    <p className="text-sm leading-relaxed text-foreground-muted">
                      {method.why}
                    </p>
                  </div>
                </div>

                {method.hybrid && method.hybridText && (
                  <div className="mt-4 rounded-xl border border-teal-200/80 bg-gradient-to-br from-teal-600 via-teal-600 to-teal-700 p-6 text-white shadow-soft-lg">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-teal-100/80">
                      The HALCON and AMV Deep Learning hybrid
                    </p>
                    <p className="text-sm leading-relaxed text-teal-50/95">
                      {method.hybridText}
                    </p>
                  </div>
                )}

                {method.extra && (
                  <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
                    {method.extra}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
