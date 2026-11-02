import { TestBed } from '@angular/core/testing';
import { TroveChestComponent } from './trove-chest.component';
import { Artifact, VIEW, drawChest } from './trove-chest.geometry';

// Seconds of one artifact's cycle: when it starts to fall, lands, and has sunk below the surface
function timeline(a: Artifact): { period: number; start: number; land: number; sunk: number } {
  const period = parseFloat(a.dur);
  const start = parseFloat(a.begin);
  const times = a.motion.keyTimes.split(';').map(Number);
  return { period, start, land: start + times[1] * period, sunk: start + times[4] * period };
}

function mod(a: number, n: number): number {
  return ((a % n) + n) % n;
}

// Absolute points of M and L commands; enough to bound outlines, arcs end on such points
function points(d: string): [number, number][] {
  return [...d.matchAll(/[ML](-?[\d.]+) (-?[\d.]+)/g)].map(m => [Number(m[1]), Number(m[2])]);
}

describe('trove chest geometry', () => {
  const drawing = drawChest();

  it('should draw the same scene every time', () => {
    expect(drawChest()).toEqual(drawChest());
  });

  it('should write well-formed SMIL keyframes', () => {
    for (const a of drawing.artifacts) {
      for (const frames of [a.motion, a.fade]) {
        const times = frames.keyTimes.split(';').map(Number);
        expect(times[0]).toBe(0);
        expect(times[times.length - 1]).toBe(1);
        times.slice(1).forEach((t, i) => expect(t).toBeGreaterThan(times[i]));
        expect(frames.values.split(';')).toHaveLength(times.length);
      }
      expect(a.motion.keySplines!.split(';')).toHaveLength(a.motion.keyTimes.split(';').length - 1);
      expect(parseFloat(a.begin)).toBeLessThanOrEqual(0);
    }
  });

  it('should sink every artifact at one speed, down to its own height', () => {
    const speeds = drawing.artifacts.map(a => {
      const times = a.motion.keyTimes.split(';').map(Number);
      expect(a.motion.values.split(';')[4]).toBe(`0 ${a.height}`);
      return a.height / ((times[4] - times[3]) * parseFloat(a.dur));
    });
    // keyTimes carry four decimals
    speeds.forEach(speed => expect(speed).toBeCloseTo(speeds[0], 1));
  });

  it('should land the next artifact of a slot when the previous one has sunk', () => {
    const slots = new Map<number, Artifact[]>();
    drawing.artifacts.forEach(a => slots.set(a.slot, [...(slots.get(a.slot) ?? []), a]));
    expect(slots.size).toBe(12);
    for (const artifacts of slots.values()) {
      artifacts.forEach((a, k) => {
        const next = timeline(artifacts[(k + 1) % artifacts.length]);
        const { period, sunk } = timeline(a);
        expect(next.period).toBe(period);
        const gap = mod(next.land - sunk, period);
        expect(Math.min(gap, period - gap)).toBeLessThan(0.02);
      });
    }
  });

  it('should show one artifact per slot in the still pose', () => {
    const still = drawing.artifacts.filter(a => a.still !== null);
    expect(new Set(still.map(a => a.slot)).size).toBe(still.length);
    expect(still).toHaveLength(12);
  });

  it('should keep the chest, the artifacts as they appear and the sparkles inside the view', () => {
    const inside = ([x, y]: [number, number]) => {
      expect(x).toBeGreaterThanOrEqual(VIEW.x);
      expect(x).toBeLessThanOrEqual(VIEW.x + VIEW.width);
      expect(y).toBeGreaterThanOrEqual(VIEW.y);
      expect(y).toBeLessThanOrEqual(VIEW.y + VIEW.height);
    };
    drawing.chest.flatMap(p => points(p.d)).forEach(inside);
    drawing.sparkles.flatMap(s => points(s.d)).forEach(inside);
    for (const a of drawing.artifacts) {
      const drop = Number(a.motion.values.split(';')[0].split(' ')[1]);
      a.parts.flatMap(p => points(p.d)).forEach(([x, y]) => inside([x, y + drop]));
    }
  });
});

describe('TroveChestComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TroveChestComponent],
    }).compileComponents();
  });

  function render(): HTMLElement {
    const fixture = TestBed.createComponent(TroveChestComponent);
    fixture.detectChanges();
    return fixture.nativeElement;
  }

  it('should hide the decorative drawing from assistive tech', () => {
    expect(render().getAttribute('aria-hidden')).toBe('true');
  });

  it('should clip every artifact with a clip path of its own', () => {
    const el = render();
    const ids = Array.from(el.querySelectorAll('clipPath')).map(c => c.id);
    expect(new Set(ids).size).toBe(drawChest().artifacts.length);
    const refs = Array.from(el.querySelectorAll('.chest__motion > g, .chest__still > g')).map(g =>
      g.getAttribute('clip-path'),
    );
    refs.forEach(ref => expect(ids.map(id => `url(#${id})`)).toContain(ref));
  });

  it('should animate every artifact and keep a still pose with one artifact per slot', () => {
    const el = render();
    const artifacts = drawChest().artifacts;
    expect(el.querySelectorAll('.chest__motion animateTransform')).toHaveLength(artifacts.length);
    expect(el.querySelectorAll('.chest__still > g')).toHaveLength(12);
    // SMIL reads camel-cased attribute names only
    expect(el.querySelector('.chest__motion animateTransform')!.getAttribute('keyTimes')).toBe(
      artifacts[0].motion.keyTimes,
    );
  });
});
