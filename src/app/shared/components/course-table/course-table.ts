import { CurrencyPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { Course } from '@/core/interfaces/course';
import { TranslatePipe } from '@/shared/pipes/translate.pipe';

@Component({
  selector: 'app-course-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, NgIcon, HlmBadge, HlmButton, ...HlmTableImports, TranslatePipe],
  templateUrl: './course-table.html',
  styleUrls: ['./course-table.css'],
})
export class CourseTable {
  courses = input<Course[]>([]);
  showActions = input(true);
  view = output<Course>();
  edit = output<Course>();
  delete = output<Course>();

  protected readonly columns = [
    { key: 'id', label: 'course.table.id' },
    { key: 'courseName', label: 'course.table.courseName' },
    { key: 'instructorName', label: 'course.table.instructor' },
    { key: 'category', label: 'course.table.category' },
    { key: 'duration', label: 'course.table.duration' },
    { key: 'price', label: 'course.table.price' },
    { key: 'status', label: 'course.table.status' },
    { key: 'createdDate', label: 'course.table.created' },
  ];

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
