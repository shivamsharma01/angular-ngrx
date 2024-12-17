import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { getPostsByIdSelector } from '../posts-store/posts.selector';
import { Subscription } from 'rxjs';
import { setUpdatePostAction } from '../posts-store/posts.actions';
import { PostsSlice } from '../posts-store/posts.reducer';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-update-post',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-post.component.html',
  styleUrl: './update-post.component.css',
})
export class UpdatePostComponent {
  subscription: Subscription;
  post: Post;
  postForm: FormGroup;

  constructor(private store: Store<PostsSlice>) {}

  ngOnInit() {
    this.postForm = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
    this.subscription = this.store
      .select(getPostsByIdSelector)
      .subscribe((post) => {
        this.post = post as Post;
        this.postForm.patchValue(this.post);
      });
  }

  update() {
    if (this.postForm.valid) {
      const post: Post = this.postForm.value;
      this.store.dispatch(setUpdatePostAction({ post }));
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
