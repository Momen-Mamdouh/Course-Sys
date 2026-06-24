import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmToaster } from '@spartan-ng/helm/sonner';
import { NgIcon } from '@ng-icons/core';
import { TranslatePipe } from '@/shared/pipes/translate.pipe';
import { TranslationService } from '@/core/services/translation-api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HlmToaster, HlmButton, NgIcon, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly translationService = inject(TranslationService);

  protected switchLang(): void {
    this.translationService.switchLang(
      this.translationService.currentLang$() === 'en' ? 'ar' : 'en'
    );
  }
}
