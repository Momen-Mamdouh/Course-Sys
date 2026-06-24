import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { CourseService } from '@/core/services/course-api';
import { Course } from '@/core/interfaces/course';
import { ErrorInfo } from '@/core/interfaces/error-info';
import { SearchInput } from '@/shared/components/search-input/search-input';
import { SkeletonTable } from '@/shared/components/skeleton-table/skeleton-table';
import { CourseTable } from '@/shared/components/course-table/course-table';
import { EmptyState } from '@/shared/components/empty-state/empty-state';
import { ErrorState } from '@/shared/components/error-state/error-state';
import { ConfirmationModal } from '@/shared/components/confirmation-modal/confirmation-modal';

@Component({
  selector: 'app-course-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIcon, HlmButton,
    SearchInput, SkeletonTable, CourseTable,
    EmptyState, ErrorState, ConfirmationModal,
  ],
  templateUrl: './course-list.html',
  styleUrls: ['./course-list.css'],
})
export class CourseList {
  private readonly courseService = inject(CourseService);
  private readonly router = inject(Router);

  protected courses = signal<Course[]>([]);
  protected isLoading = signal(true);
  protected error = signal<ErrorInfo | null>(null);
  protected searchQuery = signal('');
  protected allCourses: Course[] = [];

  protected showDeleteModal = signal(false);
  protected deletingCourse = signal<Course | null>(null);

  constructor() {
    this.loadCourses();
  }

  protected loadCourses(): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.allCourses = courses;
        this.applyFilter();
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set({ title: 'Failed to load courses', message: 'Please try again.' });
        this.isLoading.set(false);
      },
    });
  }

  protected onSearch(query: string): void {
    this.searchQuery.set(query);
    if (query.trim()) {
      this.courseService.searchCourses(query).subscribe((courses) => {
        this.courses.set(courses);
      });
    } else {
      this.applyFilter();
    }
  }

  private applyFilter(): void {
    this.courses.set([...this.allCourses]);
  }

  protected onAdd(): void {
    this.router.navigate(['/courses/new']);
  }

  protected onView(course: Course): void {
    this.router.navigate(['/courses', course.id]);
  }

  protected onEdit(course: Course): void {
    this.router.navigate(['/courses', course.id, 'edit']);
  }

  protected onDelete(course: Course): void {
    this.deletingCourse.set(course);
    this.showDeleteModal.set(true);
  }

  protected onDeleteConfirm(): void {
    const course = this.deletingCourse();
    if (course) {
      this.courseService.deleteCourse(course.id).subscribe(() => {
        this.loadCourses();
      });
    }
    this.showDeleteModal.set(false);
    this.deletingCourse.set(null);
  }

  protected onDeleteCancel(): void {
    this.showDeleteModal.set(false);
    this.deletingCourse.set(null);
  }
}
