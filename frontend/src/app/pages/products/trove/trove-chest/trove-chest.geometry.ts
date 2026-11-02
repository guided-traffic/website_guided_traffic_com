// Isometric drawing of an open treasure chest. Its contents sink slowly while new artifacts drop in
// from above, so the chest stays about as full as it is. A pure function without the DOM: it
// computes every outline and every keyframe once; the browser plays the keyframes as SMIL
// animations, so no script runs for the motion.
//
// World units are SVG user units: x runs to the right and toward the viewer, z to the left and
// toward the viewer, y up. In isometric projection both ground axes fall at 30° and y stays
// vertical, so an artifact sinking in the world sinks by the same amount on screen.

type XZ = [number, number];
type Point2 = [number, number];

export type PartKind = 'face' | 'line' | 'hatch' | 'signal' | 'ink';

export interface Part {
  // face: filled with paper, hides what lies behind it; line and hatch: hairlines on a face;
  // signal: the lock's hasp; ink: its keyhole
  kind: PartKind;
  d: string;
}

export interface Keyframes {
  values: string;
  keyTimes: string;
  // Only for calcMode="spline"
  keySplines?: string;
}

export interface Artifact {
  // Id of the artifact's clip path; unique on the page
  id: string;
  slot: number;
  height: number;
  // Clip: everything above the content surface's front edge under the artifact, so the part that
  // has sunk below the surface is cut away
  cut: string;
  parts: Part[];
  // One SMIL cycle: drop, land, sink below the surface, wait for the next turn in this slot
  dur: string;
  begin: string;
  motion: Keyframes;
  fade: Keyframes;
  // Transform of the still pose shown under prefers-reduced-motion; null for an artifact that
  // waits for its turn in that pose
  still: string | null;
}

export interface Sparkle {
  d: string;
  dur: string;
  begin: string;
}

export interface Drawing {
  chest: Part[];
  artifacts: Artifact[];
  sparkles: Sparkle[];
}

export const VIEW = { x: -200, y: -440, width: 450, height: 680 };

// ─── Chest ───────────────────────────────────────────────────────────────────
// Footprint WIDTH × DEPTH on four feet; the rim band protrudes by LIP. The contents fill the
// opening flush with the rim, at height LEVEL.

const WIDTH = 260;
const DEPTH = 200;
const FEET = 12;
const FOOT = 28;
const LEVEL = 150;
const BAND = 30;
const LIP = 6;
const WALL = 10;
const PLANK = 30;
const PLATE = 24;
const HATCH = 9;

// ─── Motion ──────────────────────────────────────────────────────────────────
// Everything in the chest sinks at one speed, like a level going down. The next artifact of a
// slot lands the moment the previous one is gone, so the slot is never empty for long.

const SLOTS_X = 4;
const SLOTS_Z = 3;
const PER_SLOT = 3;
const SPEED = 2.2;
const DROP = 260;
const FALL = 1.2;
const BOUNCE = 5;
const SETTLE = 0.36;
const FADE_IN = 0.35;
const FADE_OUT = 0.35;

// Sparkles twinkle above the contents in the signal color
const SPARKLES = 7;
const SPARKLE = 6;

const COS30 = Math.cos(Math.PI / 6);
const SIN30 = 0.5;

export function drawChest(): Drawing {
  return { chest: chest(), artifacts: artifacts(), sparkles: sparkles() };
}

function chest(): Part[] {
  const top = LEVEL - BAND;
  const feet: [number, number][] = [
    [0, DEPTH - FOOT],
    [WIDTH - FOOT, DEPTH - FOOT],
    [WIDTH - FOOT, 0],
  ];
  const planks: number[] = [];
  for (let y = FEET + PLANK; y < top; y += PLANK) {
    planks.push(y);
  }
  const lock = WIDTH / 2;

  return [
    // The back foot hides under the body
    ...feet.flatMap(([x, z]) => [
      face(quadZ(z + FOOT, x, x + FOOT, 0, FEET)),
      face(quadX(x + FOOT, z, z + FOOT, 0, FEET)),
    ]),
    face(quadZ(DEPTH, 0, WIDTH, FEET, top)),
    face(quadX(WIDTH, 0, DEPTH, FEET, top)),
    ...planks.flatMap(y => [
      line(P(0, y, DEPTH), P(WIDTH, y, DEPTH)),
      line(P(WIDTH, y, DEPTH), P(WIDTH, y, 0)),
    ]),
    // Corner plates under the band at each visible vertical edge; the front edge carries one on
    // each side
    face(quadZ(DEPTH, 0, PLATE, top - PLATE, top)),
    face(quadZ(DEPTH, WIDTH - PLATE, WIDTH, top - PLATE, top)),
    face(quadX(WIDTH, DEPTH - PLATE, DEPTH, top - PLATE, top)),
    face(quadX(WIDTH, 0, PLATE, top - PLATE, top)),
    // The hasp hangs from under the band, which covers its upper end
    { kind: 'signal', d: polygon(quadZ(DEPTH, lock - 9, lock + 9, top - 28, top + 2)) },
    { kind: 'ink', d: segment(P(lock, top - 10, DEPTH), P(lock, top - 19, DEPTH)) },
    face(quadZ(DEPTH + LIP, -LIP, WIDTH + LIP, top, LEVEL)),
    face(quadX(WIDTH + LIP, -LIP, DEPTH + LIP, top, LEVEL)),
    face(quadZ(DEPTH + LIP, lock - 16, lock + 16, top + 6, LEVEL - 6)),
    face(rhombus(-LIP, WIDTH + LIP, -LIP, DEPTH + LIP)),
    ...surface(),
  ];
}

