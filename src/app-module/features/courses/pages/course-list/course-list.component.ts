import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '@module/core/services/course-api';
import { Course } from '@module/core/interfaces/course';
import { ErrorInfo } from '@module/core/interfaces/error-info';
import { toast } from '@spartan-ng/brain/sonner';

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
  allCourses: Course[] = [];

  showDeleteModal = false;
  deletingCourse: Course | null = null;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private cdr: ChangeDetectorRef,
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

  private applyFilter(): void {
    this.courses = [...this.allCourses];
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
