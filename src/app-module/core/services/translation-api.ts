import { Injectable, ApplicationRef } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import enTranslations from '../i18n/en.json';
import arTranslations from '../i18n/ar.json';

export type SupportedLang = 'en' | 'ar';
export type TranslationMap = Record<string, string>;

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly currentLang = new BehaviorSubject<SupportedLang>(this.loadInitialLang());
  private readonly translations = new BehaviorSubject<TranslationMap>(enTranslations);

  readonly currentLang$ = this.currentLang.asObservable();
  readonly isRtl$ = this.currentLang.pipe(map((lang) => lang === 'ar'));
  get currentLangValue(): SupportedLang { return this.currentLang.value; }

  constructor(private readonly appRef: ApplicationRef) {
    this.applyLanguage(this.currentLang.value);
  }

  translate(key: string, params?: Record<string, string>): string {
    const value = this.translations.value[key];
    if (!value) return key;
    if (!params) return value;
    return Object.entries(params).reduce(
      (str, [param, val]) => str.replace(new RegExp(`\\{\\{${param}\\}\\}`, 'g'), val),
      value,
    );
  }

  switchLang(lang: SupportedLang): void {
    this.currentLang.next(lang);
    localStorage.setItem('lang', lang);
    this.translations.next(lang === 'ar' ? arTranslations : enTranslations);
    this.applyLanguage(lang);
    setTimeout(() => this.appRef.tick());
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
