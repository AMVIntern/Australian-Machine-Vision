"use client";

import { useEffect, useState } from "react";
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

  // open the method named in the URL hash, e.g. /methodology#classical
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && methods.some((m) => m.id === hash)) setOpenId(hash);
  }, [methods]);

  return (
    <div className="border-t border-foreground/70">
      {methods.map((method) => {
        const isOpen = openId === method.id;
        return (
          <div
            key={method.id}
            id={method.id}
            className="scroll-mt-28 border-b border-border"
          >
            <button
              onClick={() => setOpenId(isOpen ? "" : method.id)}
              aria-expanded={isOpen}
              className={cn(
                "flex w-full items-center gap-5 py-6 text-left transition-colors",
                "hover:bg-background-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-primary",
                isOpen && "pb-4"
              )}
            >
              <span
                className={cn(
                  "annot shrink-0 transition-colors",
                  isOpen ? "text-accent-deep" : "text-foreground-muted"
                )}
                aria-hidden
              >
                {method.number}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                  {method.name}
                </h2>
                <p className="mt-0.5 text-sm font-medium text-accent-deep">
                  {method.label}
                </p>
              </div>
              <ChevronDown
                className={cn(
                  "ml-2 h-5 w-5 shrink-0 text-foreground-muted transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
                aria-hidden
              />
            </button>

            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <div className="pb-8 pl-0 sm:pl-10">
                  <div className="grid border-t border-border sm:grid-cols-2">
                    <div className="border-b border-border py-5 sm:border-b-0 sm:pr-8">
                      <p className="text-sm font-semibold text-foreground">What it is</p>
                      <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">
                        {method.what}
                      </p>
                    </div>
                    <div className="py-5 sm:border-l sm:border-border sm:pl-8">
                      <p className="text-sm font-semibold text-foreground">
                        Why it matters to you
                      </p>
                      <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">
                        {method.why}
                      </p>
                    </div>
                  </div>

                  {method.hybrid && method.hybridText && (
                    <div className="reg-marks relative mt-5 bg-ink p-6 text-white sm:p-7">
                      <p className="text-sm font-semibold text-accent-logo">
                        The HALCON and AMV Deep Learning hybrid
                      </p>
                      <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-ink-soft">
                        {method.hybridText}
                      </p>
                    </div>
                  )}

                  {method.extra && (
                    <div className="mt-5 border-l-2 border-accent-logo bg-background-secondary/70 p-6">
                      <p className="max-w-[68ch] text-[15px] leading-relaxed text-foreground">
                        {method.extra}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
