import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '@module/core/services/course-api';
import { ErrorInfo } from '@module/core/interfaces/error-info';
import { toast } from '@spartan-ng/brain/sonner';

@Component({
  selector: 'app-module-course-form',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css'],
})
export class CourseForm implements OnInit {
  isEdit = false;
  isSaving = false;
  isLoading = false;
  error: ErrorInfo | null = null;
  private courseId = 0;

  form = new FormGroup({
    courseName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    instructorName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    category: new FormControl('', [Validators.required, Validators.minLength(2)]),
    duration: new FormControl(1, [Validators.required, Validators.min(1)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    status: new FormControl<'Active' | 'Draft' | 'Archived'>('Draft', Validators.required),
    description: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.courseId = Number(idParam);
      this.isEdit = true;
      this.loadCourse();
    }
  }

  loadCourse(): void {
    this.isLoading = true;
    this.error = null;
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (course) => {
        if (course) {
          this.form.patchValue({
            courseName: course.courseName,
            instructorName: course.instructorName,
            category: course.category,
            duration: course.duration,
            price: course.price,
            status: course.status,
            description: course.description || '',
          });
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
    if (this.isEdit) {
      this.router.navigate(['/courses', this.courseId]);
    } else {
      this.router.navigate(['/courses']);
    }
  }

  onSubmit(): void {
    if (this.form.invalid || this.isSaving) return;

    this.isSaving = true;
    const data = this.form.value as {
      courseName: string;
      instructorName: string;
      category: string;
      duration: number;
      price: number;
      status: 'Active' | 'Draft' | 'Archived';
      description?: string;
    };

    const action = this.isEdit
      ? this.courseService.updateCourse(this.courseId, data)
      : this.courseService.createCourse(data);

    action.subscribe({
      next: () => {
        this.isSaving = false;
        toast.success(this.isEdit ? 'Course updated' : 'Course created');
        this.router.navigate(['/courses']);
      },
      error: () => {
        this.isSaving = false;
        toast.error(this.isEdit ? 'Failed to update course' : 'Failed to create course', { description: 'Please try again.' });
      },
    });
  }
}
