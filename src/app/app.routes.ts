import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth.guard';
import { SinglePostComponent } from './posts/single-post/single-post.component';

export const routes: Routes = [
  {
    path: 'counter',
    loadChildren: () => import('./counter/').then((m) => m.COUNTER_ROUTES),
  },
  {
    path: 'posts',
    loadChildren: () => import('./posts/').then((m) => m.POSTS_ROUTES),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'posts/details/:id',
    component: SinglePostComponent,
    canActivate: [AuthGuard],
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
