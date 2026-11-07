// The trove hero as a technical drawing: the public registries above and the own S3 store below
// feed one hub. Remote artifacts rest on its upper shelf, local ones on its lower; the bus between
// the shelves is the virtual repository that serves both through every endpoint. A scan beam
// turns over the hub and marks each artifact the moment it passes it, and once per loop it
// catches a malicious one. Clients dock at the endpoints, take an artifact and fly off.
// Everything is computed once, the outlines and the SMIL keyframes of every moving part.
import { ICONS, IconName } from './trove-flow.icons';

export type Point = [number, number];

export type PartKind = 'face' | 'edge' | 'line' | 'dash' | 'slot' | 'dot';

export interface Part {
  // face: filled with paper, hides what lies behind it; edge: a line as dark as a face's outline;
  // line: a lighter hairline; dash: a dashed connector; slot: the dotted outline of an empty
  // place on a shelf; dot: a filled junction
  kind: PartKind;
  d: string;
}

export interface Label {
  x: number;
  y: number;
  text: string;
  anchor: 'start' | 'middle';
  // print: lettering on the S3 store itself, larger than the callouts
  print?: boolean;
}

export interface Arc {
  id: string;
  d: string;
  text: string;
}

// SMIL keyframes; keyTimes run from 0 to 1 over one loop
export interface Frames {
  values: string;
  keyTimes: string;
  keySplines?: string;
}

// Every actor runs from 0s, its phase in the loop baked into its keyframes
export interface Actor {
  dur: string;
  motion: Frames;
  fade: Frames;
  // Transform in the still pose, null where the actor is not part of it
  still: string | null;
}

export interface Client extends Actor {
  name: IconName;
  label: string;
  icon: string;
  port: number;
  // Opacity of the check on its corner, set once it has its artifact
  mark: Frames;
}

export interface Artifact extends Actor {
  slot: number;
  // Index of the client that takes it, null for the malicious one the scan blocks
  client: number | null;
  // Opacity of its check mark, or of its cross when it is blocked; the check passes to the
  // client with the artifact
  mark: Frames;
  // Whether the still pose shows its mark: on the shelf, not on a client's corner
  marked: boolean;
}

export interface Meridian {
  values: string;
  keyTimes: string;
  still: number;
}

export interface Drawing {
  parts: Part[];
  labels: Label[];
  arcs: Arc[];
  beam: { line: string; wedge: string; turn: string; dur: string };
  globe: { x: number; y: number; r: number; dur: string; meridians: Meridian[] };
  parcel: { body: string; edges: string; check: string; cross: string };
  tile: { body: string; check: string };
  clients: Client[];
  artifacts: Artifact[];
}

export const VIEW = { x: 0, y: 0, width: 520, height: 800 };

// ─── Timing ──────────────────────────────────────────────────────────────────
// Eight events 2.5s apart: seven clients and the one blocked artifact. The beam turns four times
// per loop, so each mark it sets falls on the same pass in every loop.
const STEP = 2.5;
const EVENTS = 8;
export const LOOP = STEP * EVENTS;
export const SWEEP = LOOP / 4;
// The beam points up at 0s and turns clockwise
export const BEAM_START = -90;

// Seconds after an event starts: the client arrives at its dock, the artifact leaves its slot and
// reaches the client, the client hops once and flies off
const DOCKED = 1.2;
const HANDOVER = 1.4;
const TAKEN = 2.5;
const HOP_TOP = 2.65;
const HOP_DOWN = 2.85;
const LEAVE = 3.05;
const GONE = 4.25;
// The beam marks an artifact before its client docks, and it arrives on its shelf shortly before
const DEADLINE = 1.25;
const SETTLE = 0.3;
// The longest an artifact waits on its shelf for its client
const WAIT = 8;
// The blocked artifact stays crossed out this long, then sinks out of sight
const BLOCK_FADE = 1.4;
const BLOCK_SINK = 0.5;
const FADE = 0.3;
// An actor jumps back to its start this fast, while it is parked and unseen
const JUMP = 0.005;
const EPSILON = 1e-6;

