import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

// Must match public/theme-init.js, which applies the stored choice before first paint
const STORAGE_KEY = 'gt-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  // Effective theme. The server cannot know it; it reads 'light' there and the
  // browser corrects it on startup. Visuals never depend on this signal — the
  // CSS resolves the theme on its own — only the toggle's label does.
  readonly theme = signal<Theme>('light');

  constructor() {
    if (!this.isBrowser) {
      return;
    }
    const media = this.document.defaultView?.matchMedia?.('(prefers-color-scheme: dark)');
    this.theme.set(this.readStored() ?? (media?.matches ? 'dark' : 'light'));

    // Follow the OS setting live until the visitor makes an explicit choice
    media?.addEventListener('change', (event) => {
      if (!this.readStored()) {
        this.theme.set(event.matches ? 'dark' : 'light');
      }
    });
  }

  toggle(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    this.document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage blocked: the choice holds for this page view only
    }
  }

  private readStored(): Theme | null {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return value === 'light' || value === 'dark' ? value : null;
    } catch {
      return null;
    }
  }
}
