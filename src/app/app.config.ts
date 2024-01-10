import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor, ErrorInterceptor } from '@ddsi-labs-apps/services';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes, withEnabledBlockingInitialNavigation()), importProvidersFrom([BrowserAnimationsModule]),
  provideHttpClient(
    withInterceptorsFromDi()
  ),
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }
],
};