// The contents' surface inside the rim, hatched like a section in a technical drawing
function surface(): Part[] {
  const outline = rhombus(WALL, WIDTH - WALL, WALL, DEPTH - WALL);
  const ys = outline.map(([, y]) => y);
  const hatch: string[] = [];
  for (let y = Math.min(...ys) + HATCH; y < Math.max(...ys); y += HATCH) {
    const xs = crossings(outline, y);
    if (xs.length === 2) {
      hatch.push(`M${f(xs[0])} ${f(y)}H${f(xs[1])}`);
    }
  }
  return [face(outline), { kind: 'hatch', d: hatch.join('') }];
}

// ─── Artifacts ───────────────────────────────────────────────────────────────

type Shape = 'cube' | 'jar' | 'crate' | 'disc' | 'wedge' | 'tower' | 'nut';

const SHAPES: Shape[] = ['cube', 'jar', 'crate', 'disc', 'wedge', 'tower', 'nut'];

const HEIGHT: Record<Shape, number> = {
  cube: 38,
  jar: 42,
  crate: 28,
  disc: 14,
  wedge: 32,
  tower: 52,
  nut: 22,
};

function artifacts(): Artifact[] {
  const rand = random(7);
  const cellX = (WIDTH - 2 * WALL) / SLOTS_X;
  const cellZ = (DEPTH - 2 * WALL) / SLOTS_Z;

  const slots: { center: XZ; shapes: Shape[] }[] = [];
  for (let i = 0; i < SLOTS_X; i++) {
    for (let j = 0; j < SLOTS_Z; j++) {
      const s = slots.length;
      slots.push({
        center: [WALL + (i + 0.5) * cellX + jitter(rand), WALL + (j + 0.5) * cellZ + jitter(rand)],
        // Step 3 through seven shapes: three different ones per slot, a different mix per slot
        shapes: Array.from({ length: PER_SLOT }, (_, k) => SHAPES[(2 * s + 3 * k) % SHAPES.length]),
      });
    }
  }
  // Back to front: a slot further back is never drawn over one in front of it
  const order = slots.map((_, s) => s).sort((a, b) => depth(slots[a].center) - depth(slots[b].center));

  return order.flatMap(s => {
    const { center, shapes } = slots[s];
    const steps = shapes.map(shape => SETTLE + HEIGHT[shape] / SPEED);
    const period = steps.reduce((a, b) => a + b, 0);
    const phase = rand() * period;
    const stillDepth = 0.15 + 0.6 * rand();

    let offset = phase;
    return shapes.map((shape, k) => {
      const height = HEIGHT[shape];
      const { parts, cut } = artifact(shape, center, rand() * Math.PI * 2);
      const begin = (offset % period) - period;
      offset += steps[k];
      return {
        id: `trove-cut-${s}-${k}`,
        slot: s,
        height,
        cut,
        parts,
        dur: `${f(period, 3)}s`,
        begin: `${f(begin, 3)}s`,
        ...keyframes(height, period),
        still: k === 0 ? `translate(0 ${f(height * stillDepth)})` : null,
      };
    });
  });
}

