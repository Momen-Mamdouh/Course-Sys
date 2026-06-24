import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-module-skeleton-table',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skeleton-table.component.html',
  styleUrls: ['./skeleton-table.component.css'],
})
export class SkeletonTable {
  @Input() showActions = true;

  protected get skeletonRows(): number[] {
    return Array.from({ length: 5 }, (_, i) => i);
  }
}
