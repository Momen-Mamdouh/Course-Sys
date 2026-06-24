import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmLabel } from '@spartan-ng/helm/label';
import { HlmNativeSelect } from '@spartan-ng/helm/native-select';
import { HlmSpinner } from '@spartan-ng/helm/spinner';
import { HlmTextarea } from '@spartan-ng/helm/textarea';
import { CourseService } from '@/core/services/course-api';
import { ErrorInfo } from '@/core/interfaces/error-info';
import { LoadingIndicator } from '@/shared/components/loading-indicator/loading-indicator';
import { ErrorState } from '@/shared/components/error-state/error-state';
import { toast } from '@spartan-ng/brain/sonner';

@Component({
  selector: 'app-course-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule, NgIcon,
    HlmInput, HlmLabel, HlmButton, HlmSpinner, HlmNativeSelect, HlmTextarea,
    ErrorState, LoadingIndicator,
  ],
  templateUrl: './course-form.html',
  styleUrls: ['./course-form.css'],
})
export class CourseForm {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly courseService = inject(CourseService);

  protected isEdit = signal(false);
  protected isSaving = signal(false);
  protected isLoading = signal(false);
  protected error = signal<ErrorInfo | null>(null);
  private courseId = 0;

  protected form = new FormGroup({
    courseName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    instructorName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    category: new FormControl('', [Validators.required, Validators.minLength(2)]),
    duration: new FormControl(1, [Validators.required, Validators.min(1)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    status: new FormControl<'Active' | 'Draft' | 'Archived'>('Draft', Validators.required),
    description: new FormControl(''),
  });

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.courseId = Number(idParam);
      this.isEdit.set(true);
      this.loadCourse();
    }
  }

  protected loadCourse(): void {
    this.isLoading.set(true);
    this.error.set(null);
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
    if (this.isEdit()) {
      this.router.navigate(['/courses', this.courseId]);
    } else {
      this.router.navigate(['/courses']);
    }
  }

  protected onSubmit(): void {
    if (this.form.invalid || this.isSaving()) return;

    this.isSaving.set(true);
    const data = this.form.value as {
      courseName: string;
      instructorName: string;
      category: string;
      duration: number;
      price: number;
      status: 'Active' | 'Draft' | 'Archived';
      description?: string;
    };

    const action = this.isEdit()
      ? this.courseService.updateCourse(this.courseId, data)
      : this.courseService.createCourse(data);

    action.subscribe({
      next: () => {
        this.isSaving.set(false);
        toast.success(this.isEdit() ? 'Course updated' : 'Course created');
        this.router.navigate(['/courses']);
      },
      error: () => {
        this.isSaving.set(false);
        toast.error(this.isEdit() ? 'Failed to update course' : 'Failed to create course', { description: 'Please try again.' });
      },
    });
  }
}
