"use client";

import * as React from "react";
import Link from "next/link";
import { Award, Cpu, Pause, Play } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ScanHeading, Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import type { InspectionScene } from "@/components/three/inspection-scene";
import {
  GEAR,
  borePoints,
  circlePoints,
  kidneyPoints,
  outlinePoints,
  svgPath,
} from "@/components/three/gear-geometry";

type WebGLState = "pending" | "ok" | "none";

const PINNED = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

const smooth = (a: number, b: number, x: number) => {
  const k = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return k * k * (3 - 2 * k);
};

/** Top view of the gear for browsers without WebGL. */
function GearDrawing() {
  const s = 150;
  const c = 180;
  return (
    <div className="absolute inset-0 flex items-center justify-center lg:left-1/2" aria-hidden>
      <svg viewBox="0 0 360 360" className="h-auto w-[min(78%,26rem)]">
        <g fill="none" stroke="#101d1b" strokeWidth="1.2" strokeLinejoin="round">
          <path d={svgPath(outlinePoints(), s, c, c)} fill="#ffffff" />
          {Array.from({ length: GEAR.holes }, (_, k) => (
            <path key={k} d={svgPath(kidneyPoints(k), s, c, c)} />
          ))}
          <path d={svgPath(circlePoints(GEAR.hubR), s, c, c)} />
          <path d={svgPath(borePoints(), s, c, c)} />
        </g>
        <g fill="none" stroke="#0d9488" strokeWidth="1.4">
          <path d={svgPath(circlePoints(GEAR.boreR + 0.03), s, c, c)} />
          <path d={`M${c - 0.3 * s} ${c}H${c + 0.3 * s}M${c} ${c - 0.3 * s}V${c + 0.3 * s}`} />
          {Array.from({ length: GEAR.holes }, (_, k) => (
            <path key={k} d={svgPath(kidneyPoints(k, 24, 0.022), s, c, c)} />
          ))}
        </g>
        <path
          d={svgPath(circlePoints(GEAR.tipR + 0.06, 160), s, c, c)}
          fill="none"
          stroke="#5c6f6c"
          strokeWidth="1"
          strokeDasharray="6 4"
        />
      </svg>
    </div>
  );
}

/**
 * Hero: a machined gear on an inspection table, measured by a sweeping laser
 * line with a live height profile. On wide screens with motion allowed the
 * section pins and scrolling moves the camera overhead while fitted features
 * lock on. Under reduced motion it shows a still frame the visitor can play;
 * without WebGL it shows a line drawing of the same part.
 */
