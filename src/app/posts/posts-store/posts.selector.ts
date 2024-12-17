import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.state';
import { POSTS_FEATURE_KEY } from './posts.reducer';
import { getCurrentRoute } from '../../router/router.selector';
import { Post } from '../../models/post.model';
import { RouterStateUrl } from '../../router/custom.serializer';
import { Observable } from 'rxjs';

const getPostState = createFeatureSelector<PostsState>(POSTS_FEATURE_KEY);

export const getPostsSelector = createSelector(getPostState, (state) => {
  return state.posts;
});

export const getPostsByIdSelector = createSelector(
  getPostsSelector,
  getCurrentRoute,
  (posts: Post[], route: RouterStateUrl): Post => {
    return (
      posts ? posts.find((post) => post.id === route.params['id']) : null
    ) as Post;
  }
);
