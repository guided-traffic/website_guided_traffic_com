import { TestBed } from '@angular/core/testing';
import { TroveFlowComponent } from './trove-flow.component';
import {
  Actor,
  BEAM_START,
  CARRY,
  DOCK_X,
  Frames,
  LOOP,
  PARK_X,
  Point,
  SLOTS,
  SWEEP,
  TILE,
  VIEW,
  dock,
  drawFlow,
} from './trove-flow.geometry';

interface Key {
  t: number;
  v: number[];
}

// Keyframes in loop seconds
function keys(frames: Frames): Key[] {
  const times = frames.keyTimes.split(';').map(Number);
  const values = frames.values.split(';').map(v => v.split(' ').map(Number));
  return times.map((t, i) => ({ t: t * LOOP, v: values[i] }));
}

// The value at a loop second, interpolated linearly: exact at keyframes and wherever an actor rests
function at(frames: Frames, t: number): number[] {
  const k = keys(frames);
  const i = k.findIndex(key => key.t >= t);
  if (i <= 0) return k[Math.max(i, 0)].v;
  const f = (t - k[i - 1].t) / (k[i].t - k[i - 1].t);
  return k[i - 1].v.map((v, j) => v + (k[i].v[j] - v) * f);
}

// Loop seconds during which an actor is visible
function shown(actor: Actor): [number, number][] {
  const k = keys(actor.fade);
  const spans: [number, number][] = [];
  k.forEach((key, i) => {
    if (i && key.v[0] > 0 && k[i - 1].v[0] === 0) spans.push([k[i - 1].t, LOOP]);
    if (i && key.v[0] === 0 && k[i - 1].v[0] > 0) spans[spans.length - 1][1] = key.t;
  });
  // Visible across the loop's end: one span that wraps
  if (k[0].v[0] > 0) spans.unshift([0, k.find(key => key.v[0] === 0)!.t]);
  return spans;
}

// Values carry two decimals
function near(v: number[], p: Point): boolean {
  return Math.abs(v[0] - p[0]) < 0.01 && Math.abs(v[1] - p[1]) < 0.01;
}

// Loop seconds an actor rests at a point; a rest across the loop's end is one span
function rests(frames: Frames, p: Point): [number, number][] {
  const k = keys(frames);
  const spans: [number, number][] = [];
  k.forEach((key, i) => {
    if (!near(key.v, p)) return;
    if (i && near(k[i - 1].v, p)) spans[spans.length - 1][1] = key.t;
    else spans.push([key.t, key.t]);
  });
  if (spans.length > 1 && spans[0][0] === 0 && spans[spans.length - 1][1] === LOOP) {
    const last = spans.pop()!;
    spans[0] = [last[0], spans[0][1] + LOOP];
  }
  return spans;
}

function overlap(a: [number, number], b: [number, number]): boolean {
  return [-LOOP, 0, LOOP].some(s => a[0] < b[1] + s && b[0] + s < a[1]);
}

function mod(a: number, n: number): number {
  return ((a % n) + n) % n;
}

// Absolute points of M, L and A commands; enough to bound outlines, arcs end on such points
function points(d: string): Point[] {
  return [...d.matchAll(/(?:[ML]|0 [01] [01] )(-?[\d.]+) (-?[\d.]+)/g)].map(m => [Number(m[1]), Number(m[2])]);
}

