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

@Component({
  selector: 'app-course-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule, NgIcon,
    HlmInput, HlmLabel, HlmButton, HlmSpinner, HlmNativeSelect, HlmTextarea,
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
  private courseId = 0;

  protected form = new FormGroup({
    courseName: new FormControl('', Validators.required),
    instructorName: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    duration: new FormControl(1, [Validators.required, Validators.min(1)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    status: new FormControl<'Active' | 'Draft' | 'Archived'>('Draft'),
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

  private loadCourse(): void {
    this.courseService.getCourseById(this.courseId).subscribe((course) => {
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
      }
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

    action.subscribe(() => {
      this.isSaving.set(false);
      this.router.navigate(['/courses']);
    });
  }
}