// Drop from DROP above the surface, landing like a falling body; a small rebound; then a straight
// sink at SPEED until the top has passed the surface, fading over the last moments
function keyframes(height: number, period: number): { motion: Keyframes; fade: Keyframes } {
  const land = FALL;
  const sunk = FALL + SETTLE + height / SPEED;
  const t = (...times: number[]) => times.map(time => f(time / period, 4)).join(';');
  return {
    motion: {
      values: `0 ${-DROP};0 0;0 ${-BOUNCE};0 0;0 ${height};0 ${height}`,
      keyTimes: t(0, land, land + SETTLE / 2, land + SETTLE, sunk, period),
      // A cubic through (1/3, 0) and (2/3, 1/3) is exactly t², the path of a falling body
      keySplines: ['0.333 0 0.667 0.333', '0 0 0.58 1', '0.42 0 1 1', '0 0 1 1', '0 0 1 1'].join(';'),
    },
    fade: {
      values: '0;1;1;0;0',
      keyTimes: t(0, FADE_IN, sunk - FADE_OUT, sunk, period),
    },
  };
}

function artifact(shape: Shape, c: XZ, yaw: number): { parts: Part[]; cut: string } {
  const h = HEIGHT[shape];
  switch (shape) {
    case 'cube': {
      // A parcel: tape across the lid and down the sides
      const base = rect(c, 38, 38, yaw);
      const top = base.map(p => P3(p, LEVEL + h));
      const mids = top.map((p, i) => mid(p, top[(i + 1) % 4]));
      return {
        parts: [
          ...prism(base, h),
          line(mids[0], mids[2]),
          line(mids[1], mids[3]),
          ...visibleSides(base).map(([a, b]) => line(P3(midXZ(a, b), LEVEL), P3(midXZ(a, b), LEVEL + h))),
        ],
        cut: cutBelow(base),
      };
    }
    case 'crate': {
      // Lid boards along the long side, a batten around the middle
      const base = rect(c, 48, 32, yaw);
      const top = base.map(p => P3(p, LEVEL + h));
      const board = (u: number) => line(lerp(top[0], top[3], u), lerp(top[1], top[2], u));
      return {
        parts: [
          ...prism(base, h),
          board(1 / 3),
          board(2 / 3),
          ...visibleSides(base).map(([a, b]) => line(P3(a, LEVEL + h / 2), P3(b, LEVEL + h / 2))),
        ],
        cut: cutBelow(base),
      };
    }
    case 'tower': {
      // A tall box with a label band
      const base = rect(c, 26, 26, yaw);
      return {
        parts: [
          ...prism(base, h),
          ...visibleSides(base).flatMap(([a, b]) => [
            line(P3(a, LEVEL + h * 0.55), P3(b, LEVEL + h * 0.55)),
            line(P3(a, LEVEL + h * 0.75), P3(b, LEVEL + h * 0.75)),
          ]),
        ],
        cut: cutBelow(base),
      };
    }
    case 'wedge': {
      const base = regular(c, 3, 30, yaw);
      return { parts: prism(base, h), cut: cutBelow(base) };
    }
    case 'nut': {
      // A hexagon nut: the bore shows as a ring on its top
      const base = regular(c, 6, 26, yaw);
      return { parts: [...prism(base, h), ellipse(c, 11, LEVEL + h, 'line')], cut: cutBelow(base) };
    }
    case 'jar': {
      // A lid and the shoulder line below it
      const r = 21;
      return {
        parts: [...cylinder(c, r, h), ellipse(c, r - 5, LEVEL + h, 'line'), frontArc(c, r, LEVEL + h - 7)],
        cut: cutBelowCircle(c, r),
      };
    }
    case 'disc': {
      // A coin: the raised rim shows as a second ring on its face
      const r = 26;
      return { parts: [...cylinder(c, r, h), ellipse(c, r - 5, LEVEL + h, 'line')], cut: cutBelowCircle(c, r) };
    }
  }
}

// ─── Sparkles ────────────────────────────────────────────────────────────────

function sparkles(): Sparkle[] {
  const rand = random(11);
  return Array.from({ length: SPARKLES }, () => {
    const [x, y] = P(
      WALL + rand() * (WIDTH - 2 * WALL),
      LEVEL + 60 + rand() * 110,
      WALL + rand() * (DEPTH - 2 * WALL),
    );
    const dur = 2.6 + rand() * 1.8;
    const h = SPARKLE / 2;
    return {
      d: `M${f(x - h)} ${f(y - h)}h${SPARKLE}v${SPARKLE}h${-SPARKLE}Z`,
      dur: `${f(dur, 2)}s`,
      begin: `${f(-rand() * dur, 2)}s`,
    };
  });
}

// ─── Solids ──────────────────────────────────────────────────────────────────
// Every artifact is a vertical prism or cylinder standing on the surface. Their cross-section
// does not change with height, so a fixed clip cuts them exactly where they meet the surface.

