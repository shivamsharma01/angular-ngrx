import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Post } from '../posts-store/posts.state';
import { getPosts, getPostsById } from '../posts-store/posts.selector';
import { map, Observable, Subscription } from 'rxjs';
import { updatePost } from '../posts-store/posts.action';

@Component({
  selector: 'app-update-post',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-post.component.html',
  styleUrl: './update-post.component.css',
})
export class UpdatePostComponent {
  subscription: Subscription;
  postForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

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
    this.subscription = this.activatedRoute.paramMap.subscribe(
      (params: ParamMap) => {
        const id = params.get('id');
        this.populateForm(this.store.select(getPostsById, { id }));
      }
    );
  }

  populateForm(post$: Observable<Post>): void {
    post$.subscribe((post) => {
      if (post) {
        this.postForm.patchValue(post);
      }
    });
  }

  update() {
    if (this.postForm.valid) {
      const post: Post = this.postForm.value;
      this.store.dispatch(updatePost({ post }));
      this.router.navigate(['posts']);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
