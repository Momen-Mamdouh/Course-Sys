import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-module-confirmation-modal',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css'],
})
export class ConfirmationModal {
  @Input() visible = false;
  @Input() title = 'Confirm action';
  @Input() message = 'Are you sure?';
  @Input() confirmLabel = 'Confirm';
  @Input() cancelLabel = 'Cancel';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
