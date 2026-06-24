import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmLabel } from '@spartan-ng/helm/label';
import { HlmNativeSelect } from '@spartan-ng/helm/native-select';
import { HlmSpinner } from '@spartan-ng/helm/spinner';
import { HlmTextarea } from '@spartan-ng/helm/textarea';
import { SharedModule } from '@module/shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseForm } from './pages/course-form/course-form.component';
import { CourseDetail } from './pages/course-detail/course-detail.component';
import { CourseList } from './pages/course-list/course-list.component';

import {
  HlmSelect,
  HlmSelectContent,
  HlmSelectGroup,
  HlmSelectItem,
  HlmSelectLabel,
  HlmSelectTrigger,
  HlmSelectValue,
} from '@spartan-ng/helm/select';

import { BrnSelectImports } from '@spartan-ng/brain/select';

@NgModule({
  declarations: [CourseList, CourseDetail, CourseForm],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoursesRoutingModule,
    SharedModule,
    NgIcon,
    HlmBadge,
    HlmInput,
    HlmLabel,
    HlmButton,
    HlmSpinner,
    HlmNativeSelect,
    HlmTextarea,
    HlmSelect,
    HlmSelectTrigger,
    HlmSelectContent,
    HlmSelectValue,
    HlmSelectGroup,
    HlmSelectLabel,
    HlmSelectItem,
    ...BrnSelectImports,
  ],
})
export class CoursesModule {}
