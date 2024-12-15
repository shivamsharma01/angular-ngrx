import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { getPostsByIdSelector } from '../posts-store/posts.selector';
import { Observable, Subscription } from 'rxjs';
import { UPDATE_POST_ACTION } from '../posts-store/posts.actions';
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
  postForm: FormGroup;

  constructor(
    private store: Store<PostsSlice>,
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
        const id = params.get('id') as string;
        this.populateForm(this.store.select(getPostsByIdSelector(id)));
      }
    );
  }

  populateForm(post$: Observable<Post | undefined>): void {
    post$.subscribe((post) => {
      if (post) {
        this.postForm.patchValue(post);
      }
    });
  }

  update() {
    if (this.postForm.valid) {
      const post: Post = this.postForm.value;
      this.store.dispatch(UPDATE_POST_ACTION({ post }));
      this.router.navigate(['posts']);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
