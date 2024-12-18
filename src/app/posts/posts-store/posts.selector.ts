import { createFeatureSelector, createSelector } from '@ngrx/store';
import { postsAdapter, PostsState } from './posts.state';
import { POSTS_FEATURE_KEY } from './posts.reducer';
import { getCurrentRoute } from '../../router/router.selector';
import { Post } from '../../models/post.model';
import { RouterStateUrl } from '../../router/custom.serializer';

const getPostState = createFeatureSelector<PostsState>(POSTS_FEATURE_KEY);
const postsSelectors = postsAdapter.getSelectors();

export const getPostsSelector = createSelector(
  getPostState,
  postsSelectors.selectAll
);

const getPostEntities = createSelector(
  getPostState,
  postsSelectors.selectEntities
);

export const getPostsByIdSelector = createSelector(
  getPostEntities,
  getCurrentRoute,
  (posts, route: RouterStateUrl) => {
    return (posts ? posts[route.params['id']] : null) as Post;
  }
);
