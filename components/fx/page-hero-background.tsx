import { DotGrid } from "@/components/fx/dot-grid";

/**
 * Shared backdrop for inner page heroes: the same interactive dot texture as
 * the home hero at a gentler intensity, plus the soft teal and cyan orbs.
 * The parent section must be `relative overflow-hidden`.
 */
export function PageHeroBackground() {
  return (
    <>
      <DotGrid intensity={0.7} alpha={0.42} radius={130} />
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <div className="absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-accent-primary/20 blur-3xl" />
        <div className="absolute -bottom-10 right-0 h-80 w-80 rounded-full bg-accent-secondary/15 blur-3xl" />
      </div>
    </>
  );
}
