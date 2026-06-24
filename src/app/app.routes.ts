import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  {
    path: 'courses',
    loadComponent: () =>
      import('./features/courses/pages/course-list/course-list').then((m) => m.CourseList),
  },
  {
    path: 'courses/new',
    loadComponent: () =>
      import('./features/courses/pages/course-form/course-form').then((m) => m.CourseForm),
  },
  {
    path: 'courses/:id',
    loadComponent: () =>
      import('./features/courses/pages/course-detail/course-detail').then((m) => m.CourseDetail),
  },
  {
    path: 'courses/:id/edit',
    loadComponent: () =>
      import('./features/courses/pages/course-form/course-form').then((m) => m.CourseForm),
  },
];
