import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.state';
import { POSTS_FEATURE_KEY } from './posts.reducer';

const getPostState = createFeatureSelector<PostsState>(POSTS_FEATURE_KEY);

export const getPostsSelector = createSelector(getPostState, (state) => {
  return state.posts;
});

export const getPostsByIdSelector = (id: string) =>
  createSelector(getPostState, (state) => {
    return state.posts.find((post) => post.id === id);
  });
