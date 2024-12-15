import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './state/auth.effects';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent,
    providers: [provideEffects([AuthEffects])],
  },
];
