import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HlmSkeleton } from '@spartan-ng/helm/skeleton';

@Component({
  selector: 'app-skeleton-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HlmSkeleton],
  templateUrl: './skeleton-detail.html',
  styleUrls: ['./skeleton-detail.css'],
})
export class SkeletonDetail {
  protected readonly fields = Array.from({ length: 6 }, (_, i) => i);
}
