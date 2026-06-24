import { Component, ChangeDetectionStrategy, input, output, HostListener, viewChild, ElementRef } from '@angular/core';
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

  private readonly dialogRef = viewChild<ElementRef<HTMLDivElement>>('dialog');

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.visible()) {
      this.cancel.emit();
    }
  }

  @HostListener('document:keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    if (!this.visible() || event.key !== 'Tab') return;
    const dialog = this.dialogRef()?.nativeElement;
    if (!dialog) return;
    const focusable = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}
