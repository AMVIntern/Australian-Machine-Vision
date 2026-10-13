import { cn } from "@/lib/utils";

/**
 * Dark "inspection bay" header shared by the inner pages. The two shards of
 * the AMV mark sit cropped against the right edge.
 */
export function PageHeader({
  title,
  intro,
  children,
  className,
  titleId,
}: {
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  titleId?: string;
}) {
  return (
    <section
      className={cn("bay relative overflow-hidden", className)}
      data-nav="dark"
    >
      <div className="dot-field pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38rem] md:block" aria-hidden>
        <div
          className="absolute -right-16 top-10 h-64 w-[30rem] bg-accent-logo/15"
          style={{ clipPath: "polygon(0 24%, 100% 0, 58% 100%)" }}
        />
        <div
          className="absolute bottom-0 right-40 h-40 w-72 bg-accent-logo/[0.08]"
          style={{ clipPath: "polygon(0 0, 100% 40%, 35% 100%)" }}
        />
      </div>

      <div className="container relative mx-auto px-4 pb-16 pt-36 sm:px-6 sm:pb-20 sm:pt-40 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h1
            id={titleId}
            className="font-display text-[2.6rem] font-extrabold leading-[0.98] text-white sm:text-6xl lg:col-span-7 lg:text-7xl"
          >
            {title}
          </h1>
          {intro && (
            <div className="max-w-xl text-lg leading-relaxed text-ink-soft lg:col-span-5">
              {intro}
            </div>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
