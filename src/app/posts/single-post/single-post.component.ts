import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.model';
import { Store } from '@ngrx/store';
import { PostsSlice } from '../posts-store/posts.reducer';
import { getPostsByIdSelector } from '../posts-store/posts.selector';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css',
})
export class SinglePostComponent {
  post$: Observable<Post>;

  constructor(private store: Store<PostsSlice>) {}

  ngOnInit(): void {
    this.post$ = this.store.select(getPostsByIdSelector);
  }
}
