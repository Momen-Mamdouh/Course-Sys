import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { HlmAlertDialogContent, HlmAlertDialogHeader, HlmAlertDialogTitle, HlmAlertDialogDescription, HlmAlertDialogFooter, HlmAlertDialogCancel, HlmAlertDialogAction } from '@spartan-ng/helm/alert-dialog';

@Component({
  selector: 'app-confirmation-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HlmAlertDialogContent, HlmAlertDialogHeader, HlmAlertDialogTitle, HlmAlertDialogDescription, HlmAlertDialogFooter, HlmAlertDialogCancel, HlmAlertDialogAction],
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
