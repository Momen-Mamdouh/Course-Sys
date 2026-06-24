import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmAlertImports } from '@spartan-ng/helm/alert';
import { HlmAlertDialogImports } from '@spartan-ng/helm/alert-dialog';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmEmptyImports } from '@spartan-ng/helm/empty';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmSkeleton } from '@spartan-ng/helm/skeleton';
import { HlmToaster } from '@spartan-ng/helm/sonner';
import { HlmSpinner } from '@spartan-ng/helm/spinner';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { ConfirmationModal } from './components/confirmation-modal/confirmation-modal.component';
import { CourseTable } from './components/course-table/course-table.component';
import { EmptyState } from './components/empty-state/empty-state.component';
import { ErrorState } from './components/error-state/error-state.component';
import { LoadingIndicator } from './components/loading-indicator/loading-indicator.component';
import { SearchInput } from './components/search-input/search-input.component';
import { SkeletonDetail } from './components/skeleton-detail/skeleton-detail.component';
import { SkeletonTable } from './components/skeleton-table/skeleton-table.component';
import { StatusBadge } from './components/status-badge/status-badge.component';
import { TranslatePipe } from './pipes/translate.pipe';

@NgModule({
  declarations: [
    SearchInput,
    StatusBadge,
    LoadingIndicator,
    EmptyState,
    ErrorState,
    ConfirmationModal,
    CourseTable,
    SkeletonTable,
    SkeletonDetail,
  ],
  imports: [
    CommonModule,
    CurrencyPipe,
    NgIcon,
    HlmInput,
    HlmSpinner,
    HlmBadge,
    HlmButton,
    HlmSkeleton,
    HlmToaster,
    ...HlmAlertImports,
    ...HlmAlertDialogImports,
    ...HlmEmptyImports,
    ...HlmTableImports,
    TranslatePipe,
  ],
  exports: [
    TranslatePipe,
    SearchInput,
    StatusBadge,
    LoadingIndicator,
    EmptyState,
    ErrorState,
    ConfirmationModal,
    CourseTable,
    SkeletonTable,
    SkeletonDetail,
    HlmToaster,
  ],
})
export class SharedModule {}
