import { TestBed } from '@angular/core/testing';
import { IconComponent } from './icon.component';
import { ICONS, IconName } from './icon.registry';

describe('IconComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent],
    }).compileComponents();
  });

  function render(name: IconName): HTMLElement {
    const fixture = TestBed.createComponent(IconComponent);
    fixture.componentRef.setInput('name', name);
    fixture.detectChanges();
    return fixture.nativeElement;
  }

  it('should draw every path of the icon and hide it from assistive tech', () => {
    const el = render('circle-check');
    expect(el.getAttribute('aria-hidden')).toBe('true');
    const paths = Array.from(el.querySelectorAll('path')).map(p => p.getAttribute('d'));
    expect(paths).toEqual(ICONS['circle-check'].paths);
  });

  it('should fill marks and stroke line icons', () => {
    expect(render('github').querySelector('svg')!.classList).toContain('icon--fill');
    expect(render('lock').querySelector('svg')!.classList).not.toContain('icon--fill');
  });

  it('should hold path data only', () => {
    // Circles, rects and lines are written as paths; a path starts with a move
    for (const icon of Object.values(ICONS)) {
      icon.paths.forEach(d => expect(d).toMatch(/^[Mm]/));
    }
  });
});
