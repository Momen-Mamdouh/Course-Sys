import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgIconsModule, NgIcon } from '@ng-icons/core';
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
import { HlmButton } from '@spartan-ng/helm/button';
import { AppRoutingModule } from './app-routing.module';
import { App } from './app';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HlmButton,
    NgIcon,
    NgIconsModule.withIcons({
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
  providers: [],
  bootstrap: [App],
})
export class AppModule {}