// Side faces turned toward the viewer, then the top
function prism(base: XZ[], h: number): Part[] {
  return [
    ...visibleSides(base).map(([a, b]) =>
      face([P3(a, LEVEL), P3(b, LEVEL), P3(b, LEVEL + h), P3(a, LEVEL + h)]),
    ),
    face(base.map(p => P3(p, LEVEL + h))),
  ];
}

function visibleSides(base: XZ[]): [XZ, XZ][] {
  const [cx, cz] = centroid(base);
  return base
    .map((a, i): [XZ, XZ] => [a, base[(i + 1) % base.length]])
    .filter(([a, b]) => {
      // Outward normal of the edge; the viewer looks from +x, +z
      let nx = b[1] - a[1];
      let nz = a[0] - b[0];
      if (nx * ((a[0] + b[0]) / 2 - cx) + nz * ((a[1] + b[1]) / 2 - cz) < 0) {
        nx = -nx;
        nz = -nz;
      }
      return nx + nz > 1e-9;
    });
}

function cylinder(c: XZ, r: number, h: number): Part[] {
  const [rx, ry] = radii(r);
  const [x, yTop] = P3(c, LEVEL + h);
  const yBottom = yTop + h;
  const l = f(x - rx);
  const rr = f(x + rx);
  return [
    // Sides down to the front half of the bottom ellipse, closed over the back half of the top
    {
      kind: 'face',
      d:
        `M${l} ${f(yTop)}V${f(yBottom)}A${f(rx)} ${f(ry)} 0 0 0 ${rr} ${f(yBottom)}` +
        `V${f(yTop)}A${f(rx)} ${f(ry)} 0 0 0 ${l} ${f(yTop)}Z`,
    },
    ellipse(c, r, LEVEL + h, 'face'),
  ];
}

function ellipse(c: XZ, r: number, y: number, kind: PartKind): Part {
  const [rx, ry] = radii(r);
  const [x, sy] = P3(c, y);
  const arc = `A${f(rx)} ${f(ry)} 0 1 0`;
  return { kind, d: `M${f(x - rx)} ${f(sy)}${arc} ${f(x + rx)} ${f(sy)}${arc} ${f(x - rx)} ${f(sy)}Z` };
}

function frontArc(c: XZ, r: number, y: number): Part {
  const [rx, ry] = radii(r);
  const [x, sy] = P3(c, y);
  return { kind: 'line', d: `M${f(x - rx)} ${f(sy)}A${f(rx)} ${f(ry)} 0 0 0 ${f(x + rx)} ${f(sy)}` };
}

// A horizontal circle of radius r projects to an upright ellipse
function radii(r: number): [number, number] {
  return [r * Math.SQRT2 * COS30, r * Math.SQRT2 * SIN30];
}

// ─── Clips ───────────────────────────────────────────────────────────────────
// The region above the front half of the footprint's outline on the surface. CUT_SLACK keeps the
// full stroke of an outline lying on the edge; the cut sits that much below the surface.

const CUT_SLACK = 1;

function cutBelow(base: XZ[]): string {
  const points = base.map(p => P3(p, LEVEL));
  const front = frontChain(points);
  const chain = front.map(([x, y]) => `L${f(x)} ${f(y + CUT_SLACK)}`).join('');
  return cutPath(front[0], chain, front[front.length - 1]);
}

function cutBelowCircle(c: XZ, r: number): string {
  const [rx, ry] = radii(r);
  const [x, y] = P3(c, LEVEL);
  const left: Point2 = [x - rx, y];
  const right: Point2 = [x + rx, y];
  const s = CUT_SLACK;
  const chain = `L${f(left[0])} ${f(y + s)}A${f(rx)} ${f(ry + s)} 0 0 0 ${f(right[0])} ${f(y + s)}`;
  return cutPath(left, chain, right);
}

function cutPath(left: Point2, chain: string, right: Point2): string {
  const s = CUT_SLACK;
  const top = f(VIEW.y - 10);
  return `M${f(left[0] - s)} ${f(left[1] + s)}${chain}L${f(right[0] + s)} ${f(right[1] + s)}V${top}H${f(left[0] - s)}Z`;
}

