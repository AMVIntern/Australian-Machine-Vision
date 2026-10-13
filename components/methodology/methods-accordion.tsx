"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

const EASE = [0.16, 1, 0.3, 1] as const;

export function MethodsAccordion({ methods }: { methods: Method[] }) {
  const [openId, setOpenId] = useState<string>(methods[0].id);
  const reduceMotion = useReducedMotion();

  // Open the method named in the URL hash (the home page links to each one).
  useEffect(() => {
    const openFromHash = () => {
      const id = window.location.hash.slice(1);
      if (methods.some((method) => method.id === id)) setOpenId(id);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [methods]);

  return (
    <div className="space-y-2">
      {methods.map((method) => {
        const isOpen = openId === method.id;
        return (
          <div
            key={method.id}
            id={method.id}
            className={cn(
              "scroll-mt-24 rounded-2xl border transition-[border-color,box-shadow] duration-300",
              isOpen
                ? "border-teal-300/60 bg-white shadow-soft-md"
                : "border-border bg-white hover:border-teal-200 hover:shadow-soft"
            )}
          >
            <button
              onClick={() => setOpenId(isOpen ? "" : method.id)}
              aria-expanded={isOpen}
              aria-controls={`${method.id}-panel`}
              className="group flex w-full items-center gap-5 rounded-2xl px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
            >
              <span
                className={cn(
                  "hidden shrink-0 text-3xl font-bold tabular-nums transition-colors duration-300 sm:block",
                  isOpen ? "text-accent-primary" : "text-foreground-muted"
                )}
                aria-hidden
              >
                {method.number}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-deep">
                  {method.label}
                </p>
                <h2 className="mt-0.5 text-lg font-bold text-foreground sm:text-xl">
                  {method.name}
                </h2>
              </div>
              <span
                className={cn(
                  "ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                  isOpen
                    ? "bg-accent-primary/10 text-accent-primary"
                    : "text-foreground-muted group-hover:bg-background-secondary"
                )}
                aria-hidden
              >
                <ChevronDown
                  className={cn(
                    "h-5 w-5 transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
                />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${method.id}-panel`}
                  key="panel"
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
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
                      <div className="mt-4 rounded-xl border border-teal-200/80 bg-gradient-to-br from-teal-600 via-teal-600 to-teal-700 p-6 shadow-soft-lg">
                        <p className="text-sm leading-relaxed text-teal-50/95">
                          {method.extra}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
