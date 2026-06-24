import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { HlmInput } from '@spartan-ng/helm/input';
import { NgIcon } from '@ng-icons/core';
import { TranslatePipe } from '@/shared/pipes/translate.pipe';

@Component({
  selector: 'app-search-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HlmInput, NgIcon, TranslatePipe],
  templateUrl: './search-input.html',
  styleUrls: ['./search-input.css'],
})
export class SearchInput {
  placeholder = input('Search...');
  value = input('');
  valueChange = output<string>();

  onInput(event: Event): void {
    const el = event.target as HTMLInputElement;
    this.valueChange.emit(el.value);
  }
}
