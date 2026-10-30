// Perspective drawing of a T-shaped tower, seen by a viewer standing on the ground in front of it.
// A pure function without the DOM, so the server renders the drawing; it does not move.
//
// World units are metres: x to the right, y up, z away from the viewer. The tower's front faces lie
// in z = 0. Screen coordinates are SVG user units around the principal point; y grows downward.

interface Point3 {
  x: number;
  y: number;
  z: number;
}

interface Face {
  corners: Point3[];
  normal: Point3;
  // Lines drawn on the face, as pairs of points
  facade: [Point3, Point3][];
}

export interface Frame {
  // One entry per face slot, in drawing order; '' for a face turned away from the viewer
  faces: { outline: string; facade: string }[];
  construction: string;
  horizon: string;
  vanishingPoint: string;
}

const FLOOR = 4.5;
const BAY = 5;

// Stem and crossbar; the crossbar is drawn first, the stem over it. That order is right for every
// eye below the crossbar's underside, which the camera never leaves.
const CROSSBAR = box({ x: -42, y: 90, z: 0 }, { x: 42, y: 112, z: 20 });
const STEM = box({ x: -10, y: 0, z: 0 }, { x: 10, y: 90, z: 20 });
const FACES: Face[] = [...CROSSBAR, ...STEM];

// Edges extended toward their vanishing points: depth edges toward the horizon, the crossbar's
// outer verticals toward the zenith
const DEPTH_RAYS: Point3[] = [
  { x: -42, y: 112, z: 0 },
  { x: 42, y: 112, z: 0 },
  { x: -42, y: 90, z: 0 },
  { x: 42, y: 90, z: 0 },
  { x: -10, y: 0, z: 0 },
  { x: 10, y: 0, z: 0 },
];
const ZENITH_RAYS: Point3[] = [
  { x: -42, y: 112, z: 0 },
  { x: 42, y: 112, z: 0 },
];

export const VIEW = { width: 1600, height: 1000 };

const EYE_HEIGHT = 1.7;
const DISTANCE = 70;
const PITCH = (30 * Math.PI) / 180;
const FOCAL = 700;

// The viewer stands right of the axis, between the stem and the crossbar's end, so the stem's right
// side shows; the camera turns to keep the tower in view
export const EYE_X = 20;

export function drawFrame(): Frame {
  const cam = camera(EYE_X);
  const eye = { x: cam.x, y: EYE_HEIGHT, z: -DISTANCE };

  const faces = FACES.map(face => {
    const toEye = sub(eye, face.corners[0]);
    if (dot(face.normal, toEye) <= 0) {
      return { outline: '', facade: '' };
    }
    return {
      outline: polygon(face.corners.map(p => project(p, cam))),
      facade: face.facade.map(([a, b]) => line(project(a, cam), project(b, cam))).join(''),
    };
  });

  const depthVp = projectDirection({ x: 0, y: 0, z: 1 }, cam);
  const zenithVp = projectDirection({ x: 0, y: 1, z: 0 }, cam);
  const construction = [
    ...DEPTH_RAYS.map(p => line(project(p, cam), depthVp)),
    ...ZENITH_RAYS.map(p => line(project(p, cam), zenithVp)),
  ].join('');

  const horizonY = FOCAL * Math.tan(PITCH);
  const [vx] = depthVp;
  return {
    faces,
    construction,
    horizon: `M${-VIEW.width} ${f(horizonY)}H${VIEW.width}`,
    vanishingPoint: `M${f(vx - 9)} ${f(horizonY)}H${f(vx + 9)}M${f(vx)} ${f(horizonY - 9)}V${f(horizonY + 9)}`,
  };
}

// ─── Camera and projection ───────────────────────────────────────────────────

interface Camera {
  x: number;
  forward: Point3;
  right: Point3;
  up: Point3;
}

function camera(x: number): Camera {
  // Turned toward the middle of the tower's footprint
  const yaw = Math.atan2(-x, DISTANCE + 10);
  const forward = {
    x: Math.sin(yaw) * Math.cos(PITCH),
    y: Math.sin(PITCH),
    z: Math.cos(yaw) * Math.cos(PITCH),
  };
  const right = { x: Math.cos(yaw), y: 0, z: -Math.sin(yaw) };
  return { x, forward, right, up: cross(forward, right) };
}

