import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { setAddPostAction } from '../posts-store/posts.actions';
import { CommonModule } from '@angular/common';
import { PostsSlice } from '../posts-store/posts.reducer';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css',
})
export class AddPostComponent {
  postForm: FormGroup;

  constructor(private store: Store<PostsSlice>) {}
  ngOnInit() {
    this.postForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  submit() {
    if (this.postForm.valid) {
      const post: Post = this.postForm.value;
      this.store.dispatch(setAddPostAction({ post }));
    }
  }
}
