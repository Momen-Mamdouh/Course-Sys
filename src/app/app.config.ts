import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import {
  lucideChevronLeft,
  lucideCircleCheck,
  lucideEye,
  lucideInbox,
  lucideInfo,
  lucideLanguages,
  lucideLoader2,
  lucideOctagonX,
  lucidePencil,
  lucidePlus,
  lucideSearch,
  lucideTriangleAlert,
  lucideTrash,
  lucideX,
} from '@ng-icons/lucide';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideIcons({
      lucideChevronLeft,
      lucideCircleCheck,
      lucideEye,
      lucideInbox,
      lucideInfo,
      lucideLanguages,
      lucideLoader2,
      lucideOctagonX,
      lucidePencil,
      lucidePlus,
      lucideSearch,
      lucideTriangleAlert,
      lucideTrash,
      lucideX,
    }),
  ],
};