// Units per second from a source to a shelf
const DROP = 120;
const HOP = 8;
const MERIDIAN_TURN = 16;

// ─── Layout ──────────────────────────────────────────────────────────────────
export const HUB = { x: 210, y: 410, r: 118 };
const TICK_IN = 122;
const TICK_MINOR = 127;
const TICK_MAJOR = 132;
const ARC_R = 142;
const GLOBE = { x: 210, y: 112, r: 54 };
const STORE = { x: 210, top: 650, rx: 60, ry: 14, height: 76 };

// Both shelves lie this far from the bus, three slots each
const SHELF = 50;
const SLOT_X = [-35, 15, 65];
const BRANCH_X = 280;

const PORTS = [
  { label: '/api/npm/', angle: -32 },
  { label: '/api/nuget/', angle: 0 },
  { label: '/files/', angle: 32 },
];
const SOCKET_X = 440;
export const DOCK_X = 470;
// Clients wait outside the drawing, beyond the frame that clips it
export const PARK_X = 600;
// A client tile is 44 wide; the artifact it takes sits on its lower left corner
export const TILE = 22;
export const CARRY: Point = [-22, 16];

const CLIENTS: { name: IconName; label: string; port: number }[] = [
  { name: 'npm', label: 'npm', port: 0 },
  { name: 'dotnet', label: 'dotnet', port: 1 },
  { name: 'curl', label: 'curl', port: 2 },
  { name: 'pnpm', label: 'pnpm', port: 0 },
  { name: 'nuget', label: 'nuget', port: 1 },
  { name: 'browser', label: 'browser', port: 2 },
  { name: 'yarn', label: 'yarn', port: 0 },
];

// Even events draw from the public registries, odd ones from the own store; the blocked artifact,
// the last event, comes from the public side
const BLOCKED = CLIENTS.length;

const LINEAR = '0 0 1 1';
const EASE_IN = '0.42 0 1 1';
const EASE_OUT = '0 0 0.58 1';

function rad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function mod(a: number, n: number): number {
  return ((a % n) + n) % n;
}

function fmt(n: number): string {
  return String(Math.round(n * 100) / 100);
}

function polar(r: number, deg: number): Point {
  return [HUB.x + r * Math.cos(rad(deg)), HUB.y + r * Math.sin(rad(deg))];
}

function pt([x, y]: Point): string {
  return `${fmt(x)} ${fmt(y)}`;
}

function polyline(points: Point[]): string {
  return points.map((p, i) => `${i ? 'L' : 'M'}${pt(p)}`).join(' ');
}

function circle([x, y]: Point, r: number): string {
  return `M${fmt(x - r)} ${fmt(y)} A${fmt(r)} ${fmt(r)} 0 1 1 ${fmt(x + r)} ${fmt(y)} A${fmt(r)} ${fmt(r)} 0 1 1 ${fmt(x - r)} ${fmt(y)} Z`;
}

function distance(a: Point, b: Point): number {
  return Math.hypot(b[0] - a[0], b[1] - a[1]);
}

// ─── Slots and ports ─────────────────────────────────────────────────────────
// Slots 0-2 are the upper shelf (remote), 3-5 the lower (local); the angle is where the beam
// points when it crosses a slot
export const SLOTS = [-SHELF, SHELF].flatMap(dy =>
  SLOT_X.map(dx => {
    const at: Point = [HUB.x + dx, HUB.y + dy];
    return { at, angle: (Math.atan2(dy, dx) * 180) / Math.PI };
  }),
);

function portRing(port: number): Point {
  return polar(HUB.r, PORTS[port].angle);
}

export function dock(port: number): Point {
  return [DOCK_X, portRing(port)[1]];
}

// The first time the beam points at an angle, within the first turn
function firstPass(angle: number): number {
  return (mod(angle - BEAM_START, 360) / 360) * SWEEP;
}

