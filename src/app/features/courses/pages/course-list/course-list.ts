import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { toast } from '@spartan-ng/brain/sonner';
import { CourseService } from '@/core/services/course-api';
import { Course } from '@/core/interfaces/course';
import { ErrorInfo } from '@/core/interfaces/error-info';
import { TranslatePipe } from '@/shared/pipes/translate.pipe';
import { SearchInput } from '@/shared/components/search-input/search-input';
import { SkeletonTable } from '@/shared/components/skeleton-table/skeleton-table';
import { CourseTable } from '@/shared/components/course-table/course-table';
import { EmptyState } from '@/shared/components/empty-state/empty-state';
import { ErrorState } from '@/shared/components/error-state/error-state';
import { ConfirmationModal } from '@/shared/components/confirmation-modal/confirmation-modal';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { TranslationService } from '@/core/services/translation-api';

@Component({
  selector: 'app-course-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIcon,
    HlmButton,
    TranslatePipe,
    SearchInput,
    SkeletonTable,
    CourseTable,
    EmptyState,
    ErrorState,
    ConfirmationModal,
    HlmSelectImports,
  ],
  templateUrl: './course-list.html',
  styleUrls: ['./course-list.css'],
})
export class CourseList {
  private readonly courseService = inject(CourseService);
  private readonly router = inject(Router);
  private readonly translationService = inject(TranslationService);

  protected courses = signal<Course[]>([]);
  protected isLoading = signal(true);
  protected error = signal<ErrorInfo | null>(null);
  protected searchQuery = signal('');
  protected allCourses: Course[] = [];
  protected selectedStatus = signal('All');

  protected showDeleteModal = signal(false);
  protected deletingCourse = signal<Course | null>(null);

  protected readonly statuses = [
    { value: 'All', key: 'filter.all' },
    { value: 'Active', key: 'course.form.statusActive' },
    { value: 'Draft', key: 'course.form.statusDraft' },
    { value: 'Archived', key: 'course.form.statusArchived' },
  ];

  protected readonly itemToString = (value: string | null): string => {
    const option = this.statuses.find((s) => s.value === value);

    return option ? this.translationService.translate(option.key) : '';
  };

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
      this.isLoading.set(true);
      this.error.set(null);
      this.courseService.searchCourses(query).subscribe({
        next: (courses) => {
          this.courses.set(courses);
          this.isLoading.set(false);
        },
        error: () => {
          this.error.set({ title: 'Search failed', message: 'Please try again.' });
          this.isLoading.set(false);
        },
      });
    } else {
      this.applyFilter();
    }
  }

  private applyFilter(): void {
    const status = this.selectedStatus();

    const filtered =
      status === 'All'
        ? this.allCourses
        : this.allCourses.filter((course) => course.status === status);

    this.courses.set(filtered);
  }

  protected onStatusChange(status: string): void {
    this.selectedStatus.set(status);
    this.applyFilter();
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
      this.courseService.deleteCourse(course.id).subscribe({
        next: () => {
          this.showDeleteModal.set(false);
          this.deletingCourse.set(null);
          toast.success('Course deleted');
          this.loadCourses();
        },
        error: () => {
          this.showDeleteModal.set(false);
          this.deletingCourse.set(null);
          toast.error('Failed to delete course', { description: 'Please try again.' });
        },
      });
    } else {
      this.showDeleteModal.set(false);
      this.deletingCourse.set(null);
    }
  }

  protected onDeleteCancel(): void {
    this.showDeleteModal.set(false);
    this.deletingCourse.set(null);
  }
}
