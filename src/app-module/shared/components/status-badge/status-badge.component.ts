import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-module-status-badge',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './status-badge.component.html',
  styleUrls: ['./status-badge.component.css'],
  host: {
    '[attr.data-variant]': 'variant',
  },
})
export class StatusBadge {
  @Input() status = '';

  protected get variant(): 'default' | 'secondary' | 'destructive' {
    switch (this.status) {
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
