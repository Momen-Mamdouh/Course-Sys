import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { HlmButton } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-confirmation-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HlmButton],
  templateUrl: './confirmation-modal.html',
  styleUrls: ['./confirmation-modal.css'],
})
export class ConfirmationModal {
  visible = input(false);
  title = input('Confirm action');
  message = input('Are you sure?');
  confirmLabel = input('Confirm');
  cancelLabel = input('Cancel');
  confirm = output<void>();
  cancel = output<void>();
}
