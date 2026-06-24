import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-module-error-state',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './error-state.component.html',
  styleUrls: ['./error-state.component.css'],
})
export class ErrorState {
  @Input() title = 'Something went wrong';
  @Input() message = 'An unexpected error occurred. Please try again.';
  @Output() retry = new EventEmitter<void>();
}
