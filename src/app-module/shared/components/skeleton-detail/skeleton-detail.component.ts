import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-module-skeleton-detail',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skeleton-detail.component.html',
  styleUrls: ['./skeleton-detail.component.css'],
})
export class SkeletonDetail {
  protected readonly fields = Array.from({ length: 6 }, (_, i) => i);
}
