import * as React from "react";
import { ScanHeading, Reveal, RuleDraw } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * Shared inner-page header: a light measurement sheet with a faint grid,
 * registration marks and a display title that scans in.
 */
export function PageHeader({
  title,
  intro,
  children,
  titleId,
  className,
}: {
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
  titleId?: string;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border bg-background-secondary/60",
        className
      )}
    >
      <div className="sheet-grid absolute inset-0" aria-hidden />
      <div className="container relative mx-auto px-4 pb-14 pt-32 sm:px-6 sm:pb-16 sm:pt-36 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <ScanHeading
            as="h1"
            id={titleId}
            className="font-display text-[2.6rem] font-bold leading-[1.03] text-foreground sm:text-6xl lg:col-span-7 lg:text-7xl"
          >
            {title}
          </ScanHeading>
          {intro && (
            <Reveal delay={0.2} className="lg:col-span-5">
              <div className="max-w-xl text-lg leading-relaxed text-foreground-muted">
                {intro}
              </div>
            </Reveal>
          )}
        </div>
        {children}
        <RuleDraw className="mt-12 bg-accent-logo/60" />
      </div>
    </section>
  );
}
