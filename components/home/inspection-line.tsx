"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Live, decorative inspection line for the hero.
 *
 * Products ride a conveyor under a camera head drawn from the AMV mark (the
 * inverted triangle with its two teal shards). Each product is scanned as it
 * passes the head, receives a pass or reject verdict, and rejects are diverted
 * off the belt. The pointer acts as a second camera: it shows a crosshair and
 * locks on to whichever product it is over.
 */

type Kind = "bottle" | "carton" | "jar" | "tote";
type Defect = "fill" | "label" | "foreign" | "cap" | null;

interface Item {
  id: number;
  kind: Kind;
  defect: Defect;
  x: number;
  scan: number; // 0..1 while under the head
  verdict: boolean;
  drop: number; // seconds since diverted, -1 when on the belt
}

const COLORS = {
  ink: "#1c1917",
  teal: "#14a49c",
  tealDeep: "#0d9488",
  cyan: "#22d3ee",
  white: "#fafaf9",
};

const PASS_LABEL: Record<Kind, string> = {
  bottle: "Fill level OK",
  carton: "Label OK",
  jar: "Seal OK",
  tote: "Clean",
};

const REJECT_LABEL: Record<Exclude<Defect, null>, string> = {
  fill: "Reject: fill level",
  label: "Reject: label",
  foreign: "Reject: foreign material",
  cap: "Reject: cap missing",
};

const KIND_LABEL: Record<Kind, string> = {
  bottle: "Bottle",
  carton: "Carton",
  jar: "Jar",
  tote: "Tote",
};

// Fixed cycle so the line reads the same on every visit: mostly passes,
// with a defect roughly every third product.
const SEQUENCE: { kind: Kind; defect: Defect }[] = [
  { kind: "bottle", defect: null },
  { kind: "carton", defect: null },
  { kind: "jar", defect: "foreign" },
  { kind: "bottle", defect: null },
  { kind: "tote", defect: null },
  { kind: "bottle", defect: "fill" },
  { kind: "carton", defect: null },
  { kind: "jar", defect: null },
  { kind: "carton", defect: "label" },
  { kind: "tote", defect: null },
  { kind: "bottle", defect: "cap" },
  { kind: "jar", defect: null },
];

