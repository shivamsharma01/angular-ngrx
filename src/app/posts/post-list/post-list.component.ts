import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getPostsSelector } from '../posts-store/posts.selector';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  setGetPostsAction,
  setRemovePostAction,
} from '../posts-store/posts.actions';
import { PostsSlice } from '../posts-store/posts.reducer';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent {
  posts$: Observable<Post[]>;

  constructor(private store: Store<PostsSlice>) {}

  ngOnInit() {
    this.posts$ = this.store.select(getPostsSelector);
    this.store.dispatch(setGetPostsAction());
  }

  removePostById(id: string) {
    this.store.dispatch(setRemovePostAction({ id }));
  }
}
