import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: 'counter',
    loadChildren: () => import('./counter/').then((m) => m.COUNTER_ROUTES),
  },
  {
    path: 'posts',
    loadChildren: () => import('./posts/').then((m) => m.POSTS_ROUTES),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