export function ScanHero() {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const frameRef = React.useRef<HTMLDivElement | null>(null);
  const visualRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const profileRef = React.useRef<HTMLCanvasElement | null>(null);
  const beat1Ref = React.useRef<HTMLDivElement | null>(null);
  const beat2Ref = React.useRef<HTMLDivElement | null>(null);
  const cueRef = React.useRef<HTMLDivElement | null>(null);
  const sceneRef = React.useRef<InspectionScene | null>(null);
  // Paused until the scene loads and confirms motion is allowed, so reduced
  // motion never sees a frame of animation.
  const playingRef = React.useRef(false);
  const syncRef = React.useRef<() => void>(() => {});
  const [webgl, setWebgl] = React.useState<WebGLState>("pending");
  const [ready, setReady] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);

  React.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const frame = frameRef.current;
    const visual = visualRef.current;
    if (!canvas || !section || !frame || !visual) return;

    let ro: ResizeObserver | null = null;
    let io: IntersectionObserver | null = null;
    let mm: gsap.MatchMedia | null = null;
    let onScreen = true;
    let pageVisible = !document.hidden;
    let disposed = false;

    // Run only while playing, on screen and in a visible tab.
    const sync = () => {
      const scene = sceneRef.current;
      if (!scene) return;
      if (playingRef.current && onScreen && pageVisible) scene.start();
      else if (scene.isRunning) {
        scene.stop();
        // repaint, in case a resize cleared the canvases since the last frame
        scene.renderStill();
      }
    };
    syncRef.current = sync;

    const onVis = () => {
      pageVisible = !document.hidden;
      sync();
    };
    const onPointer = (e: MouseEvent) => {
      const r = frame.getBoundingClientRect();
      sceneRef.current?.setPointer(
        ((e.clientX - r.left) / r.width) * 2 - 1,
        ((e.clientY - r.top) / r.height) * 2 - 1
      );
    };
    const onContextLost = () => setWebgl("none");

    import("@/components/three/inspection-scene")
      .then(({ InspectionScene }) => {
        if (disposed) return;
        let scene: InspectionScene;
        try {
          scene = new InspectionScene(canvas, profileRef.current);
        } catch {
          setWebgl("none");
          return;
        }
        sceneRef.current = scene;
        setWebgl("ok");
        setPlaying(!reduced);

        const fit = () => {
          scene.resize(visual.clientWidth, visual.clientHeight);
          if (!scene.isRunning) scene.renderStill();
        };
        if (reduced) scene.primeStill();
        fit();
        requestAnimationFrame(() => setReady(true));

        ro = new ResizeObserver(fit);
        ro.observe(visual);

        io = new IntersectionObserver(
          ([entry]) => {
            onScreen = entry.isIntersecting;
            sync();
          },
          { threshold: 0 }
        );
        io.observe(section);
        document.addEventListener("visibilitychange", onVis);
        canvas.addEventListener("webglcontextlost", onContextLost);

        if (!reduced && window.matchMedia("(pointer: fine)").matches) {
          frame.addEventListener("mousemove", onPointer);
        }

        // the scroll sequence exists only where the layout pins
        mm = gsap.matchMedia();
        mm.add(PINNED, () => {
          const beat1 = beat1Ref.current;
          const beat2 = beat2Ref.current;
          const cue = cueRef.current;
          if (!beat1 || !beat2 || !cue) return;
          const o1 = gsap.quickSetter(beat1, "opacity");
          const y1 = gsap.quickSetter(beat1, "y", "px");
          const o2 = gsap.quickSetter(beat2, "opacity");
          const y2 = gsap.quickSetter(beat2, "y", "px");
          const oc = gsap.quickSetter(cue, "opacity");

          const st = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            onUpdate: (self) => {
              const p = self.progress;
              scene.setProgress(p);
              // paused: scrolling still moves the camera, one frame at a time
              if (!scene.isRunning) scene.renderStill();
              const out1 = smooth(0.08, 0.26, p);
              o1(1 - out1);
              y1(out1 * -40);
              const in2 = smooth(0.34, 0.5, p);
              o2(in2);
              y2((1 - in2) * 24);
              oc(1 - smooth(0.02, 0.08, p));
            },
          });

          return () => {
            st.kill();
            scene.setProgress(0);
            if (!scene.isRunning) scene.renderStill();
            gsap.set([beat1, cue], { clearProps: "opacity,transform" });
            gsap.set(beat2, { opacity: 0, clearProps: "transform" });
          };
        });

        sync();
      })
      .catch(() => setWebgl("none"));

    return () => {
      disposed = true;
      syncRef.current = () => {};
      mm?.revert();
      ro?.disconnect();
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      frame.removeEventListener("mousemove", onPointer);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  React.useEffect(() => {
    playingRef.current = playing;
    syncRef.current();
  }, [playing]);

  const pins = webgl !== "none";

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className={cn("relative border-b border-border bg-background", pins && "lg:motion-safe:h-[240svh]")}
    >
      <div
        ref={frameRef}
        className={cn(
          "relative flex flex-col overflow-hidden lg:block lg:h-[100svh] lg:min-h-[640px]",
          pins && "lg:motion-safe:sticky lg:motion-safe:top-0"
        )}
      >
        {/* paper and table light */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_65%_at_70%_58%,#ffffff_0%,#f4f8f7_55%,#e8efee_100%)]"
          aria-hidden
        />

        {/* the part under inspection */}
        <div
          ref={visualRef}
          className="relative order-2 h-[56svh] min-h-[320px] w-full lg:absolute lg:inset-0 lg:h-auto lg:min-h-0"
        >
          {webgl === "none" ? (
            <GearDrawing />
          ) : (
            <canvas
              ref={canvasRef}
              className={cn(
                "absolute inset-0 h-full w-full transition-opacity duration-700",
                ready ? "opacity-100" : "opacity-0"
              )}
              aria-hidden
            />
          )}

          {webgl !== "none" && (
            <div className="absolute bottom-4 right-4 w-[min(15rem,calc(100%-2rem))] rounded-sm border border-border bg-white/85 px-3 pb-3 pt-2 shadow-sm backdrop-blur-sm sm:right-6 lg:bottom-10 lg:right-8 lg:w-72">
              <div className="flex items-center justify-between gap-3">
                <span className="annot text-foreground-muted">laser profile</span>
                {webgl === "ok" && (
                  <button
                    type="button"
                    onClick={() => setPlaying((p) => !p)}
                    aria-label={playing ? "Pause the laser scan animation" : "Play the laser scan animation"}
                    className={cn(
                      "-mr-1 inline-flex h-7 items-center gap-1.5 rounded-sm px-1.5 font-mono text-xs text-foreground-muted",
                      "transition-colors hover:text-foreground",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                    )}
                  >
                    {playing ? (
                      <Pause className="h-3.5 w-3.5 text-accent-primary" aria-hidden />
                    ) : (
                      <Play className="h-3.5 w-3.5 text-accent-primary" aria-hidden />
                    )}
                    {playing ? "Pause" : "Play"}
                  </button>
                )}
              </div>
              <canvas ref={profileRef} className="mt-1.5 block h-14 w-full lg:h-16" aria-hidden />
            </div>
          )}
        </div>

        {/* beat 1: headline */}
        <div
          ref={beat1Ref}
          className="relative order-1 pb-4 pt-28 will-change-[opacity,transform] sm:pt-32 lg:pointer-events-none lg:absolute lg:inset-0 lg:flex lg:items-center lg:pb-0 lg:pt-16"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl lg:pointer-events-auto lg:max-w-[38rem] xl:max-w-[42rem]">
              <Reveal className={cn(pins && "lg:motion-safe:hidden")}>
                <p className="annot mb-5 inline-flex items-center gap-2.5 text-accent-deep">
                  <span
                    className="inline-block h-0 w-0 border-x-[5px] border-t-[7px] border-x-transparent border-t-accent-primary"
                    aria-hidden
                  />
                  Transforming Cameras Into Decision-Making Systems
                </p>
              </Reveal>
              <ScanHeading
                as="h1"
                id="hero-heading"
                delay={0.25}
                className="font-display text-[2.8rem] font-bold leading-[1.02] text-foreground sm:text-6xl lg:text-7xl"
              >
                Our <span className="text-accent-primary">Vision</span> Is Your{" "}
                <span className="text-accent-primary">Solution</span>
              </ScanHeading>

              <Reveal delay={0.55}>
                <p className="mt-7 max-w-xl text-lg leading-relaxed text-foreground-muted sm:text-xl">
                  AMV builds custom machine vision and automated inspection
                  systems for manufacturers in any industry. We take on the
                  inspection challenges that off-the-shelf products cannot
                  handle, applying AI and classical vision techniques
                  developed over 20 years of production-line integration work.
                </p>
              </Reveal>

              <Reveal delay={0.7}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link
                    href="/industries"
                    className="inline-flex h-12 items-center justify-center rounded-sm bg-accent-deep px-7 font-semibold text-white transition-colors hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
                  >
                    Explore Industries
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex h-12 items-center justify-center rounded-sm border border-foreground/25 px-7 font-semibold text-foreground transition-colors hover:border-accent-primary hover:text-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
                  >
                    Contact Us
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={0.85}>
                <ul className="mt-12 flex flex-wrap gap-x-10 gap-y-3" role="list">
                  <li className="flex items-center gap-2.5 text-sm text-foreground-muted">
                    <Award className="h-4 w-4 text-accent-primary" aria-hidden />
                    20+ years of experience
                  </li>
                  <li className="flex items-center gap-2.5 text-sm text-foreground-muted">
                    <Cpu className="h-4 w-4 text-accent-primary" aria-hidden />
                    In-house engineering and software
                  </li>
                </ul>
              </Reveal>
            </div>
          </div>
        </div>

        {/* beat 2: the statement, as the camera moves overhead */}
        {pins && (
          <div
            ref={beat2Ref}
            className="pointer-events-none absolute inset-0 hidden items-center will-change-[opacity,transform] lg:motion-safe:flex"
            style={{ opacity: 0 }}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <p className="font-display max-w-[30rem] text-4xl font-bold leading-[1.08] text-foreground xl:max-w-[34rem] xl:text-5xl">
                Transforming Cameras Into{" "}
                <span className="text-accent-primary">Decision-Making</span>{" "}
                Systems
              </p>
            </div>
          </div>
        )}

        {/* scroll cue */}
        {pins && (
          <div
            ref={cueRef}
            className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2.5 lg:motion-safe:flex"
            aria-hidden
          >
            <span className="annot text-foreground-muted">scroll</span>
            <span className="block h-10 w-px overflow-hidden">
              <span className="cue-drop block h-full w-px bg-accent-primary" />
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