// ─── Keyframes ───────────────────────────────────────────────────────────────
// Collects an actor's moves and opacities in loop seconds, from its origin to one loop later
class Track {
  private readonly moves: { t: number; p: Point; spline: string }[];
  private readonly fades: { t: number; v: number }[];

  constructor(
    readonly origin: number,
    start: Point,
  ) {
    this.moves = [{ t: origin, p: start, spline: LINEAR }];
    this.fades = [{ t: origin, v: 0 }];
  }

  get at(): Point {
    return this.moves[this.moves.length - 1].p;
  }

  get now(): number {
    return this.moves[this.moves.length - 1].t;
  }

  move(t: number, p: Point, spline = LINEAR): this {
    this.moves.push({ t, p, spline });
    return this;
  }

  hold(t: number): this {
    return this.move(t, this.at);
  }

  // Along a polyline at one speed, easing in on the first leg and out on the last
  path(points: Point[], until: number): this {
    const legs = points.map((p, i) => distance(i ? points[i - 1] : this.at, p));
    const total = legs.reduce((a, b) => a + b, 0);
    const from = this.now;
    let walked = 0;
    points.forEach((p, i) => {
      walked += legs[i];
      const spline = points.length === 1 ? '0.42 0 0.58 1' : i === 0 ? EASE_IN : i === points.length - 1 ? EASE_OUT : LINEAR;
      this.move(from + ((until - from) * walked) / total, p, spline);
    });
    return this;
  }

  show(t: number, v: number): this {
    this.fades.push({ t, v });
    return this;
  }

  // The state at a loop second; the eased legs run between the same points, so a still pose
  // taken at a keyframe is exact
  position(t: number): Point {
    const i = this.moves.findIndex(m => m.t >= t);
    if (i === -1) return this.at;
    if (i === 0) return this.moves[0].p;
    const a = this.moves[i - 1];
    const b = this.moves[i];
    const f = (t - a.t) / (b.t - a.t);
    return [a.p[0] + (b.p[0] - a.p[0]) * f, a.p[1] + (b.p[1] - a.p[1]) * f];
  }

  // One loop of keyframes from 0s to the loop's end. The actor ends where it is parked and
  // returns to its start within a few milliseconds, unseen.
  done(still: number | null): Actor {
    const at = still === null ? null : this.position(still);
    const moves = cycle([
      ...this.moves.map(m => ({ t: m.t, v: m.p, spline: m.spline })),
      { t: this.origin + LOOP - JUMP, v: this.at, spline: LINEAR },
      { t: this.origin + LOOP, v: this.moves[0].p, spline: LINEAR },
    ]);
    return {
      dur: `${LOOP}s`,
      motion: {
        values: moves.map(k => pt(k.v as Point)).join(';'),
        keyTimes: keyTimes(moves),
        keySplines: moves
          .slice(1)
          .map(k => k.spline)
          .join(';'),
      },
      fade: opacity(this.fades),
      still: at && `translate(${pt(at)})`,
    };
  }
}

interface Key {
  t: number;
  v: number[];
  // The easing of the leg that ends at this key
  spline: string;
}

// Every actor starts at 0s: a begin offset set after the SVG's timeline has started does not
// move an animation that is already running, so the offset lives in the keyframes instead. One
// loop of keys, starting at any loop second, is rotated to start at 0s; the leg that runs over
// the loop's end is split there, its easing curve included.
function cycle(keys: Key[]): Key[] {
  const phase = mod(keys[0].t, LOOP);
  const keyed = keys.map(k => ({ ...k, t: k.t - keys[0].t + phase }));
  if (phase < EPSILON || LOOP - phase < EPSILON) {
    return keyed.map(k => ({ ...k, t: k.t - keyed[0].t }));
  }
  const i = keyed.findIndex(k => k.t >= LOOP - EPSILON);
  const a = keyed[i - 1];
  const b = keyed[i];
  const wrapped = keyed.slice(i + 1).map(k => ({ ...k, t: k.t - LOOP }));
  // keyed[0] sits where the wrapped part ends, in the same state
  const unwrapped = keyed.slice(1, i);
  if (b.t - LOOP < EPSILON) {
    return [{ t: 0, v: b.v, spline: LINEAR }, ...wrapped, ...unwrapped, { ...b, t: LOOP }];
  }
  const [left, right, progress] = split(b.spline, (LOOP - a.t) / (b.t - a.t));
  const v = a.v.map((x, j) => x + (b.v[j] - x) * progress);
  return [
    { t: 0, v, spline: LINEAR },
    { ...b, t: b.t - LOOP, spline: right },
    ...wrapped,
    ...unwrapped,
    { t: LOOP, v, spline: left },
  ];
}

