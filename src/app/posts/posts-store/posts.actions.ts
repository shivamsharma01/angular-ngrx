import { createAction, props } from '@ngrx/store';
import { Post } from '../../models/post.model';

export const setAddPostAction = createAction(
  '[Posts state] set add',
  props<{ post: Post }>()
);
export const setUpdatePostAction = createAction(
  '[Posts state] set update',
  props<{ post: Post }>()
);
export const setRemovePostAction = createAction(
  '[Posts state] set remove',
  props<{ id: String }>()
);
