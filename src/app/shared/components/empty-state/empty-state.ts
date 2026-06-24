import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmEmptyImports } from '@spartan-ng/helm/empty';
import { HlmButton } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-empty-state',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...HlmEmptyImports, HlmButton, NgIcon],
  templateUrl: './empty-state.html',
  styleUrls: ['./empty-state.css'],
})
export class EmptyState {
  title = input('No items found');
  message = input('');
  actionLabel = input('');
  action = output<void>();
}
