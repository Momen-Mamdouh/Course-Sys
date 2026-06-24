import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-module-search-input',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css'],
})
export class SearchInput {
  @Input() placeholder = 'Search...';
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event): void {
    this.valueChange.emit((event.target as HTMLInputElement).value);
  }
}
