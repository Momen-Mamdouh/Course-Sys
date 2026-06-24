import { CurrencyPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmButton } from '@spartan-ng/helm/button';
import { CourseService } from '@/core/services/course-api';
import { Course } from '@/core/interfaces/course';
import { ErrorInfo } from '@/core/interfaces/error-info';
import { SkeletonDetail } from '@/shared/components/skeleton-detail/skeleton-detail';
import { ErrorState } from '@/shared/components/error-state/error-state';
import { ConfirmationModal } from '@/shared/components/confirmation-modal/confirmation-modal';

@Component({
  selector: 'app-course-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CurrencyPipe, NgIcon,
    HlmBadge, HlmButton,
    SkeletonDetail, ErrorState, ConfirmationModal,
  ],
  templateUrl: './course-detail.html',
  styleUrls: ['./course-detail.css'],
})
export class CourseDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly courseService = inject(CourseService);

  protected course = signal<Course | null>(null);
  protected isLoading = signal(true);
  protected error = signal<ErrorInfo | null>(null);
  protected showDeleteModal = signal(false);

  private courseId = 0;

  constructor() {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCourse();
  }

  protected loadCourse(): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (course) => {
        if (course) {
          this.course.set(course);
        } else {
          this.error.set({ title: 'Course not found', message: 'This course does not exist.' });
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set({ title: 'Failed to load course', message: 'Please try again.' });
        this.isLoading.set(false);
      },
    });
  }

  protected goBack(): void {
    this.router.navigate(['/courses']);
  }

  protected onEdit(): void {
    this.router.navigate(['/courses', this.courseId, 'edit']);
  }

  protected onDelete(): void {
    this.showDeleteModal.set(true);
  }

  protected onDeleteConfirm(): void {
    this.courseService.deleteCourse(this.courseId).subscribe(() => {
      this.router.navigate(['/courses']);
    });
    this.showDeleteModal.set(false);
  }

  protected onDeleteCancel(): void {
    this.showDeleteModal.set(false);
  }

  protected badgeVariant(status: string): 'default' | 'secondary' | 'destructive' {
    switch (status) {
      case 'Active': return 'default';
      case 'Draft': return 'secondary';
      case 'Archived': return 'destructive';
      default: return 'default';
    }
  }
}
