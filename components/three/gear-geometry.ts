/**
 * Geometry of the machined spur gear in the hero, in plain numbers so the 3D
 * scene, the laser profile readout and the no-WebGL drawing share one source.
 *
 * Units are arbitrary scene units. Shape coordinates are the gear's top-view
 * plane (x right, y up); thickness rises along the scene's +y axis.
 */

export const GEAR = {
  teeth: 24,
  rootR: 0.9,
  tipR: 1.06,
  web: 0.2, // disc thickness
  hubR: 0.36,
  hubH: 0.12, // hub height above the disc
  boreR: 0.19,
  keyW: 0.09,
  keyD: 0.06,
  holes: 5,
  holeInner: 0.47,
  holeOuter: 0.71,
  holeSpan: 0.72, // radians between the two end-cap centres of a kidney slot
};

const TAU = Math.PI * 2;

const smoothstep = (a: number, b: number, x: number) => {
  const k = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return k * k * (3 - 2 * k);
};

/** Outline radius at angle theta: rounded trapezoid teeth. */
export function toothRadius(theta: number): number {
  const period = TAU / GEAR.teeth;
  let u = (theta / period) % 1;
  if (u < 0) u += 1;
  let t: number;
  if (u < 0.2) t = smoothstep(0, 0.2, u);
  else if (u < 0.48) t = 1;
  else if (u < 0.68) t = 1 - smoothstep(0.48, 0.68, u);
  else t = 0;
  return GEAR.rootR + (GEAR.tipR - GEAR.rootR) * t;
}

/** Closed outline of the gear, counter-clockwise. */
export function outlinePoints(samplesPerTooth = 18): [number, number][] {
  const n = GEAR.teeth * samplesPerTooth;
  const pts: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const th = (i / n) * TAU;
    const r = toothRadius(th);
    pts.push([Math.cos(th) * r, Math.sin(th) * r]);
  }
  return pts;
}

const holeAngle = (k: number) => Math.PI / 2 + (k * TAU) / GEAR.holes + TAU / (GEAR.holes * 2);

/**
 * Kidney-shaped lightening slot k, as a closed outline. `grow` offsets the
 * outline outward, for overlays drawn just around the real edge.
 */
export function kidneyPoints(k: number, segments = 28, grow = 0): [number, number][] {
  const c = holeAngle(k);
  const a0 = c - GEAR.holeSpan / 2;
  const a1 = c + GEAR.holeSpan / 2;
  const mid = (GEAR.holeInner + GEAR.holeOuter) / 2;
  const capR = (GEAR.holeOuter - GEAR.holeInner) / 2 + grow;
  const outer = GEAR.holeOuter + grow;
  const inner = GEAR.holeInner - grow;
  const pts: [number, number][] = [];
  // outer arc, a0 -> a1
  for (let i = 0; i <= segments; i++) {
    const a = a0 + ((a1 - a0) * i) / segments;
    pts.push([Math.cos(a) * outer, Math.sin(a) * outer]);
  }
  // end cap around the a1 centre, outer -> inner
  const c1: [number, number] = [Math.cos(a1) * mid, Math.sin(a1) * mid];
  for (let i = 1; i < segments / 2; i++) {
    const a = a1 + (Math.PI * i) / (segments / 2);
    pts.push([c1[0] + Math.cos(a) * capR, c1[1] + Math.sin(a) * capR]);
  }
  // inner arc, a1 -> a0
  for (let i = 0; i <= segments; i++) {
    const a = a1 - ((a1 - a0) * i) / segments;
    pts.push([Math.cos(a) * inner, Math.sin(a) * inner]);
  }
  // start cap around the a0 centre, inner -> outer
  const c0: [number, number] = [Math.cos(a0) * mid, Math.sin(a0) * mid];
  for (let i = 1; i < segments / 2; i++) {
    const a = a0 + Math.PI + (Math.PI * i) / (segments / 2);
    pts.push([c0[0] + Math.cos(a) * capR, c0[1] + Math.sin(a) * capR]);
  }
  return pts;
}

/** Bore with a keyway notch at the top, as a closed outline. */
export function borePoints(segments = 64): [number, number][] {
  const { boreR, keyW, keyD } = GEAR;
  const hx = keyW / 2;
  const hy = Math.sqrt(boreR * boreR - hx * hx);
  const start = Math.atan2(hy, -hx); // left edge of the notch
  const end = Math.atan2(hy, hx) + TAU; // right edge, the long way round
  const pts: [number, number][] = [];
  for (let i = 0; i <= segments; i++) {
    const a = start + ((end - start) * i) / segments;
    pts.push([Math.cos(a) * boreR, Math.sin(a) * boreR]);
  }
  pts.push([hx, boreR + keyD], [-hx, boreR + keyD]);
  return pts;
}

export function circlePoints(r: number, segments = 96): [number, number][] {
  const pts: [number, number][] = [];
  for (let i = 0; i < segments; i++) {
    const a = (i / segments) * TAU;
    pts.push([Math.cos(a) * r, Math.sin(a) * r]);
  }
  return pts;
}

function inKidney(x: number, y: number): boolean {
  const rho = Math.hypot(x, y);
  const th = Math.atan2(y, x);
  const mid = (GEAR.holeInner + GEAR.holeOuter) / 2;
  const capR = (GEAR.holeOuter - GEAR.holeInner) / 2;
  for (let k = 0; k < GEAR.holes; k++) {
    const c = holeAngle(k);
    let d = th - c;
    d = Math.atan2(Math.sin(d), Math.cos(d));
    if (Math.abs(d) <= GEAR.holeSpan / 2 && rho >= GEAR.holeInner && rho <= GEAR.holeOuter) return true;
    for (const e of [c - GEAR.holeSpan / 2, c + GEAR.holeSpan / 2]) {
      if (Math.hypot(x - Math.cos(e) * mid, y - Math.sin(e) * mid) <= capR) return true;
    }
  }
  return false;
}

function inBore(x: number, y: number): boolean {
  if (Math.hypot(x, y) < GEAR.boreR) return true;
  return Math.abs(x) < GEAR.keyW / 2 && y > 0 && y < GEAR.boreR + GEAR.keyD;
}

/** Height of the part's top surface above the table at a top-view point. */
export function surfaceHeight(x: number, y: number): number {
  const rho = Math.hypot(x, y);
  if (rho > GEAR.tipR) return 0;
  if (rho > toothRadius(Math.atan2(y, x))) return 0;
  if (inBore(x, y) || inKidney(x, y)) return 0;
  return rho < GEAR.hubR ? GEAR.web + GEAR.hubH : GEAR.web;
}

export const MAX_HEIGHT = GEAR.web + GEAR.hubH;

/** SVG path data for a closed outline, scaled and flipped to screen space. */
export function svgPath(pts: [number, number][], scale: number, cx: number, cy: number): string {
  return (
    pts
      .map(([x, y], i) => `${i ? "L" : "M"}${(cx + x * scale).toFixed(2)} ${(cy - y * scale).toFixed(2)}`)
      .join("") + "Z"
  );
}