describe('trove flow geometry', () => {
  const drawing = drawFlow();
  const actors: Actor[] = [...drawing.clients, ...drawing.artifacts];

  it('should draw the same scene every time', () => {
    expect(drawFlow()).toEqual(drawFlow());
  });

  it('should write well-formed SMIL keyframes that loop from 0s', () => {
    const frames = actors
      .flatMap(a => [a.motion, a.fade])
      .concat(drawing.artifacts.map(a => a.mark), drawing.clients.map(c => c.mark));
    for (const f of frames) {
      const times = f.keyTimes.split(';').map(Number);
      expect(times[0]).toBe(0);
      expect(times[times.length - 1]).toBe(1);
      times.slice(1).forEach((t, i) => expect(t).toBeGreaterThan(times[i]));
      expect(f.values.split(';')).toHaveLength(times.length);
      if (f.keySplines) {
        const splines = f.keySplines.split(';');
        expect(splines).toHaveLength(times.length - 1);
        splines.flatMap(s => s.split(' ').map(Number)).forEach(n => {
          expect(n).toBeGreaterThanOrEqual(0);
          expect(n).toBeLessThanOrEqual(1);
        });
      }
    }
    actors.forEach(a => expect(a.dur).toBe(`${LOOP}s`));
  });

  it('should hide every actor at the loop boundary unless it is on its way', () => {
    // An actor's first and last state are the same, so the loop has no jump
    for (const a of actors) {
      const k = keys(a.motion);
      expect(k[0].v).toEqual(k[k.length - 1].v);
      const f = keys(a.fade);
      expect(f[0].v).toEqual(f[f.length - 1].v);
    }
  });

  it('should mark each artifact the moment the beam passes over it', () => {
    for (const a of drawing.artifacts) {
      const mark = keys(a.mark);
      const on = mark.findIndex((key, i) => i && key.v[0] === 1 && mark[i - 1].v[0] === 0);
      const pass = mark[on - 1].t;
      const beam = BEAM_START + (360 * pass) / SWEEP;
      const off = mod(beam - SLOTS[a.slot].angle + 180, 360) - 180;
      expect(Math.abs(off)).toBeLessThan(0.5);
      // The artifact rests on its slot then
      at(a.motion, pass).forEach((v, j) => expect(v).toBeCloseTo(SLOTS[a.slot].at[j], 1));
    }
  });

  it('should keep the artifact on its client from the handover until both are gone', () => {
    for (const a of drawing.artifacts.filter(x => x.client !== null)) {
      const client = drawing.clients[a.client!];
      const [dx, dy] = dock(client.port);
      const [life] = shown(client);
      const since = (t: number) => mod(t - life[0], LOOP);
      // The first time the artifact sits on the client's corner, counted from the client's arrival
      const handed = Math.min(
        ...keys(a.motion)
          .filter(k => near(k.v, [dx + CARRY[0], dy + CARRY[1]]))
          .map(k => since(k.t)),
      );
      const carried = keys(client.motion).filter(k => since(k.t) >= handed && since(k.t) <= since(life[1]));
      expect(carried.length).toBeGreaterThan(10);
      for (const k of carried) {
        const p = at(a.motion, k.t);
        expect(p[0] - k.v[0]).toBeCloseTo(CARRY[0], 1);
        expect(p[1] - k.v[1]).toBeCloseTo(CARRY[1], 1);
      }
    }
  });

  it('should pass the check from the artifact to its client when it arrives there', () => {
    for (const a of drawing.artifacts.filter(x => x.client !== null)) {
      const client = drawing.clients[a.client!];
      const badge = keys(client.mark);
      const on = badge.findIndex((key, i) => i && key.v[0] === 1 && badge[i - 1].v[0] === 0);
      const handed = badge[on - 1].t;
      const [dx, dy] = dock(client.port);
      at(a.motion, handed).forEach((v, j) => expect(v).toBeCloseTo([dx + CARRY[0], dy + CARRY[1]][j], 1));
      expect(at(a.mark, handed)[0]).toBe(1);
      expect(at(a.mark, handed + 0.15)[0]).toBe(0);
      expect(at(client.mark, handed + 0.15)[0]).toBe(1);
    }
  });

  it('should never seat two artifacts on one slot at once', () => {
    const stays = drawing.artifacts.map(a => {
      const spans = rests(a.motion, SLOTS[a.slot].at);
      expect(spans).toHaveLength(1);
      return { slot: a.slot, span: spans[0] };
    });
    stays.forEach((s, i) =>
      stays.slice(i + 1).forEach(o => {
        if (o.slot === s.slot) expect(overlap(s.span, o.span)).toBe(false);
      }),
    );
  });

  it('should bring each endpoint one client at a time', () => {
    const ports = new Map<number, [number, number][]>();
    drawing.clients.forEach(c => ports.set(c.port, [...(ports.get(c.port) ?? []), ...shown(c)]));
    expect(ports.size).toBe(3);
    for (const spans of ports.values()) {
      spans.forEach((s, i) => spans.slice(i + 1).forEach(o => expect(overlap(s, o)).toBe(false)));
    }
  });

  it('should keep clients apart wherever two are in view at once', () => {
    // A tile and the caption below it, with room to spare
    const box = ([x, y]: number[]) => [x - TILE - 2, y - TILE - 2, x + TILE + 2, y + TILE + 16];
    for (let t = 0; t < LOOP; t += 0.05) {
      const seen = drawing.clients
        .filter(c => at(c.fade, t)[0] > 0)
        .map(c => at(c.motion, t))
        .filter(([x]) => x - TILE < VIEW.width);
      seen.forEach((a, i) =>
        seen.slice(i + 1).forEach(b => {
          const [ax0, ay0, ax1, ay1] = box(a);
          const [bx0, by0, bx1, by1] = box(b);
          expect(ax0 < bx1 && bx0 < ax1 && ay0 < by1 && by0 < ay1).toBe(false);
        }),
      );
    }
  });

  it('should serve every endpoint from both shelves and block one artifact per loop', () => {
    const blocked = drawing.artifacts.filter(a => a.client === null);
    expect(blocked).toHaveLength(1);
    for (const port of [0, 1, 2]) {
      const shelves = drawing.artifacts
        .filter(a => a.client !== null && drawing.clients[a.client].port === port)
        .map(a => (a.slot < 3 ? 'remote' : 'local'));
      expect(new Set(shelves)).toEqual(new Set(['remote', 'local']));
    }
  });

  it('should park clients beyond the frame and dock them inside the view', () => {
    expect(PARK_X - TILE).toBeGreaterThan(VIEW.width);
    expect(DOCK_X + TILE).toBeLessThan(VIEW.width);
    for (const c of drawing.clients) {
      const k = keys(c.motion);
      expect(k.some(key => key.v[0] === PARK_X)).toBe(true);
      // Wherever a client is hidden, it is outside the view
      k.filter(key => at(c.fade, key.t)[0] === 0).forEach(key => expect(key.v[0] - TILE).toBeGreaterThan(VIEW.width));
    }
  });

  it('should keep the structure inside the view', () => {
    drawing.parts.flatMap(p => points(p.d)).forEach(([x, y]) => {
      expect(x).toBeGreaterThanOrEqual(VIEW.x);
      expect(x).toBeLessThanOrEqual(VIEW.x + VIEW.width);
      expect(y).toBeGreaterThanOrEqual(VIEW.y);
      expect(y).toBeLessThanOrEqual(VIEW.y + VIEW.height);
    });
  });

  it('should show one client docked at each endpoint and one artifact per slot in the still pose', () => {
    const still = drawing.clients.filter(c => c.still !== null);
    expect(new Set(still.map(c => c.port))).toEqual(new Set([0, 1, 2]));
    const shelved = drawing.artifacts.filter(a => a.still !== null && !still.some(c => drawing.clients.indexOf(c) === a.client));
    expect(new Set(shelved.map(a => a.slot)).size).toBe(shelved.length);
    shelved.forEach(a => expect(a.still).toBe(`translate(${SLOTS[a.slot].at.join(' ')})`));
  });
});

