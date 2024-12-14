import { Routes } from '@angular/router';

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
    path: '',
    redirectTo: 'counter',
    pathMatch: 'full',
  },
];
