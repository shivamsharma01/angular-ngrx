import { createFeature, createReducer, on } from '@ngrx/store';
import { initalState, PostsState } from './posts.state';
import {
  setAddPostSuccessAction,
  setGetPostsSuccessAction,
  setRemovePostSuccessAction,
  setUpdatePostSuccessAction,
} from './posts.actions';
import { Post } from '../../models/post.model';

export const POSTS_FEATURE_KEY = 'posts';

export interface PostsSlice {
  [POSTS_FEATURE_KEY]: PostsState;
}

export const postsFeature = createFeature({
  name: POSTS_FEATURE_KEY,
  reducer: createReducer(
    initalState,
    on(setAddPostSuccessAction, (state, action) => {
      return {
        ...state,
        posts: [...state.posts, action.post],
      };
    }),
    on(setUpdatePostSuccessAction, (state, action) => {
      const updatedPosts: Post[] = state.posts.map((post) =>
        post.id === action.post.id ? action.post : post
      );
      return {
        ...state,
        posts: updatedPosts,
      };
    }),
    on(setRemovePostSuccessAction, (state, action) => {
      const remainingPosts: Post[] = state.posts.filter(
        (post) => post.id !== action.id
      );
      return {
        ...state,
        posts: remainingPosts,
      };
    }),
    on(setGetPostsSuccessAction, (state, action) => {
      return {
        ...state,
        posts: [...action.posts],
      };
    })
  ),
});
