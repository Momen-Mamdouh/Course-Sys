import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../../core/interfaces/course';

@Component({
  selector: 'app-module-course-table',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.css'],
})
export class CourseTable {
  @Input() courses: Course[] = [];
  @Input() showActions = true;
  @Output() view = new EventEmitter<Course>();
  @Output() edit = new EventEmitter<Course>();
  @Output() delete = new EventEmitter<Course>();

  trackById(_index: number, course: Course): number {
    return course.id;
  }

  protected badgeVariant(status: string): 'default' | 'secondary' | 'destructive' {
    switch (status) {
      case 'Active':
        return 'default';
      case 'Draft':
        return 'secondary';
      case 'Archived':
        return 'destructive';
      default:
        return 'default';
    }
  }
}
