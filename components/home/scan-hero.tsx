"use client";

import * as React from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ScanHeading, Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Mode = "pending" | "full" | "static";

const smooth = (a: number, b: number, x: number) => {
  const k = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return k * k * (3 - 2 * k);
};

/**
 * Pinned WebGL hero: a point-cloud product under a sweeping sheet of light.
 * Scroll morphs bottle to gear, then disperses the cloud into a lattice.
 * Falls back to a static composition without WebGL or under reduced motion.
 */
export function ScanHero() {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const frameRef = React.useRef<HTMLDivElement | null>(null);
  const beat1Ref = React.useRef<HTMLDivElement | null>(null);
  const beat2Ref = React.useRef<HTMLDivElement | null>(null);
  const cueRef = React.useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = React.useState<Mode>("pending");

  React.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setMode("static");
      return;
    }

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!canvas || !section || !frame) return;

    let field: import("@/components/three/scan-field").ScanField | null = null;
    let st: ScrollTrigger | null = null;
    let ro: ResizeObserver | null = null;
    let io: IntersectionObserver | null = null;
    let visible = true;
    let pageVisible = !document.hidden;
    let disposed = false;

    const syncRun = () => {
      if (!field) return;
      if (visible && pageVisible) field.start();
      else field.stop();
    };

    const onVis = () => {
      pageVisible = !document.hidden;
      syncRun();
    };

    const onPointer = (e: MouseEvent) => {
      if (!field) return;
      const r = frame.getBoundingClientRect();
      field.setPointer(
        ((e.clientX - r.left) / r.width) * 2 - 1,
        ((e.clientY - r.top) / r.height) * 2 - 1
      );
    };

    import("@/components/three/scan-field")
      .then(({ ScanField }) => {
        if (disposed) return;
        try {
          const count = window.innerWidth < 768 ? 7000 : 11000;
          field = new ScanField(canvas, count);
        } catch {
          setMode("static");
          return;
        }
        setMode("full");
        field.resize(frame.clientWidth, frame.clientHeight);

        ro = new ResizeObserver(() => {
          if (field) field.resize(frame.clientWidth, frame.clientHeight);
        });
        ro.observe(frame);

        io = new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting;
            syncRun();
          },
          { threshold: 0 }
        );
        io.observe(section);

        document.addEventListener("visibilitychange", onVis);
        canvas.addEventListener("webglcontextlost", () => setMode("static"));
        if (window.matchMedia("(pointer: fine)").matches) {
          frame.addEventListener("mousemove", onPointer);
        }

        const o1 = gsap.quickSetter(beat1Ref.current, "opacity");
        const y1 = gsap.quickSetter(beat1Ref.current, "y", "px");
        const o2 = gsap.quickSetter(beat2Ref.current, "opacity");
        const y2 = gsap.quickSetter(beat2Ref.current, "y", "px");
        const oc = gsap.quickSetter(cueRef.current, "opacity");

        st = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            const p = self.progress;
            field?.setProgress(p);
            const out1 = smooth(0.16, 0.34, p);
            o1(1 - out1);
            y1(out1 * -48);
            const in2 = smooth(0.42, 0.56, p) * (1 - smooth(0.66, 0.8, p));
            o2(in2);
            y2((1 - in2) * 24);
            oc(1 - smooth(0.03, 0.1, p));
          },
        });

        syncRun();
      })
      .catch(() => setMode("static"));

    return () => {
      disposed = true;
      st?.kill();
      ro?.disconnect();
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      frame.removeEventListener("mousemove", onPointer);
      field?.dispose();
      field = null;
    };
  }, []);

  const isStatic = mode === "static";

  return (
    <section
      ref={sectionRef}
      data-nav="dark"
      aria-labelledby="hero-heading"
      className={cn("relative bg-ink", isStatic ? "" : "h-[320svh]")}
    >
      <div
        ref={frameRef}
        className={cn(
          "top-0 h-[100svh] w-full overflow-hidden",
          isStatic ? "relative" : "sticky"
        )}
      >
        {/* volume backdrop */}
        <div className="ink-dots absolute inset-0 opacity-60" aria-hidden />
        {isStatic ? (
          <div
            className="absolute inset-0"
            aria-hidden
            style={{
              background:
                "radial-gradient(42rem 30rem at 72% 45%, rgba(20,164,156,0.22), transparent 70%)",
            }}
          />
        ) : (
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        )}
        {/* readability scrims */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/55 to-transparent lg:w-3/4"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent"
          aria-hidden
        />

        {/* beat 1: headline */}
        <div
          ref={beat1Ref}
          className="absolute inset-0 flex items-center pt-16 will-change-[opacity,transform]"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12">
              <div className="lg:col-span-8 xl:col-span-7">
                {isStatic && (
                  <Reveal>
                    <p className="annot mb-5 inline-flex items-center gap-2.5 text-accent-logo">
                      <span
                        className="inline-block h-0 w-0 border-x-[5px] border-t-[7px] border-x-transparent border-t-accent-logo"
                        aria-hidden
                      />
                      Transforming Cameras Into Decision-Making Systems
                    </p>
                  </Reveal>
                )}
                <ScanHeading
                  as="h1"
                  id="hero-heading"
                  delay={0.25}
                  className="font-display text-[2.8rem] font-bold leading-[1.02] text-white sm:text-6xl lg:text-7xl"
                >
                  Our <span className="text-accent-logo">Vision</span> Is Your{" "}
                  <span className="text-accent-logo">Solution</span>
                </ScanHeading>

                <Reveal delay={0.55}>
                  <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
                    AMV builds custom machine vision and automated inspection
                    systems for manufacturers in any industry. We take on the
                    inspection challenges that off-the-shelf products cannot
                    handle, applying AI and classical vision techniques
                    developed over 20 years of production-line integration
                    work.
                  </p>
                </Reveal>

                <Reveal delay={0.7}>
                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <Link
                      href="/industries"
                      className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-sm bg-accent-logo px-7 font-semibold text-ink transition-colors hover:bg-accent-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                    >
                      Explore Industries
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex h-12 items-center justify-center rounded-sm border border-white/25 px-7 font-semibold text-white transition-colors hover:border-accent-logo hover:text-accent-logo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                    >
                      Contact Us
                    </Link>
                  </div>
                </Reveal>

                <Reveal delay={0.85}>
                  <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-3">
                    <div className="flex items-baseline gap-3">
                      <dt className="sr-only">Experience</dt>
                      <span className="annot text-accent-logo" aria-hidden>
                        01
                      </span>
                      <dd className="text-sm text-white/80">
                        20+ years of experience
                      </dd>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <dt className="sr-only">Capability</dt>
                      <span className="annot text-accent-logo" aria-hidden>
                        02
                      </span>
                      <dd className="text-sm text-white/80">
                        In-house engineering and software
                      </dd>
                    </div>
                  </dl>
                </Reveal>
              </div>
            </div>
          </div>
        </div>

        {/* beat 2: the statement, revealed mid-scan */}
        {!isStatic && (
          <div
            ref={beat2Ref}
            className="pointer-events-none absolute inset-0 flex items-center justify-center will-change-[opacity,transform]"
            style={{ opacity: 0 }}
            aria-hidden
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <p className="font-display mx-auto max-w-3xl text-center text-3xl font-bold leading-tight text-white sm:text-5xl">
                Transforming Cameras Into{" "}
                <span className="text-accent-logo">Decision-Making</span>{" "}
                Systems
              </p>
            </div>
          </div>
        )}

        {/* scroll cue */}
        {!isStatic && (
          <div
            ref={cueRef}
            className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5"
            aria-hidden
          >
            <span className="annot text-ink-soft">scroll</span>
            <span className="block h-10 w-px overflow-hidden">
              <span className="cue-drop block h-full w-px bg-accent-logo" />
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
