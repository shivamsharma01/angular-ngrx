import { createAction, props } from '@ngrx/store';
import { Post } from '../../models/post.model';
import { Update } from '@ngrx/entity';

export const dummyAction = createAction('[Dummy state] set dummy');

export const setUpdatePostAction = createAction(
  '[Posts state] set update',
  props<{ post: Post }>()
);

export const setUpdatePostSuccessAction = createAction(
  '[Posts state] set update post success',
  props<{ post: Update<Post> }>()
);

export const setRemovePostAction = createAction(
  '[Posts state] set remove',
  props<{ id: string }>()
);

export const setRemovePostSuccessAction = createAction(
  '[Posts state] set remove post success',
  props<{ id: string }>()
);

export const setGetPostsAction = createAction('[Posts state] set get posts');

export const setGetPostsSuccessAction = createAction(
  '[Posts state] set get posts success',
  props<{ posts: Post[] }>()
);

export const setAddPostAction = createAction(
  '[Posts state] set add',
  props<{ post: Post }>()
);

export const setAddPostSuccessAction = createAction(
  '[Posts state] set add post success',
  props<{ post: Post }>()
);
