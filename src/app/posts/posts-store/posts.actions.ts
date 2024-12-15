import { createAction, props } from '@ngrx/store';
import { Post } from '../../models/post.model';

export const ADD_POST_ACTION = createAction(
  '[Posts] Add',
  props<{ post: Post }>()
);
export const UPDATE_POST_ACTION = createAction(
  '[Posts] Update',
  props<{ post: Post }>()
);
export const REMOVE_POST_ACTION = createAction(
  '[Posts] Remove',
  props<{ id: String }>()
);
