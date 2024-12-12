import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Post, PostsState } from '../posts-store/posts.state';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { addPost } from '../posts-store/posts.action';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css',
})
export class AddPostComponent {
  postForm: FormGroup;

  constructor(private store: Store<AppState>) {}
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
    const form: Post = this.postForm.value;
    this.store.dispatch(addPost({ post: form }));
  }
}