// Splits an easing curve at a fraction of its leg's time: the curves of both parts, each
// normalized to its own part, and the progress reached at the split
function split(spline: string, time: number): [string, string, number] {
  const [x1, y1, x2, y2] = spline.split(' ').map(Number);
  const curve = (c1: number, c2: number, s: number) => 3 * (1 - s) ** 2 * s * c1 + 3 * (1 - s) * s * s * c2 + s ** 3;
  // x rises monotonically for control points inside the unit square; bisect for the parameter
  let lo = 0;
  let hi = 1;
  for (let n = 0; n < 50; n++) {
    const mid = (lo + hi) / 2;
    if (curve(x1, x2, mid) < time) lo = mid;
    else hi = mid;
  }
  const s = (lo + hi) / 2;
  const lerp = (p: Point, q: Point): Point => [p[0] + (q[0] - p[0]) * s, p[1] + (q[1] - p[1]) * s];
  // de Casteljau
  const q0 = lerp([0, 0], [x1, y1]);
  const q1 = lerp([x1, y1], [x2, y2]);
  const q2 = lerp([x2, y2], [1, 1]);
  const r0 = lerp(q0, q1);
  const r1 = lerp(q1, q2);
  const [mx, my] = lerp(r0, r1);
  const unit = (points: Point[], [ox, oy]: Point, w: number, h: number) =>
    points.map(([x, y]) => `${unitFmt((x - ox) / w)} ${unitFmt((y - oy) / h)}`).join(' ');
  const left = my > EPSILON ? unit([q0, r0], [0, 0], mx, my) : LINEAR;
  const right = my < 1 - EPSILON ? unit([r1, q2], [mx, my], 1 - mx, 1 - my) : LINEAR;
  return [left, right, my];
}

function unitFmt(n: number): string {
  return String(Math.round(Math.min(1, Math.max(0, n)) * 10000) / 10000);
}

function keyTimes(keys: Key[]): string {
  return keys.map(k => String(Math.round((k.t / LOOP) * 100000) / 100000)).join(';');
}

function opacity(fades: { t: number; v: number }[]): Frames {
  const keys = cycle([
    ...fades.map(f => ({ t: f.t, v: [f.v], spline: LINEAR })),
    { t: fades[0].t + LOOP, v: [fades[0].v], spline: LINEAR },
  ]);
  return { values: keys.map(k => fmt(k.v[0])).join(';'), keyTimes: keyTimes(keys) };
}

