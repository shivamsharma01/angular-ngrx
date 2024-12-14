import { createAction, props } from '@ngrx/store';
import { Post } from './posts.state';

export const addPost = createAction('[Posts] Add', props<{ post: Post }>());
export const updatePost = createAction(
  '[Posts] Update',
  props<{ post: Post }>()
);
export const removePost = createAction(
  '[Posts] Remove',
  props<{ id: String | undefined }>()
);
