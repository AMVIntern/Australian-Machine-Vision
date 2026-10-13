import * as React from "react";

/**
 * Line drawings for the inspection pipeline, in the vocabulary of the home
 * page inspection line: the AMV camera head, teal for a pass, a dashed white
 * outline for a reject. All decorative; the stage labels carry the meaning.
 */

const WHITE = "#fafaf9";
const TEAL = "#14a49c";
const CYAN = "#22d3ee";
const MARK = "#201c20";

type SvgProps = React.SVGProps<SVGSVGElement>;

function Belt({ y, x1 = 4, x2 = 116 }: { y: number; x1?: number; x2?: number }) {
  const ticks = [];
  for (let x = x1 + 2; x < x2 - 4; x += 8) ticks.push(`M${x},${y + 1.5}L${x + 3},${y + 4.5}`);
  return (
    <g>
      <path d={`M${x1},${y}H${x2}M${x1},${y + 6}H${x2}`} stroke={WHITE} strokeOpacity={0.35} />
      <path d={ticks.join("")} stroke={WHITE} strokeOpacity={0.16} />
    </g>
  );
}

/** 01 Camera and lighting: the AMV camera head over a product, flanked by bar lights. */
export function CapturePictogram(props: SvgProps) {
  // Unique per instance: the narrow and wide layouts both render, and a
  // gradient inside a hidden copy would not paint.
  const fan = `fan${React.useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 120 100" fill="none" aria-hidden {...props}>
      <defs>
        <linearGradient id={fan} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={CYAN} stopOpacity={0.4} />
          <stop offset="1" stopColor={CYAN} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d="M60,0V14" stroke={WHITE} strokeOpacity={0.22} />
      <polygon points="12,27 32,33 30,38 10,32" fill={WHITE} fillOpacity={0.1} stroke={WHITE} strokeOpacity={0.5} />
      <polygon points="108,27 88,33 90,38 110,32" fill={WHITE} fillOpacity={0.1} stroke={WHITE} strokeOpacity={0.5} />
      <polygon points="58,41 44,80 76,80" fill={`url(#${fan})`} />
      <polygon points="31,20 57,27 61,40" fill={TEAL} />
      <polygon points="69,14 91,8 77,25" fill={TEAL} />
      <polygon
        points="38,14 82,14 60,43"
        fill={MARK}
        stroke={WHITE}
        strokeOpacity={0.55}
        strokeWidth={1.25}
        strokeLinejoin="round"
      />
      <circle cx={60} cy={34} r={2.6} fill={CYAN} />
      <rect x={48} y={60} width={24} height={20} fill={WHITE} fillOpacity={0.06} stroke={TEAL} strokeWidth={1.5} />
      <rect x={52} y={67} width={16} height={4} fill={TEAL} fillOpacity={0.6} />
      <Belt y={80} />
    </svg>
  );
}

/** 02 Pre-processing: a calibration grid, lens distortion on the left, corrected on the right. */
export function PreparePictogram(props: SvgProps) {
  const bracket = (x: number, y: number, dx: number, dy: number) =>
    `M${x + dx * 9},${y}H${x}V${y + dy * 9}`;
  return (
    <svg viewBox="0 0 120 100" fill="none" aria-hidden {...props}>
      <rect x={14} y={16} width={92} height={68} fill={WHITE} fillOpacity={0.03} stroke={WHITE} strokeOpacity={0.2} />
      <g stroke={WHITE} strokeOpacity={0.45}>
        <path d="M31,18Q24,50 31,82" />
        <path d="M45.5,17Q42,50 45.5,83" />
        <path d="M15,37Q38,31 60,33" />
        <path d="M15,63Q38,69 60,67" />
      </g>
      <path d="M76,16V84M92,16V84M60,33H106M60,67H106" stroke={TEAL} strokeOpacity={0.9} />
      <path d="M14,50H106" stroke={WHITE} strokeOpacity={0.3} />
      <path d="M60,10V90" stroke={CYAN} strokeDasharray="2 3" />
      <g stroke={TEAL} strokeWidth={1.5}>
        <path d={bracket(14, 16, 1, 1)} />
        <path d={bracket(106, 16, -1, 1)} />
        <path d={bracket(14, 84, 1, -1)} />
        <path d={bracket(106, 84, -1, -1)} />
      </g>
    </svg>
  );
}