// ─── Structure ───────────────────────────────────────────────────────────────
function structure(): Part[] {
  const parts: Part[] = [];
  const g = GLOBE;

  // Public registries: a globe, its parallels as chords; the meridians turn
  parts.push({ kind: 'face', d: circle([g.x, g.y], g.r) });
  const chords = [-30, 0, 30].map(lat => {
    const y = g.y + g.r * Math.sin(rad(lat));
    const half = g.r * Math.cos(rad(lat));
    return `M${fmt(g.x - half)} ${fmt(y)} H${fmt(g.x + half)}`;
  });
  parts.push({ kind: 'line', d: chords.join(' ') });

  // Connectors from both sources into the hub
  parts.push({ kind: 'dash', d: `M${g.x} ${g.y + g.r} V${HUB.y - TICK_MAJOR}` });
  parts.push({ kind: 'dash', d: `M${STORE.x} ${STORE.top - STORE.ry} V${HUB.y + TICK_MAJOR}` });

  // The own store: an S3 cylinder with one seam
  const s = STORE;
  const bottom = s.top + s.height;
  parts.push({
    kind: 'face',
    d: `M${s.x - s.rx} ${s.top} V${bottom} A${s.rx} ${s.ry} 0 0 0 ${s.x + s.rx} ${bottom} V${s.top} Z`,
  });
  parts.push({
    kind: 'face',
    d: `M${s.x - s.rx} ${s.top} A${s.rx} ${s.ry} 0 1 1 ${s.x + s.rx} ${s.top} A${s.rx} ${s.ry} 0 1 1 ${s.x - s.rx} ${s.top} Z`,
  });
  parts.push({ kind: 'line', d: `M${s.x - s.rx} ${s.top + 46} A${s.rx} ${s.ry} 0 0 0 ${s.x + s.rx} ${s.top + 46}` });

  // The hub, a tick scale around it: minor ticks every 6°, major every 30°
  parts.push({ kind: 'face', d: circle([HUB.x, HUB.y], HUB.r) });
  const minor: string[] = [];
  const major: string[] = [];
  for (let deg = 0; deg < 360; deg += 6) {
    const isMajor = deg % 30 === 0;
    (isMajor ? major : minor).push(`M${pt(polar(TICK_IN, deg))} L${pt(polar(isMajor ? TICK_MAJOR : TICK_MINOR, deg))}`);
  }
  parts.push({ kind: 'line', d: minor.join(' ') });
  parts.push({ kind: 'edge', d: major.join(' ') });

  // The bus from the hub's left edge to the branch, the branch fanning out to the three
  // endpoints, each leaving the hub as a spoke that ends in a socket
  const branch: Point = [BRANCH_X, HUB.y];
  parts.push({ kind: 'edge', d: polyline([polar(HUB.r, 180), branch]) });
  PORTS.forEach((_, port) => {
    const ring = portRing(port);
    parts.push({ kind: 'edge', d: polyline([branch, ring, [SOCKET_X, ring[1]]]) });
  });
  PORTS.forEach((_, port) => parts.push({ kind: 'face', d: circle([SOCKET_X, portRing(port)[1]], 3.5) }));
  parts.push({ kind: 'dot', d: circle(branch, 2.5) });
  parts.push({ kind: 'dot', d: circle([HUB.x, HUB.y], 3) });

  // Each place on a shelf, outlined where no artifact covers it
  const body = parcel().body;
  SLOTS.forEach(({ at }) => parts.push({ kind: 'slot', d: shiftPath(body, at) }));

  // Callout leaders for both sources
  const globeEdge: Point = [g.x + g.r * Math.cos(rad(-45)), g.y + g.r * Math.sin(rad(-45))];
  parts.push({ kind: 'line', d: polyline([globeEdge, [266, 56], [410, 56]]) });
  parts.push({ kind: 'line', d: polyline([[s.x + s.rx, s.top + 30], [288, 662], [400, 662]]) });

  return parts;
}

function labels(): Label[] {
  return [
    { x: 268, y: 51, text: 'ÖFFENTLICHE REGISTRIES', anchor: 'start' },
    { x: 290, y: 657, text: 'EIGENE PAKETE', anchor: 'start' },
    { x: STORE.x, y: STORE.top + 34, text: 'S3', anchor: 'middle', print: true },
    { x: HUB.x - 100, y: HUB.y - SHELF + 3, text: 'REMOTE', anchor: 'start' },
    { x: HUB.x - 100, y: HUB.y + SHELF + 3, text: 'LOKAL', anchor: 'start' },
    ...PORTS.map(({ label }, port) => ({ x: 346, y: portRing(port)[1] - 6, text: label, anchor: 'start' as const })),
  ];
}

