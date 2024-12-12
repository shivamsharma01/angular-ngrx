import { createReducer, on } from '@ngrx/store';
import { initalState, Post } from './posts.state';
import { addPost } from './posts.action';

const _postsReducer = createReducer(
  initalState,
  on(addPost, (state, action) => {
    const id = state.posts.length + 1;
    const post: Post = { ...action.post, id };
    return {
      posts: [...state.posts, post],
    };
  })
);

export function postReducer(state, action) {
  return _postsReducer(state, action);
}
