import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authFeature } from './state/auth.reducer';
import { AuthEffects } from './state/auth.effects';
import { provideHttpClient } from '@angular/common/http';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent,
    providers: [provideState(authFeature), provideEffects([AuthEffects])],
  },
];
