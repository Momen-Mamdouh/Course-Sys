import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '@module/core/services/course-api';
import { Course } from '@module/core/interfaces/course';
import { ErrorInfo } from '@module/core/interfaces/error-info';
import { toast } from '@spartan-ng/brain/sonner';
import { TranslationService } from '@module/core/services/translation-api';

@Component({
  selector: 'app-module-course-list',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseList implements OnInit {
  courses: Course[] = [];
  isLoading = true;
  error: ErrorInfo | null = null;
  searchQuery = '';
  selectedStatus = 'All';
  allCourses: Course[] = [];

  showDeleteModal = false;
  deletingCourse: Course | null = null;

  readonly statuses = [
    { value: 'All', key: 'filter.all' },
    { value: 'Active', key: 'course.form.statusActive' },
    { value: 'Draft', key: 'course.form.statusDraft' },
    { value: 'Archived', key: 'course.form.statusArchived' },
  ];

  test() {
    console.log('hi');
  }

  constructor(
    private courseService: CourseService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private translationService: TranslationService,
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.isLoading = true;
    this.error = null;
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.allCourses = courses;
        this.applyFilter();
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = { title: 'Failed to load courses', message: 'Please try again.' };
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.applyFilter();
    this.cdr.markForCheck();
    if (query.trim()) {
      this.isLoading = true;
      this.error = null;
      this.courseService.searchCourses(query).subscribe({
        next: (courses) => {
          this.courses = courses;
          this.isLoading = false;
          this.cdr.markForCheck();
        },
        error: () => {
          this.error = { title: 'Search failed', message: 'Please try again.' };
          this.isLoading = false;
          this.cdr.markForCheck();
        },
      });
    } else {
      this.applyFilter();
    }
  }

  itemToString = (value: string | null): string => {
    const option = this.statuses.find((s) => s.value === value);

    return option ? this.translationService.translate(option.key) : '';
  };

  onStatusChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;

    this.selectedStatus = value;
    this.applyFilter();
    this.cdr.markForCheck();
  }

  private applyFilter(): void {
    let filtered = [...this.allCourses];

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();

      filtered = filtered.filter((course) => course.courseName.toLowerCase().includes(q));
    }

    if (this.selectedStatus !== 'All') {
      filtered = filtered.filter((course) => course.status === this.selectedStatus);
    }

    this.courses = filtered;
  }

  onAdd(): void {
    this.router.navigate(['/courses/new']);
  }

  onView(course: Course): void {
    this.router.navigate(['/courses', course.id]);
  }

  onEdit(course: Course): void {
    this.router.navigate(['/courses', course.id, 'edit']);
  }

  onDelete(course: Course): void {
    this.deletingCourse = course;
    this.showDeleteModal = true;
  }

  onDeleteConfirm(): void {
    const course = this.deletingCourse;
    if (course) {
      this.courseService.deleteCourse(course.id).subscribe({
        next: () => {
          this.showDeleteModal = false;
          this.deletingCourse = null;
          this.cdr.markForCheck();
          toast.success('Course deleted');
          this.loadCourses();
        },
        error: () => {
          this.showDeleteModal = false;
          this.deletingCourse = null;
          this.cdr.markForCheck();
          toast.error('Failed to delete course', { description: 'Please try again.' });
        },
      });
    } else {
      this.showDeleteModal = false;
      this.deletingCourse = null;
    }
  }

  onDeleteCancel(): void {
    this.showDeleteModal = false;
    this.deletingCourse = null;
  }
}
