import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslationService } from '@module/core/services/translation-api';

@Pipe({
  name: 'translate',
  pure: false,
  standalone: true,
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private readonly sub: Subscription;

  constructor(
    private readonly translationService: TranslationService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.sub = this.translationService.currentLang$.subscribe(() => {
      this.changeDetectorRef.markForCheck();
    });
  }

  transform(key: string, params?: Record<string, string>): string {
    return this.translationService.translate(key, params);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
