import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { HlmSkeleton } from '@spartan-ng/helm/skeleton';

@Component({
  selector: 'app-skeleton-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HlmSkeleton],
  templateUrl: './skeleton-table.html',
  styleUrls: ['./skeleton-table.css'],
})
export class SkeletonTable {
  rows = input(5);
  showActions = input(true);

  protected get skeletonRows(): number[] {
    return Array.from({ length: this.rows() }, (_, i) => i);
  }

  protected readonly columns = [
    'id', 'courseName', 'instructorName', 'category',
    'duration', 'price', 'status', 'createdDate',
  ];

  protected colWidth(col: string): string {
    switch (col) {
      case 'id': return 'w-10';
      case 'courseName': return 'w-32';
      case 'instructorName': return 'w-28';
      case 'category': return 'w-20';
      case 'duration': return 'w-14';
      case 'price': return 'w-16';
      case 'status': return 'w-16';
      case 'createdDate': return 'w-24';
      default: return 'w-20';
    }
  }
}
