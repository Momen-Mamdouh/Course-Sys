import { CurrencyPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { Course } from '@/core/interfaces/course';

@Component({
  selector: 'app-course-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, NgIcon, HlmBadge, HlmButton, ...HlmTableImports],
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
    { key: 'id', label: 'ID' },
    { key: 'courseName', label: 'Course Name' },
    { key: 'instructorName', label: 'Instructor' },
    { key: 'category', label: 'Category' },
    { key: 'duration', label: 'Duration' },
    { key: 'price', label: 'Price' },
    { key: 'status', label: 'Status' },
    { key: 'createdDate', label: 'Created' },
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
