import { createFeature, createReducer, on } from '@ngrx/store';
import { initalState, postsAdapter, PostsState } from './posts.state';
import {
  setAddPostSuccessAction,
  setGetPostsSuccessAction,
  setRemovePostSuccessAction,
  setUpdatePostSuccessAction,
} from './posts.actions';

export const POSTS_FEATURE_KEY = 'posts';

export interface PostsSlice {
  [POSTS_FEATURE_KEY]: PostsState;
}

export const postsFeature = createFeature({
  name: POSTS_FEATURE_KEY,
  reducer: createReducer(
    initalState,
    on(setAddPostSuccessAction, (state, action) => {
      return postsAdapter.addOne(action.post, state);
    }),
    on(setUpdatePostSuccessAction, (state, action) => {
      return postsAdapter.updateOne(action.post, state);
    }),
    on(setRemovePostSuccessAction, (state, action) => {
      return postsAdapter.removeOne(action.id, state);
    }),
    on(setGetPostsSuccessAction, (state, action) => {
      return postsAdapter.setAll(action.posts, state);
    })
  ),
});
