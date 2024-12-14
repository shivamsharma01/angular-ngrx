import { Component } from '@angular/core';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../posts-store/posts.state';
import { getPosts } from '../posts-store/posts.selector';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { removePost } from '../posts-store/posts.action';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent {
  posts$: Observable<Post[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.posts$ = this.store.select(getPosts);
  }

  removePostById(id: string) {
    this.store.dispatch(removePost({ id }));
  }
}
