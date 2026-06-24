import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './status-badge.html',
  styleUrls: ['./status-badge.css'],
  host: {
    '[attr.data-variant]': 'variant',
  },
})
export class StatusBadge {
  status = input.required<string>();

  protected get variant(): 'default' | 'secondary' | 'destructive' {
    switch (this.status()) {
      case 'Active':
        return 'default';
      case 'Draft':
        return 'secondary';
      case 'Archived':
        return 'destructive';
      default:
        return 'default';
    }
  }
}