// Lettering on the bezel: above the scale it reads outward, below it inward
function arcs(): Arc[] {
  const arc = (from: number, to: number, sweep: 0 | 1) =>
    `M${pt(polar(ARC_R, from))} A${ARC_R} ${ARC_R} 0 0 ${sweep} ${pt(polar(ARC_R, to))}`;
  return [
    { id: 'trove-flow-scan', d: arc(188, 262, 1), text: 'SCHWACHSTELLEN-SCAN' },
    { id: 'trove-flow-name', d: arc(172, 108, 0), text: 'TROVE' },
  ];
}

function beam(): Drawing['beam'] {
  const tip = polar(HUB.r - 2, BEAM_START);
  const back = polar(HUB.r - 2, BEAM_START - 40);
  return {
    line: polyline([[HUB.x, HUB.y], tip]),
    wedge: `M${HUB.x} ${HUB.y} L${pt(back)} A${HUB.r - 2} ${HUB.r - 2} 0 0 1 ${pt(tip)} Z`,
    turn: `0 ${HUB.x} ${HUB.y};360 ${HUB.x} ${HUB.y}`,
    dur: `${SWEEP}s`,
  };
}

// Three meridians 60° apart, turned 15° so no two coincide at rest; a meridian's width follows
// the cosine of its longitude, sampled every 15° over the half turn after which it repeats
function globe(): Drawing['globe'] {
  const steps = 12;
  const width = (lon: number) => fmt(GLOBE.r * Math.abs(Math.cos(rad(lon))));
  const meridians = [15, 75, 135].map(lon => {
    const values = Array.from({ length: steps + 1 }, (_, i) => width(lon + (180 * i) / steps));
    return {
      values: values.join(';'),
      keyTimes: values.map((_, i) => String(Math.round((i / steps) * 10000) / 10000)).join(';'),
      still: Number(values[0]),
    };
  });
  return { ...GLOBE, dur: `${MERIDIAN_TURN}s`, meridians };
}

// A parcel seen from above a corner: a hexagon, its three visible edges meeting in the middle
function parcel(): Drawing['parcel'] {
  const r = 11;
  const corners: Point[] = [-90, -30, 30, 90, 150, 210].map(deg => [r * Math.cos(rad(deg)), r * Math.sin(rad(deg))]);
  return {
    body: `${polyline(corners)} Z`,
    edges: `M0 0 L${pt(corners[5])} M0 0 L${pt(corners[1])} M0 0 L${pt(corners[3])}`,
    check: 'M9 -15 L12.5 -11.5 L19.5 -19.5',
    cross: 'M10 -19.5 L18 -11.5 M18 -19.5 L10 -11.5',
  };
}

// ─── Schedule ────────────────────────────────────────────────────────────────
interface Stay {
  slot: number;
  from: number;
  to: number;
}

function overlaps(a: Stay, b: Stay): boolean {
  return [-LOOP, 0, LOOP].some(shift => a.from < b.to + shift && b.from + shift < a.to);
}

// The earliest pass of the beam over a free slot of the shelf within the wait before the
// deadline, so the shelves stay stocked
function seat(shelf: 0 | 1, deadline: number, leave: (pass: number) => number, taken: Stay[]): { slot: number; pass: number } {
  const options = [0, 1, 2]
    .map(i => shelf * 3 + i)
    .flatMap(slot => {
      const first = firstPass(SLOTS[slot].angle);
      const latest = first + SWEEP * Math.floor((deadline - first) / SWEEP);
      return [0, 1, 2].map(turn => ({ slot, pass: latest - turn * SWEEP }));
    })
    .filter(({ pass }) => pass >= deadline - WAIT)
    .sort((a, b) => a.pass - b.pass);
  const free = options.find(({ slot, pass }) => {
    const stay = { slot, from: pass - SETTLE - 0.2, to: leave(pass) + 0.2 };
    return !taken.some(other => other.slot === slot && overlaps(stay, other));
  });
  if (!free) throw new Error('trove flow: no free slot');
  return free;
}

