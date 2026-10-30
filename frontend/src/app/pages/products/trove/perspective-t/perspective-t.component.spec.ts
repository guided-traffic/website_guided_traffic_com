import { TestBed } from '@angular/core/testing';
import { PerspectiveTComponent } from './perspective-t.component';
import { drawFrame } from './perspective-t.geometry';

describe('perspective-t geometry', () => {
  it('should hide the faces turned away from a viewer standing in front, below the crossbar', () => {
    const frame = drawFrame();
    const hidden = frame.faces.map((face, i) => (face.outline === '' ? i : -1)).filter(i => i >= 0);
    // Face slots: crossbar front, back, left, right, bottom, top; then the stem's in the same order.
    // Visible: crossbar front and underside, stem front and right side (the viewer stands right
    // of the stem but between the crossbar's ends, eyes above the ground)
    expect(hidden).toEqual([1, 2, 3, 5, 7, 8, 10, 11]);
  });

  it('should draw the same still frame every time', () => {
    expect(drawFrame()).toEqual(drawFrame());
  });
});

describe('PerspectiveTComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerspectiveTComponent],
    }).compileComponents();
  });

  function render(): HTMLElement {
    const fixture = TestBed.createComponent(PerspectiveTComponent);
    fixture.detectChanges();
    return fixture.nativeElement;
  }

  it('should hide the decorative drawing from assistive tech', () => {
    expect(render().getAttribute('aria-hidden')).toBe('true');
  });

  it('should render the drawing without a door', () => {
    const el = render();
    expect(el.querySelectorAll('.ptower__face').length).toBe(12);
    expect(el.querySelector('.ptower__door')).toBeNull();
  });
});