// The lower half of a convex outline on screen, from its leftmost to its rightmost point
function frontChain(points: Point2[]): Point2[] {
  const n = points.length;
  const pick = (better: (a: Point2, b: Point2) => boolean) =>
    points.reduce((best, p, i) => (better(p, points[best]) ? i : best), 0);
  // Ties on x (an edge seen upright) resolve to the lower point
  const left = pick((a, b) => a[0] < b[0] - 1e-6 || (Math.abs(a[0] - b[0]) <= 1e-6 && a[1] > b[1]));
  const right = pick((a, b) => a[0] > b[0] + 1e-6 || (Math.abs(a[0] - b[0]) <= 1e-6 && a[1] > b[1]));
  const walk = (dir: number): Point2[] => {
    const out: Point2[] = [points[left]];
    for (let i = left; i !== right; ) {
      i = (i + dir + n) % n;
      out.push(points[i]);
    }
    return out;
  };
  const a = walk(1);
  const b = walk(-1);
  const meanY = (chain: Point2[]) => chain.reduce((sum, [, y]) => sum + y, 0) / chain.length;
  return meanY(a) >= meanY(b) ? a : b;
}

// ─── Footprints ──────────────────────────────────────────────────────────────

function rect([cx, cz]: XZ, w: number, d: number, yaw: number): XZ[] {
  return (
    [
      [-w / 2, -d / 2],
      [w / 2, -d / 2],
      [w / 2, d / 2],
      [-w / 2, d / 2],
    ] as XZ[]
  ).map(([x, z]) => rotate(x, z, yaw, cx, cz));
}

function regular([cx, cz]: XZ, n: number, r: number, yaw: number): XZ[] {
  return Array.from({ length: n }, (_, i) => {
    const a = yaw + (i * 2 * Math.PI) / n;
    return [cx + r * Math.cos(a), cz + r * Math.sin(a)];
  });
}

function rotate(x: number, z: number, yaw: number, cx: number, cz: number): XZ {
  const c = Math.cos(yaw);
  const s = Math.sin(yaw);
  return [cx + x * c - z * s, cz + x * s + z * c];
}

function centroid(points: XZ[]): XZ {
  const n = points.length;
  return [points.reduce((s, p) => s + p[0], 0) / n, points.reduce((s, p) => s + p[1], 0) / n];
}

function midXZ(a: XZ, b: XZ): XZ {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
}

function depth([x, z]: XZ): number {
  return x + z;
}

function jitter(rand: () => number): number {
  return (rand() - 0.5) * 4;
}

// ─── Projection ──────────────────────────────────────────────────────────────

function P(x: number, y: number, z: number): Point2 {
  return [(x - z) * COS30, (x + z) * SIN30 - y];
}

function P3([x, z]: XZ, y: number): Point2 {
  return P(x, y, z);
}

// A rectangle on the plane z = const, spanning x0..x1 and y0..y1
function quadZ(z: number, x0: number, x1: number, y0: number, y1: number): Point2[] {
  return [P(x0, y0, z), P(x1, y0, z), P(x1, y1, z), P(x0, y1, z)];
}

// A rectangle on the plane x = const, spanning z0..z1 and y0..y1
function quadX(x: number, z0: number, z1: number, y0: number, y1: number): Point2[] {
  return [P(x, y0, z0), P(x, y0, z1), P(x, y1, z1), P(x, y1, z0)];
}

// The horizontal rectangle x0..x1 × z0..z1 at the content level
function rhombus(x0: number, x1: number, z0: number, z1: number): Point2[] {
  return [P(x0, LEVEL, z0), P(x1, LEVEL, z0), P(x1, LEVEL, z1), P(x0, LEVEL, z1)];
}

function mid(a: Point2, b: Point2): Point2 {
  return lerp(a, b, 0.5);
}

function lerp(a: Point2, b: Point2, u: number): Point2 {
  return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];
}

// x positions where the horizontal line at y crosses a convex outline
function crossings(outline: Point2[], y: number): number[] {
  const xs: number[] = [];
  outline.forEach((a, i) => {
    const b = outline[(i + 1) % outline.length];
    if ((a[1] - y) * (b[1] - y) < 0) {
      xs.push(a[0] + ((y - a[1]) / (b[1] - a[1])) * (b[0] - a[0]));
    }
  });
  return xs.sort((p, q) => p - q);
}

// Deterministic pseudo-random numbers in [0, 1) (mulberry32), so every render draws the same scene
function random(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ─── Path strings ────────────────────────────────────────────────────────────

function face(points: Point2[]): Part {
  return { kind: 'face', d: polygon(points) };
}

function line(a: Point2, b: Point2): Part {
  return { kind: 'line', d: segment(a, b) };
}

function f(n: number, digits = 1): string {
  return n.toFixed(digits);
}

function segment([ax, ay]: Point2, [bx, by]: Point2): string {
  return `M${f(ax)} ${f(ay)}L${f(bx)} ${f(by)}`;
}

function polygon(points: Point2[]): string {
  return points.map(([x, y], i) => `${i ? 'L' : 'M'}${f(x)} ${f(y)}`).join('') + 'Z';
}
