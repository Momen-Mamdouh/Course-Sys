import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app.module';

platformBrowser().bootstrapModule(AppModule)
  .catch((err: unknown) => console.error(err));
