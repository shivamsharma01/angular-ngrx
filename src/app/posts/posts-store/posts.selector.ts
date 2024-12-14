import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.state';

const getPostState = createFeatureSelector<PostsState>('posts');

export const getPostsSelector = createSelector(getPostState, (state) => {
  return state.posts;
});

export const getPostsByIdSelector = (id: string) =>
  createSelector(getPostState, (state) => {
    return state.posts.find((post) => post.id === id);
  });
