import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

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
import { CustomSerializer } from './router/custom.serializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
      router: routerReducer,
    }),
    provideRouterStore({
      serializer: CustomSerializer,
    }),
    provideState(sharedFeature),
    provideState(authFeature),
    provideEffects(AuthEffects),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
