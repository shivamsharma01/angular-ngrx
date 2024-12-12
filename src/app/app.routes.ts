import { Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { AddPostComponent } from './posts/add-post/add-post.component';

export const routes: Routes = [
  {
    path: 'counter',
    component: CounterComponent,
  },
  {
    path: 'posts',
    component: PostListComponent,
    children: [{ path: 'add', component: AddPostComponent }],
  },
  {
    path: '',
    redirectTo: 'counter',
    pathMatch: 'full',
  },
];
