import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmAlertImports } from '@spartan-ng/helm/alert';
import { HlmButton } from '@spartan-ng/helm/button';
import { TranslatePipe } from '@/shared/pipes/translate.pipe';

@Component({
  selector: 'app-error-state',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...HlmAlertImports, HlmButton, NgIcon, TranslatePipe],
  templateUrl: './error-state.html',
  styleUrls: ['./error-state.css'],
})
export class ErrorState {
  title = input('Something went wrong');
  message = input('An unexpected error occurred. Please try again.');
  retry = output<void>();
}