function project(p: Point3, cam: Camera): [number, number] {
  return projectDirection(sub(p, { x: cam.x, y: EYE_HEIGHT, z: -DISTANCE }), cam);
}

function projectDirection(d: Point3, cam: Camera): [number, number] {
  const depth = dot(d, cam.forward);
  return [(FOCAL * dot(d, cam.right)) / depth, (-FOCAL * dot(d, cam.up)) / depth];
}

// ─── Model ───────────────────────────────────────────────────────────────────

function box(min: Point3, max: Point3): Face[] {
  const p = (x: number, y: number, z: number): Point3 => ({ x, y, z });
  const { x: x0, y: y0, z: z0 } = min;
  const { x: x1, y: y1, z: z1 } = max;
  const floors = steps(y0, y1, FLOOR);
  const baysX = steps(x0, x1, BAY);
  const baysZ = steps(z0, z1, BAY);

  const facadeXY = (z: number): [Point3, Point3][] => [
    ...floors.map((y): [Point3, Point3] => [p(x0, y, z), p(x1, y, z)]),
    ...baysX.map((x): [Point3, Point3] => [p(x, y0, z), p(x, y1, z)]),
  ];
  const facadeZY = (x: number): [Point3, Point3][] => [
    ...floors.map((y): [Point3, Point3] => [p(x, y, z0), p(x, y, z1)]),
    ...baysZ.map((z): [Point3, Point3] => [p(x, y0, z), p(x, y1, z)]),
  ];

  return [
    { corners: [p(x0, y0, z0), p(x1, y0, z0), p(x1, y1, z0), p(x0, y1, z0)], normal: p(0, 0, -1), facade: facadeXY(z0) },
    { corners: [p(x0, y0, z1), p(x1, y0, z1), p(x1, y1, z1), p(x0, y1, z1)], normal: p(0, 0, 1), facade: facadeXY(z1) },
    { corners: [p(x0, y0, z0), p(x0, y0, z1), p(x0, y1, z1), p(x0, y1, z0)], normal: p(-1, 0, 0), facade: facadeZY(x0) },
    { corners: [p(x1, y0, z0), p(x1, y0, z1), p(x1, y1, z1), p(x1, y1, z0)], normal: p(1, 0, 0), facade: facadeZY(x1) },
    {
      corners: [p(x0, y0, z0), p(x1, y0, z0), p(x1, y0, z1), p(x0, y0, z1)],
      normal: p(0, -1, 0),
      facade: baysX.map((x): [Point3, Point3] => [p(x, y0, z0), p(x, y0, z1)]),
    },
    { corners: [p(x0, y1, z0), p(x1, y1, z0), p(x1, y1, z1), p(x0, y1, z1)], normal: p(0, 1, 0), facade: [] },
  ];
}

// Grid positions strictly inside (from, to), on multiples of step
function steps(from: number, to: number, step: number): number[] {
  const out: number[] = [];
  for (let v = Math.floor(from / step + 1) * step; v < to - 1e-9; v += step) {
    out.push(v);
  }
  return out;
}

// ─── Vectors and path strings ────────────────────────────────────────────────

function sub(a: Point3, b: Point3): Point3 {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function dot(a: Point3, b: Point3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

function cross(a: Point3, b: Point3): Point3 {
  return { x: a.y * b.z - a.z * b.y, y: a.z * b.x - a.x * b.z, z: a.x * b.y - a.y * b.x };
}

function f(n: number): string {
  return n.toFixed(1);
}

function line([ax, ay]: [number, number], [bx, by]: [number, number]): string {
  return `M${f(ax)} ${f(ay)}L${f(bx)} ${f(by)}`;
}

function polygon(points: [number, number][]): string {
  return points.map(([x, y], i) => `${i ? 'L' : 'M'}${f(x)} ${f(y)}`).join('') + 'Z';
}
