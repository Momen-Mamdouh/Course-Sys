import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslationService } from '@/core/services/translation-api';

@Pipe({
  name: 'translate',
  pure: false,
  standalone: true,
})
export class TranslatePipe implements PipeTransform {
  private readonly translationService = inject(TranslationService);

  transform(key: string, params?: Record<string, string>): string {
    return this.translationService.translate(key, params);
  }
}