// The way into the hub from a source, ending at a slot
function arrival(shelf: 0 | 1, slot: number): Point[] {
  const entry: Point = shelf === 0 ? [HUB.x, HUB.y - HUB.r] : [HUB.x, HUB.y + HUB.r];
  return [entry, SLOTS[slot].at];
}

function source(shelf: 0 | 1): Point {
  return shelf === 0 ? [GLOBE.x, GLOBE.y + GLOBE.r] : [STORE.x, STORE.top];
}

// The way out of the hub: down or up to the bus, along it to the branch, out through the port
function delivery(slot: number, port: number): Point[] {
  const at = SLOTS[slot].at;
  const ring = portRing(port);
  const end = dock(port);
  return [[at[0], HUB.y], [BRANCH_X, HUB.y], ring, [SOCKET_X, ring[1]], [end[0] + CARRY[0], end[1] + CARRY[1]]];
}

// The flight after the hop, over the right edge and accelerating; sampled from a quadratic
// curve, so the keyframes carry the easing. The flights fan out like the spokes: the top
// endpoint's client swoops up, the middle one keeps its lane, the bottom one sinks away, so
// none crosses the dock where the next client arrives.
const FLIGHTS: { control: Point; end: Point }[] = [
  { control: [20, -110], end: [650, -200] },
  { control: [50, -20], end: [660, -20] },
  { control: [40, 40], end: [660, 80] },
];

function flight(port: number): Point[] {
  const [x, y] = dock(port);
  const control: Point = [x + FLIGHTS[port].control[0], y + FLIGHTS[port].control[1]];
  const end: Point = [FLIGHTS[port].end[0], y + FLIGHTS[port].end[1]];
  return Array.from({ length: 10 }, (_, i) => {
    const u = ((i + 1) / 10) ** 2;
    const a = (1 - u) ** 2;
    const b = 2 * u * (1 - u);
    const c = u * u;
    return [a * x + b * control[0] + c * end[0], a * y + b * control[1] + c * end[1]] as Point;
  });
}

// Moves a path of absolute M and L commands
function shiftPath(d: string, [dx, dy]: Point): string {
  return d.replace(/([ML])(-?[\d.]+) (-?[\d.]+)/g, (_, c, x, y) => `${c}${fmt(Number(x) + dx)} ${fmt(Number(y) + dy)}`);
}

function shift(points: Point[], [dx, dy]: Point): Point[] {
  return points.map(([x, y]) => [x + dx, y + dy]);
}

