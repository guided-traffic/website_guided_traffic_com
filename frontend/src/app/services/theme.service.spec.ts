import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let systemDark = false;
  let changeListener: ((event: { matches: boolean }) => void) | null = null;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    systemDark = false;
    changeListener = null;
    // jsdom has no matchMedia; emulate the OS setting
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: systemDark,
      addEventListener: (_: string, listener: (event: { matches: boolean }) => void) => (changeListener = listener),
    }));
  });

  function create(): ThemeService {
    TestBed.resetTestingModule();
    return TestBed.inject(ThemeService);
  }

  it('should follow the OS setting by default', () => {
    systemDark = true;
    expect(create().theme()).toBe('dark');
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
  });

  it('should prefer a stored choice over the OS setting', () => {
    systemDark = true;
    localStorage.setItem('gt-theme', 'light');
    expect(create().theme()).toBe('light');
  });

  it('should ignore an invalid stored value', () => {
    localStorage.setItem('gt-theme', 'sepia');
    expect(create().theme()).toBe('light');
  });

  it('should toggle, set data-theme and store the choice', () => {
    const service = create();
    service.toggle();
    expect(service.theme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('gt-theme')).toBe('dark');
    service.toggle();
    expect(service.theme()).toBe('light');
    expect(localStorage.getItem('gt-theme')).toBe('light');
  });

  it('should track OS changes only while no choice is stored', () => {
    const service = create();
    changeListener?.({ matches: true });
    expect(service.theme()).toBe('dark');
    service.toggle();
    changeListener?.({ matches: true });
    expect(service.theme()).toBe('light');
  });
});
