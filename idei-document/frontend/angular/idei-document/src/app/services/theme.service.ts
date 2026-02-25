import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'idei-theme';
  
  readonly theme = signal<Theme>(this.getInitialTheme());
  readonly isDark = () => this.theme() === 'dark';

  constructor() {
    // Efecto que aplica el tema al documento
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        const currentTheme = this.theme();
        document.documentElement.setAttribute('data-theme', currentTheme);
        document.body.style.colorScheme = currentTheme;
        localStorage.setItem(this.storageKey, currentTheme);
      }
    });
  }

  private getInitialTheme(): Theme {
    if (isPlatformBrowser(this.platformId)) {
      // Primero revisar localStorage
      const stored = localStorage.getItem(this.storageKey) as Theme;
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
      // Si no hay preferencia guardada, usar la del sistema
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  }

  toggle(): void {
    this.theme.update(current => current === 'light' ? 'dark' : 'light');
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }
}