function size(kind: Kind, s: number) {
  switch (kind) {
    case "bottle":
      return { w: 34 * s, h: 92 * s };
    case "carton":
      return { w: 58 * s, h: 56 * s };
    case "jar":
      return { w: 48 * s, h: 58 * s };
    case "tote":
      return { w: 82 * s, h: 44 * s };
  }
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawProduct(
  ctx: CanvasRenderingContext2D,
  item: Item,
  baseY: number,
  s: number
) {
  const { w, h } = size(item.kind, s);
  const left = item.x - w / 2;
  const top = baseY - h;
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = "rgba(250,250,249,0.78)";
  ctx.fillStyle = "rgba(250,250,249,0.06)";

  if (item.kind === "bottle") {
    const neckW = 14 * s;
    const bodyTop = top + 22 * s;
    // cap
    if (item.defect !== "cap") {
      ctx.fillStyle = "rgba(20,164,156,0.85)";
      roundRect(ctx, item.x - 9 * s, top, 18 * s, 8 * s, 2 * s);
      ctx.fill();
    }
    // neck
    ctx.fillStyle = "rgba(250,250,249,0.06)";
    ctx.beginPath();
    ctx.rect(item.x - neckW / 2, top + 8 * s, neckW, 14 * s);
    ctx.fill();
    ctx.stroke();
    // body
    roundRect(ctx, left, bodyTop, w, baseY - bodyTop, 7 * s);
    ctx.fill();
    ctx.stroke();
    // liquid
    const level = item.defect === "fill" ? 0.34 : 0.78;
    const bodyH = baseY - bodyTop;
    ctx.save();
    roundRect(ctx, left, bodyTop, w, bodyH, 7 * s);
    ctx.clip();
    ctx.fillStyle = "rgba(34,211,238,0.28)";
    ctx.fillRect(left, baseY - bodyH * level, w, bodyH * level);
    ctx.restore();
    // label
    ctx.save();
    ctx.translate(item.x, bodyTop + bodyH * 0.55);
    if (item.defect === "label") ctx.rotate(0.22);
    ctx.fillStyle = "rgba(250,250,249,0.2)";
    ctx.fillRect(-w / 2, -9 * s, w, 18 * s);
    ctx.restore();
  }

  if (item.kind === "carton") {
    ctx.beginPath();
    ctx.rect(left, top + 8 * s, w, h - 8 * s);
    ctx.fill();
    ctx.stroke();
    // top flaps
    ctx.beginPath();
    ctx.moveTo(left, top + 8 * s);
    ctx.lineTo(left + 8 * s, top);
    ctx.lineTo(left + w - 8 * s, top);
    ctx.lineTo(left + w, top + 8 * s);
    ctx.stroke();
    // label
    ctx.save();
    ctx.translate(item.x, top + h * 0.58);
    if (item.defect === "label") ctx.rotate(-0.26);
    ctx.fillStyle = "rgba(20,164,156,0.55)";
    ctx.fillRect(-w * 0.32, -10 * s, w * 0.64, 20 * s);
    ctx.fillStyle = "rgba(250,250,249,0.55)";
    for (let i = 0; i < 3; i++) {
      ctx.fillRect(-w * 0.24, -6 * s + i * 5 * s, w * (0.48 - i * 0.1), 1.5 * s);
    }
    ctx.restore();
  }

  if (item.kind === "jar") {
    // lid
    ctx.fillStyle = "rgba(20,164,156,0.85)";
    roundRect(ctx, left - 3 * s, top, w + 6 * s, 9 * s, 2 * s);
    ctx.fill();
    ctx.fillStyle = "rgba(250,250,249,0.06)";
    roundRect(ctx, left, top + 9 * s, w, h - 9 * s, 6 * s);
    ctx.fill();
    ctx.stroke();
    ctx.save();
    roundRect(ctx, left, top + 9 * s, w, h - 9 * s, 6 * s);
    ctx.clip();
    ctx.fillStyle = "rgba(250,250,249,0.14)";
    ctx.fillRect(left, top + 9 * s + (h - 9 * s) * 0.3, w, h);
    ctx.restore();
  }

  if (item.kind === "tote") {
    ctx.beginPath();
    ctx.moveTo(left, top);
    ctx.lineTo(left + w, top);
    ctx.lineTo(left + w - 6 * s, baseY);
    ctx.lineTo(left + 6 * s, baseY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "rgba(250,250,249,0.3)";
    for (let i = 1; i < 4; i++) {
      const rx = left + (w / 4) * i;
      ctx.beginPath();
      ctx.moveTo(rx, top + 8 * s);
      ctx.lineTo(rx, baseY - 6 * s);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(250,250,249,0.78)";
  }

  if (item.defect === "foreign") {
    ctx.fillStyle = COLORS.white;
    ctx.beginPath();
    ctx.arc(item.x + w * 0.18, baseY - h * 0.42, 2.6 * s, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(item.x + w * 0.24, baseY - h * 0.38, 1.4 * s, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawBrackets(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  len: number
) {
  ctx.beginPath();
  ctx.moveTo(x, y + len);
  ctx.lineTo(x, y);
  ctx.lineTo(x + len, y);
  ctx.moveTo(x + w - len, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y + len);
  ctx.moveTo(x + w, y + h - len);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x + w - len, y + h);
  ctx.moveTo(x + len, y + h);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x, y + h - len);
  ctx.stroke();
}

let tagFont = "monospace";

function drawTag(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fill: string,
  s: number
) {
  ctx.font = `500 ${Math.round(11 * Math.max(0.85, s))}px ${tagFont}`;
  const padX = 6 * s;
  const tw = ctx.measureText(text).width;
  const th = 18 * Math.max(0.85, s);
  ctx.fillStyle = fill;
  ctx.fillRect(x, y - th, tw + padX * 2, th);
  ctx.fillStyle = COLORS.ink;
  ctx.textBaseline = "middle";
  ctx.fillText(text, x + padX, y - th / 2 + 0.5);
}

export function InspectionLine({ className }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();
  // null until mounted so the server and first client render agree. The line
  // runs by default and starts paused when the visitor prefers reduced motion.
  const [playing, setPlaying] = React.useState<boolean | null>(null);
  const playingRef = React.useRef(false);
  const syncRef = React.useRef<() => void>(() => {});

  React.useEffect(() => {
    setPlaying(!reduceMotion);
  }, [reduceMotion]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let scale = 1;
    let raf = 0;
    let onScreen = true;
    let last = performance.now();
    let spawnIndex = 0;
    let nextId = 0;
    let beltOffset = 0;
    const items: Item[] = [];
    const pointer = { x: 0, y: 0, inside: false };

    const mono = getComputedStyle(canvas).getPropertyValue("--font-mono").trim();
    if (mono) tagFont = mono;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Fit the head, products and belt in the band height as well as the width.
      scale = Math.min(1.35, Math.max(0.6, Math.min(width / 1100, height / 268)));
    };

    const spacing = () => 172 * scale;
    const gateX = () => width * (width < 768 ? 0.5 : 0.58);
    const baseY = () => height - 34 * scale;

    const spawn = (x: number) => {
      const next = SEQUENCE[spawnIndex % SEQUENCE.length];
      spawnIndex += 1;
      items.push({
        id: nextId++,
        kind: next.kind,
        defect: next.defect,
        x,
        scan: 0,
        verdict: false,
        drop: -1,
      });
    };

    const seed = () => {
      items.length = 0;
      spawnIndex = 0;
      for (let x = width + 40; x > -80; x -= spacing()) spawn(x);
      // Products already past the head start with their verdict shown.
      items.forEach((item) => {
        if (item.x > gateX() + 30 * scale) {
          item.scan = 1;
          item.verdict = true;
          if (item.defect && item.x > gateX() + 150 * scale) item.drop = 99;
        }
      });
    };

    const update = (dt: number) => {
      const speed = 54 * scale;
      beltOffset = (beltOffset + speed * dt) % (24 * scale);
      const gx = gateX();
      const divertX = gx + 150 * scale;
      for (const item of items) {
        if (item.drop >= 0) {
          item.drop += dt;
          item.x += speed * dt * 0.6;
          continue;
        }
        item.x += speed * dt;
        const d = item.x - gx;
        const range = 30 * scale;
        if (d > -range && d < range) item.scan = (d + range) / (range * 2);
        if (d >= range && !item.verdict) {
          item.scan = 1;
          item.verdict = true;
        }
        if (item.defect && item.verdict && item.x >= divertX) item.drop = 0;
      }
      // recycle
      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        if (item.x > width + 120 || item.drop > 2.2) items.splice(i, 1);
      }
      const leftmost = items.reduce((m, it) => Math.min(m, it.drop >= 0 ? Infinity : it.x), Infinity);
      if (leftmost > -80 + spacing() || items.length === 0) spawn(Math.min(leftmost, width) - spacing());
    };

    const draw = () => {
      const s = scale;
      const by = baseY();
      const gx = gateX();
      ctx.clearRect(0, 0, width, height);

      // calibration dot field
      ctx.fillStyle = "rgba(20,164,156,0.16)";
      const step = 26 * s;
      for (let y = step; y < by - 10 * s; y += step) {
        for (let x = (step / 2) % step; x < width; x += step) {
          ctx.fillRect(x, y, 1.2, 1.2);
        }
      }

      // belt
      ctx.fillStyle = "rgba(250,250,249,0.05)";
      ctx.fillRect(0, by, width, 14 * s);
      ctx.strokeStyle = "rgba(250,250,249,0.35)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, by + 0.5);
      ctx.lineTo(width, by + 0.5);
      ctx.moveTo(0, by + 14 * s + 0.5);
      ctx.lineTo(width, by + 14 * s + 0.5);
      ctx.stroke();
      ctx.strokeStyle = "rgba(250,250,249,0.16)";
      ctx.beginPath();
      for (let x = -24 * s + beltOffset; x < width; x += 24 * s) {
        ctx.moveTo(x, by + 3 * s);
        ctx.lineTo(x + 8 * s, by + 11 * s);
      }
      ctx.stroke();

      // camera head geometry (from the AMV mark)
      const tallest = 92 * s;
      const apexY = by - tallest - 46 * s;
      const headW = 112 * s;
      const headH = 64 * s;
      const headTop = apexY - headH;

      // field of view fan
      const active = items.some((it) => it.scan > 0 && it.scan < 1 && it.drop < 0);
      const fan = ctx.createLinearGradient(0, apexY, 0, by);
      fan.addColorStop(0, `rgba(34,211,238,${active ? 0.34 : 0.14})`);
      fan.addColorStop(1, "rgba(34,211,238,0)");
      ctx.fillStyle = fan;
      ctx.beginPath();
      ctx.moveTo(gx, apexY);
      ctx.lineTo(gx + 44 * s, by);
      ctx.lineTo(gx - 44 * s, by);
      ctx.closePath();
      ctx.fill();

      // products
      for (const item of items) {
        ctx.save();
        if (item.drop >= 0) {
          // Diverted: tip off the far edge of the belt and fall away.
          const t = item.drop;
          ctx.globalAlpha = Math.max(0, 1 - t / 1.6);
          ctx.translate(item.x, by + 220 * s * t * t);
          ctx.rotate(Math.min(1.1, t * 1.2));
          ctx.translate(-item.x, -by);
        }
        drawProduct(ctx, item, by, s);
        ctx.restore();

        const { w, h } = size(item.kind, s);
        // scanline sweeping the product while under the head
        if (item.scan > 0 && item.scan < 1 && item.drop < 0) {
          const sy = by - h + h * item.scan;
          ctx.strokeStyle = COLORS.cyan;
          ctx.lineWidth = 2;
          ctx.shadowColor = COLORS.cyan;
          ctx.shadowBlur = 5;
          ctx.beginPath();
          ctx.moveTo(item.x - w / 2 - 8 * s, sy);
          ctx.lineTo(item.x + w / 2 + 8 * s, sy);
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        // verdict box
        if (item.verdict && item.drop < 0.6) {
          const pad = 8 * s;
          const bx = item.x - w / 2 - pad;
          const byTop = by - h - pad;
          const alpha = item.drop >= 0 ? Math.max(0, 1 - item.drop / 0.6) : 1;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 1.5;
          if (item.defect) {
            ctx.setLineDash([5 * s, 4 * s]);
            ctx.strokeStyle = COLORS.white;
          } else {
            ctx.setLineDash([]);
            ctx.strokeStyle = COLORS.teal;
          }
          ctx.strokeRect(bx, byTop, w + pad * 2, h + pad);
          ctx.setLineDash([]);
          drawTag(
            ctx,
            item.defect ? REJECT_LABEL[item.defect] : PASS_LABEL[item.kind],
            bx,
            byTop - 2,
            item.defect ? COLORS.white : COLORS.teal,
            s
          );
          ctx.globalAlpha = 1;
        }
      }

      // camera head: teal shards behind the inverted triangle
      ctx.fillStyle = COLORS.teal;
      ctx.beginPath();
      ctx.moveTo(gx - headW * 0.62, headTop + headH * 0.18);
      ctx.lineTo(gx - headW * 0.05, headTop + headH * 0.42);
      ctx.lineTo(gx + headW * 0.04, apexY + 6 * s);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(gx + headW * 0.2, headTop + headH * 0.02);
      ctx.lineTo(gx + headW * 0.66, headTop - headH * 0.22);
      ctx.lineTo(gx + headW * 0.36, headTop + headH * 0.3);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#201c20";
      ctx.strokeStyle = "rgba(250,250,249,0.55)";
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      ctx.moveTo(gx - headW / 2, headTop);
      ctx.lineTo(gx + headW / 2, headTop);
      ctx.lineTo(gx, apexY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // lens at the apex
      ctx.fillStyle = active ? COLORS.cyan : COLORS.teal;
      ctx.shadowColor = COLORS.cyan;
      ctx.shadowBlur = active ? 8 : 0;
      ctx.beginPath();
      ctx.arc(gx, apexY - 9 * s, 3.5 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // mount
      ctx.strokeStyle = "rgba(250,250,249,0.22)";
      ctx.beginPath();
      ctx.moveTo(gx, headTop);
      ctx.lineTo(gx, 0);
      ctx.stroke();

      // Pointer camera. The system cursor is hidden over the canvas, so the
      // reticle is drawn exactly at the pointer and stays visible while it
      // locks on to a product.
      if (pointer.inside) {
        const px = pointer.x;
        const py = pointer.y;
        const target = items.find((it) => {
          if (it.drop >= 0) return false;
          const { w, h } = size(it.kind, s);
          return px > it.x - w / 2 - 10 && px < it.x + w / 2 + 10 && py > by - h - 10 && py < by + 6;
        });
        ctx.strokeStyle = COLORS.cyan;
        ctx.lineWidth = 1.5;
        if (target) {
          const { w, h } = size(target.kind, s);
          const pad = 14 * s;
          drawBrackets(ctx, target.x - w / 2 - pad, by - h - pad, w + pad * 2, h + pad * 1.6, 10 * s);
          drawTag(ctx, KIND_LABEL[target.kind], target.x + w / 2 + pad + 6 * s, by - h - pad + 18 * s, COLORS.cyan, s);
        } else {
          ctx.globalAlpha = 0.8;
          drawBrackets(ctx, px - 18, py - 18, 36, 36, 8);
          ctx.globalAlpha = 1;
        }
        ctx.beginPath();
        ctx.moveTo(px - 6, py);
        ctx.lineTo(px + 6, py);
        ctx.moveTo(px, py - 6);
        ctx.lineTo(px, py + 6);
        ctx.stroke();
      }
    };

    const shouldRun = () =>
      playingRef.current && onScreen && document.visibilityState === "visible";

    const frame = (now: number) => {
      raf = 0;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      update(dt);
      draw();
      if (shouldRun()) raf = requestAnimationFrame(frame);
    };

    // Start or stop the loop to match play state and visibility. Only one
    // loop is ever scheduled; a stopped line keeps a current still frame.
    const sync = () => {
      if (shouldRun()) {
        if (!raf) {
          last = performance.now();
          raf = requestAnimationFrame(frame);
        }
      } else {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        draw();
      }
    };
    syncRef.current = sync;

    resize();
    seed();
    sync();

    const ro = new ResizeObserver(() => {
      resize();
      seed();
      if (!raf) draw();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    io.observe(canvas);

    document.addEventListener("visibilitychange", sync);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.inside = true;
      if (!raf) draw();
    };
    const onLeave = () => {
      pointer.inside = false;
      if (!raf) draw();
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      syncRef.current = () => {};
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  React.useEffect(() => {
    playingRef.current = !!playing;
    syncRef.current();
  }, [playing]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className={cn("block h-full w-full cursor-none", className)}
      />
      {playing !== null && (
        <div className="pointer-events-none absolute inset-x-0 top-2">
          <div className="container mx-auto flex justify-end px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={
                playing
                  ? "Pause the inspection line animation"
                  : "Play the inspection line animation"
              }
              className={cn(
                "pointer-events-auto inline-flex h-8 items-center gap-2 rounded-md border border-white/15 bg-ink/70 px-3 font-mono text-xs text-ink-soft backdrop-blur-sm",
                "transition-colors hover:border-accent-logo hover:text-white",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              )}
            >
              {playing ? (
                <Pause className="h-3.5 w-3.5 text-accent-logo" aria-hidden />
              ) : (
                <Play className="h-3.5 w-3.5 text-accent-logo" aria-hidden />
              )}
              {playing ? "Pause" : "Play"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
