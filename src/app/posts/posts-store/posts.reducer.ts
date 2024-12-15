import { createFeature, createReducer, on } from '@ngrx/store';
import { initalState, PostsState } from './posts.state';
import {
  setAddPostAction,
  setRemovePostAction,
  setUpdatePostAction,
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
    on(setAddPostAction, (state, action) => {
      const id = String(state.posts.length + 1);
      const post: Post = { ...action.post, id };
      return {
        ...state,
        posts: [...state.posts, post],
      };
    }),
    on(setUpdatePostAction, (state, action) => {
      const updatedPosts: Post[] = state.posts.map((post) =>
        post.id === action.post.id ? action.post : post
      );
      return {
        ...state,
        posts: updatedPosts,
      };
    }),
    on(setRemovePostAction, (state, action) => {
      const remainingPosts: Post[] = state.posts.filter(
        (post) => post.id !== action.id
      );
      return {
        ...state,
        posts: remainingPosts,
      };
    })
  ),
});