export function drawFlow(): Drawing {
  const taken: Stay[] = [];
  const clients: Client[] = [];
  const artifacts: Artifact[] = [];
  const usedInStill = new Set<number>();

  for (let k = 0; k < EVENTS; k++) {
    const t = k * STEP;
    const blocked = k === BLOCKED;
    const shelf: 0 | 1 = blocked || k % 2 === 0 ? 0 : 1;
    const leave = (pass: number) => (blocked ? pass + BLOCK_FADE + BLOCK_SINK : t + HANDOVER);
    const { slot, pass } = seat(shelf, t + DEADLINE, leave, taken);
    const settled = pass - SETTLE;
    taken.push({ slot, from: settled, to: leave(pass) });

    // The artifact fades in at its source and drops to its shelf at one speed
    const way = arrival(shelf, slot);
    const from = source(shelf);
    const length = way.reduce((sum, p, i) => sum + distance(i ? way[i - 1] : from, p), 0);
    const origin = settled - length / DROP - FADE;
    const parcel = new Track(origin, from).hold(origin + FADE).show(origin + FADE, 1);
    parcel.path(way, settled);
    const mark: { t: number; v: number }[] = [{ t: origin, v: 0 }, { t: pass, v: 0 }, { t: pass + 0.12, v: 1 }];

    if (blocked) {
      // Crossed out, it sinks a little and is gone
      const at = parcel.at;
      parcel.hold(pass + BLOCK_FADE).move(pass + BLOCK_FADE + BLOCK_SINK, [at[0], at[1] + 10], EASE_IN);
      parcel.show(pass + BLOCK_FADE, 1).show(pass + BLOCK_FADE + BLOCK_SINK, 0);
      mark.push({ t: pass + BLOCK_FADE, v: 1 }, { t: pass + BLOCK_FADE + BLOCK_SINK, v: 0 });
      const stillAt = usedInStill.has(slot) ? null : pass + 0.2;
      if (stillAt !== null) usedInStill.add(slot);
      artifacts.push({ ...parcel.done(stillAt), slot, client: null, mark: opacity(mark), marked: true });
      continue;
    }

    const { name, label, port } = CLIENTS[k];
    const [dx, dy] = dock(port);
    const hopTop: Point = [dx, dy - HOP];
    const away = flight(port);

    // The client comes in over the right edge, docks, hops once it has its artifact, flies off
    const client = new Track(t, [PARK_X, dy]).show(t + 0.01, 1);
    client.move(t + DOCKED, [dx, dy], EASE_OUT).hold(t + TAKEN);
    client.move(t + HOP_TOP, hopTop, EASE_OUT).move(t + HOP_DOWN, [dx, dy], EASE_IN).hold(t + LEAVE);
    away.forEach((p, i) => client.move(t + LEAVE + ((GONE - LEAVE) * (i + 1)) / away.length, p));
    client.show(t + GONE, 1).show(t + GONE + 0.01, 0);

    // The artifact waits on its shelf, runs out to the client and stays on its corner
    parcel.hold(t + HANDOVER).path(delivery(slot, port), t + TAKEN);
    parcel.move(t + HOP_TOP, shift([hopTop], CARRY)[0], EASE_OUT);
    parcel.move(t + HOP_DOWN, shift([[dx, dy]], CARRY)[0], EASE_IN).hold(t + LEAVE);
    shift(away, CARRY).forEach((p, i) => parcel.move(t + LEAVE + ((GONE - LEAVE) * (i + 1)) / away.length, p));
    parcel.show(t + GONE, 1).show(t + GONE + 0.01, 0);
    // Its check moves to the client's corner as it arrives there
    mark.push({ t: t + TAKEN, v: 1 }, { t: t + TAKEN + 0.12, v: 0 });
    const badge = [
      { t, v: 0 },
      { t: t + TAKEN, v: 0 },
      { t: t + TAKEN + 0.12, v: 1 },
      { t: t + GONE, v: 1 },
      { t: t + GONE + 0.01, v: 0 },
    ];

    // Still pose: the first client at each port docked with its artifact; every later artifact
    // marked on its shelf, one per slot
    const firstAtPort = CLIENTS.findIndex(c => c.port === port) === k;
    let parcelStill: number | null = null;
    if (firstAtPort) {
      parcelStill = t + LEAVE;
    } else if (!usedInStill.has(slot)) {
      usedInStill.add(slot);
      parcelStill = pass + 0.2;
    }
    clients.push({
      ...client.done(firstAtPort ? t + LEAVE : null),
      name,
      label,
      icon: ICONS[name],
      port,
      mark: opacity(badge),
    });
    artifacts.push({ ...parcel.done(parcelStill), slot, client: k, mark: opacity(mark), marked: !firstAtPort });
  }

  return {
    parts: structure(),
    labels: labels(),
    arcs: arcs(),
    beam: beam(),
    globe: globe(),
    parcel: parcel(),
    tile: {
      body: `M${-TILE} ${-TILE} H${TILE} V${TILE} H${-TILE} Z`,
      // Beside the tile's right side, clear of the logo and of the caption of the tile above
      check: `M${TILE + 4} ${-10} L${TILE + 7.5} ${-6.5} L${TILE + 14.5} ${-14.5}`,
    },
    clients,
    artifacts,
  };
}
