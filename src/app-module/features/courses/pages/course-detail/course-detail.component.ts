import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '@module/core/services/course-api';
import { Course } from '@module/core/interfaces/course';
import { ErrorInfo } from '@module/core/interfaces/error-info';
import { toast } from '@spartan-ng/brain/sonner';

@Component({
  selector: 'app-module-course-detail',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
})
export class CourseDetail implements OnInit {
  course: Course | null = null;
  isLoading = true;
  error: ErrorInfo | null = null;
  showDeleteModal = false;

  private courseId = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCourse();
  }

  loadCourse(): void {
    this.isLoading = true;
    this.error = null;
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (course) => {
        if (course) {
          this.course = course;
        } else {
          this.error = { title: 'Course not found', message: 'This course does not exist.' };
        }
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = { title: 'Failed to load course', message: 'Please try again.' };
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/courses']);
  }

  onEdit(): void {
    this.router.navigate(['/courses', this.courseId, 'edit']);
  }

  onDelete(): void {
    this.showDeleteModal = true;
  }

  onDeleteConfirm(): void {
    this.courseService.deleteCourse(this.courseId).subscribe({
      next: () => {
        this.showDeleteModal = false;
        toast.success('Course deleted');
        this.router.navigate(['/courses']);
      },
      error: () => {
        this.showDeleteModal = false;
        toast.error('Failed to delete course', { description: 'Please try again.' });
      },
    });
  }

  onDeleteCancel(): void {
    this.showDeleteModal = false;
  }

  badgeVariant(status: string): 'default' | 'secondary' | 'destructive' {
    switch (status) {
      case 'Active': return 'default';
      case 'Draft': return 'secondary';
      case 'Archived': return 'destructive';
      default: return 'default';
    }
  }
}
