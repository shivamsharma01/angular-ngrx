import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostService } from '../../services/posts.service';
import {
  dummyAction,
  setAddPostAction,
  setAddPostSuccessAction,
  setGetPostsAction,
  setGetPostsSuccessAction,
  setRemovePostAction,
  setRemovePostSuccessAction,
  setUpdatePostAction,
  setUpdatePostSuccessAction,
} from './posts.actions';
import {
  filter,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Router } from '@angular/router';
import { ROUTER_NAVIGATION, RouterNavigatedAction } from '@ngrx/router-store';
import { Update } from '@ngrx/entity';
import { Post } from '../../models/post.model';
import { PostsSlice } from './posts.reducer';
import { Store } from '@ngrx/store';
import { getPostsSelector } from './posts.selector';

@Injectable()
export class PostEffects {
  actions$ = inject(Actions);
  postService = inject(PostService);
  router = inject(Router);
  store = inject(Store<PostsSlice>);

  getPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setGetPostsAction),
      mergeMap((action) => {
        return this.postService.getPosts().pipe(
          map((data) => {
            return setGetPostsSuccessAction({ posts: data });
          })
        );
      })
    );
  });

  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setAddPostAction),
      mergeMap((action) => {
        return this.postService.addPost(action.post).pipe(
          map((data) => {
            const post = { ...action.post, id: data.name };
            return setAddPostSuccessAction({ post });
          })
        );
      })
    );
  });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setUpdatePostAction),
      mergeMap((action) => {
        return this.postService.updatePost(action.post).pipe(
          map((data) => {
            const id = String(action.post.id);
            const updatePost: Update<Post> = {
              id,
              changes: {
                ...action.post,
              },
            };
            return setUpdatePostSuccessAction({ post: updatePost });
          })
        );
      })
    );
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setRemovePostAction),
      mergeMap((action) => {
        return this.postService.removePost(String(action.id)).pipe(
          map((data) => {
            return setRemovePostSuccessAction({ id: action.id });
          })
        );
      })
    );
  });

  updatePostRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(setUpdatePostSuccessAction),
        tap((action) => {
          this.router.navigate(['posts']);
        })
      );
    },
    { dispatch: false }
  );

  getSinglePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) =>
        r.payload.routerState.url.startsWith('/posts/details')
      ),
      map((r: RouterNavigatedAction) => r.payload.routerState['params']['id']),
      withLatestFrom(this.store.select(getPostsSelector)),
      switchMap(([id, posts]) => {
        if (posts.length <= 0) {
          return this.postService.getPostById(id).pipe(
            map((data) => {
              const postData = [{ ...data, id }];
              return setGetPostsSuccessAction({ posts: postData });
            })
          );
        }
        return of(dummyAction());
      })
    );
  });
}
