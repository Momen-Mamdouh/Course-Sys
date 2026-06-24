import { Component } from '@angular/core';
import { TranslationService } from '@module/core/services/translation-api';

@Component({
  selector: 'app-module-root',
  standalone: false,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  constructor(private readonly translationService: TranslationService) {}

  protected switchLang(): void {
    this.translationService.switchLang(
      this.translationService.currentLangValue === 'en' ? 'ar' : 'en',
    );
  }
}
