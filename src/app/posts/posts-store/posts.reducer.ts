import { createReducer, on } from '@ngrx/store';
import { initalState, Post } from './posts.state';
import { addPost, removePost, updatePost } from './posts.action';

const _postsReducer = createReducer(
  initalState,
  on(addPost, (state, action) => {
    const id = String(state.posts.length + 1);
    const post: Post = { ...action.post, id };
    return {
      ...state,
      posts: [...state.posts, post],
    };
  }),
  on(updatePost, (state, action) => {
    const updatedPosts: Post[] = state.posts.map((post) =>
      post.id === action.post.id ? action.post : post
    );
    return {
      ...state,
      posts: updatedPosts,
    };
  }),
  on(removePost, (state, action) => {
    const remainingPosts: Post[] = state.posts.filter(
      (post) => post.id !== action.id
    );
    return {
      ...state,
      posts: remainingPosts,
    };
  })
);

export function postReducer(state, action) {
  return _postsReducer(state, action);
}
