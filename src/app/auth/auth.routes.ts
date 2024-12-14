import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { provideState } from '@ngrx/store';
import { authFeature } from './state/auth.reducer';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent,
    providers: [provideState(authFeature)],
  },
];
