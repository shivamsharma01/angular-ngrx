import { createAction, props } from '@ngrx/store';

export const SHOW_LOADING_ACTION = createAction(
  '[Loading] show',
  props<{ status: boolean }>()
);