/** A dimension line between two witness lines: precise measurement. */
export function HalconGlyph(props: SvgProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M2,3V13M14,3V13M2.5,8H13.5M4.5,6L2.5,8L4.5,10M11.5,6L13.5,8L11.5,10" />
    </svg>
  );
}

/** A small trained network: inputs, a hidden layer, one output. */
export function DeepLearningGlyph(props: SvgProps) {
  const inputs = [
    [2.5, 5],
    [2.5, 11],
  ];
  const hidden = [
    [8, 3],
    [8, 8],
    [8, 13],
  ];
  const out = [13.5, 8];
  const lines = inputs.flatMap(([ix, iy]) => hidden.map(([hx, hy]) => `M${ix},${iy}L${hx},${hy}`));
  hidden.forEach(([hx, hy]) => lines.push(`M${hx},${hy}L${out[0]},${out[1]}`));
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path d={lines.join("")} stroke="currentColor" strokeOpacity={0.55} strokeWidth={0.8} />
      {[...inputs, ...hidden, out].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={1.5} fill="currentColor" />
      ))}
    </svg>
  );
}

/** An intensity step, the edge a rule-based check looks for. */
export function ClassicalGlyph(props: SvgProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M1.5,12.5H7V3.5H14.5" />
      <path d="M7,1.5V14.5" strokeOpacity={0.45} strokeWidth={1} strokeDasharray="1.5 1.5" />
    </svg>
  );
}

/** 03 Analysis, compact: the three lanes stacked, for the narrow layout. */
export function AnalysisPictogram(props: SvgProps) {
  return (
    <svg viewBox="0 0 120 100" fill="none" aria-hidden {...props}>
      {[22, 50, 78].map((y) => (
        <g key={y}>
          <rect x={12} y={y - 11} width={96} height={22} fill={WHITE} fillOpacity={0.04} stroke={WHITE} strokeOpacity={0.18} />
          <path d={`M42,${y}H100`} stroke={TEAL} strokeOpacity={0.5} strokeDasharray="3 3" />
        </g>
      ))}
      <g color={TEAL}>
        <HalconGlyph x={18} y={14} width={16} height={16} />
        <DeepLearningGlyph x={18} y={42} width={16} height={16} />
        <ClassicalGlyph x={18} y={70} width={16} height={16} />
      </g>
    </svg>
  );
}

/** 04 Inspection decision: a pass in solid teal, a fail in dashed white. */
export function DecidePictogram(props: SvgProps) {
  return (
    <svg viewBox="0 0 120 100" fill="none" aria-hidden {...props}>
      <rect x={16} y={36} width={36} height={36} fill={TEAL} fillOpacity={0.12} stroke={TEAL} strokeWidth={1.5} />
      <path d="M26,54.5L31.5,60L42.5,47.5" stroke={TEAL} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      <rect
        x={68}
        y={36}
        width={36}
        height={36}
        fill={WHITE}
        fillOpacity={0.04}
        stroke={WHITE}
        strokeOpacity={0.85}
        strokeWidth={1.5}
        strokeDasharray="4 3"
      />
      <path d="M79,47L93,61M93,47L79,61" stroke={WHITE} strokeOpacity={0.85} strokeWidth={2.5} strokeLinecap="round" />
      <Belt y={78} />
    </svg>
  );
}

/** 05 Line action: the pass travels on, the reject drops through a gate. */
export function ActionPictogram(props: SvgProps) {
  return (
    <svg viewBox="0 0 120 100" fill="none" aria-hidden {...props}>
      <Belt y={50} x1={4} x2={60} />
      <Belt y={50} x1={84} x2={116} />
      <path d="M60,56L70,74" stroke={TEAL} strokeWidth={2} strokeLinecap="round" />
      <path d="M58,78V95H104V78" stroke={WHITE} strokeOpacity={0.35} />
      <rect
        x={68}
        y={60}
        width={14}
        height={14}
        transform="rotate(22 75 67)"
        fill={WHITE}
        fillOpacity={0.04}
        stroke={WHITE}
        strokeOpacity={0.85}
        strokeWidth={1.4}
        strokeDasharray="3 2.5"
      />
      <rect x={92} y={33} width={18} height={17} fill={WHITE} fillOpacity={0.06} stroke={TEAL} strokeWidth={1.5} />
      <path d="M22,44H42M36,39L42,44L36,49" stroke={WHITE} strokeOpacity={0.4} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
