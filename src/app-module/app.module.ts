import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgIconsModule } from '@ng-icons/core';
import {
  lucideChevronLeft,
  lucideCircleCheck,
  lucideEye,
  lucideInbox,
  lucideInfo,
  lucideLoader2,
  lucideOctagonX,
  lucidePencil,
  lucidePlus,
  lucideSearch,
  lucideTriangleAlert,
  lucideTrash,
  lucideX,
} from '@ng-icons/lucide';
import { AppRoutingModule } from './app-routing.module';
import { App } from './app';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgIconsModule.withIcons({
      lucideChevronLeft,
      lucideCircleCheck,
      lucideEye,
      lucideInbox,
      lucideInfo,
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
