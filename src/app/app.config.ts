import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { sharedFeature } from './shared/store/shared.reducer';
import { authFeature } from './auth/state/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './auth/state/auth.effects';
import { AuthTokenInterceptor } from './services/auth-token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({}),
    provideState(sharedFeature),
    provideState(authFeature),
    provideEffects(AuthEffects),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
