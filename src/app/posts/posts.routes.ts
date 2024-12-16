import { Routes } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { provideState } from '@ngrx/store';
import { AddPostComponent } from './add-post/add-post.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { postsFeature } from './posts-store/posts.reducer';
import { provideEffects } from '@ngrx/effects';
import { PostEffects } from './posts-store/posts.effects';
import { PostService } from '../services/posts.service';

export const POSTS_ROUTES: Routes = [
  {
    path: '',
    component: PostListComponent,
    providers: [
      provideEffects(PostEffects),
      PostService,
      provideState(postsFeature),
    ],
    children: [
      { path: 'add', component: AddPostComponent },
      { path: 'edit/:id', component: UpdatePostComponent },
    ],
  },
];
