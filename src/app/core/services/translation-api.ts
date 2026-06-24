import { Injectable, signal, computed, ApplicationRef, inject } from '@angular/core';
import enTranslations from '../i18n/en.json';
import arTranslations from '../i18n/ar.json';

export type SupportedLang = 'en' | 'ar';
export type TranslationMap = Record<string, string>;

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly currentLang = signal<SupportedLang>(this.loadInitialLang());
  private readonly translations = signal<TranslationMap>(enTranslations);
  private readonly appRef = inject(ApplicationRef);

  readonly currentLang$ = this.currentLang.asReadonly();
  readonly isRtl = computed(() => this.currentLang() === 'ar');

  constructor() {
    this.applyLanguage(this.currentLang());
  }

  translate(key: string, params?: Record<string, string>): string {
    const value = this.translations()[key];
    if (!value) return key;
    if (!params) return value;
    return Object.entries(params).reduce(
      (str, [param, val]) => str.replace(new RegExp(`\\{\\{${param}\\}\\}`, 'g'), val),
      value,
    );
  }

  switchLang(lang: SupportedLang): void {
    this.currentLang.set(lang);
    localStorage.setItem('lang', lang);
    this.translations.set(lang === 'ar' ? arTranslations : enTranslations);
    this.applyLanguage(lang);
    this.appRef.tick();
  }

  private applyLanguage(lang: SupportedLang): void {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  private loadInitialLang(): SupportedLang {
    const stored = localStorage.getItem('lang');
    if (stored === 'en' || stored === 'ar') return stored;
    return 'en';
  }
}
