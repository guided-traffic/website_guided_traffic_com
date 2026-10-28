import { TestBed } from '@angular/core/testing';
import { HelmWheelComponent } from './helm-wheel.component';

describe('HelmWheelComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelmWheelComponent],
    }).compileComponents();
  });

  function render(): HTMLElement {
    const fixture = TestBed.createComponent(HelmWheelComponent);
    fixture.detectChanges();
    return fixture.nativeElement;
  }

  it('should hide the decorative drawing from assistive tech', () => {
    expect(render().getAttribute('aria-hidden')).toBe('true');
  });

  it('should draw eight spokes with exactly one king spoke marked', () => {
    const el = render();
    expect(el.querySelectorAll('.helm__wheel g[transform^="rotate("]').length).toBe(8);
    const king = el.querySelectorAll('.helm__collar--king');
    expect(king.length).toBe(1);
    expect(king[0].closest('g')?.getAttribute('transform')).toBe('rotate(0)');
  });

  it('should keep the scale outside the turning layers', () => {
    const el = render();
    expect(el.querySelector('.helm__scale')?.closest('.helm__swell')).toBeNull();
    expect(el.querySelector('.helm__wheel')?.closest('.helm__trim')?.closest('.helm__swell')).not.toBeNull();
  });
});