describe('TroveFlowComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TroveFlowComponent],
    }).compileComponents();
  });

  function render(): HTMLElement {
    const fixture = TestBed.createComponent(TroveFlowComponent);
    fixture.detectChanges();
    return fixture.nativeElement;
  }

  it('should hide the decorative drawing from assistive tech', () => {
    expect(render().getAttribute('aria-hidden')).toBe('true');
  });

  it('should animate every client and artifact without begin offsets', () => {
    const el = render();
    const { clients, artifacts } = drawFlow();
    expect(el.querySelectorAll('.flow__motion > g > animateTransform[type="translate"]')).toHaveLength(
      clients.length + artifacts.length,
    );
    expect(el.querySelectorAll('[begin]')).toHaveLength(0);
    // SMIL reads camel-cased attribute names only
    expect(el.querySelector('.flow__motion animateTransform[type="translate"]')!.getAttribute('keyTimes')).toBe(
      clients[0].motion.keyTimes,
    );
  });

  it('should keep a still pose with a client at each endpoint', () => {
    const el = render();
    expect(el.querySelectorAll('.flow__still .flow__logo')).toHaveLength(3);
    // Three on the clients' corners, the rest on the shelves
    const shelved = drawFlow().artifacts.filter(a => a.still !== null && a.marked).length;
    expect(el.querySelectorAll('.flow__still .flow__mark')).toHaveLength(3 + shelved);
  });
});
