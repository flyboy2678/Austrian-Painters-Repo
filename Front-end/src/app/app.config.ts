import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([authInterceptor]), withFetch()),
    // LUISTER HIER!!! LISTEN / FOCUS !
    // see that oak that says 'provideAnimationsAsync()' ? you need that line to ensure
    // you run animations, don't say I did not warn you
    // addition: DONT BE LIKE TONY AND PUT THE PROVIDER IN THE MAIN.TS FILE
    // He broke the code and i had to fix it
    provideAnimationsAsync(),
  ],
};
