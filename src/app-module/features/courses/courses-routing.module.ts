import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseList } from './pages/course-list/course-list.component';
import { CourseDetail } from './pages/course-detail/course-detail.component';
import { CourseForm } from './pages/course-form/course-form.component';

const routes: Routes = [
  { path: '', component: CourseList },
  { path: 'new', component: CourseForm },
  { path: ':id', component: CourseDetail },
  { path: ':id/edit', component: CourseForm },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
