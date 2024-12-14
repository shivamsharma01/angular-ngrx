import { createAction, props } from '@ngrx/store';

export const INCREMENT_ACTION = createAction('[Counter] Increment');
export const DECREMENT_ACTION = createAction('[Counter] Decrement');
export const RESET_ACTION = createAction('[Counter] Reset');
export const CHANNEL_NAME_ACTION = createAction('[Counter] ChannelName');
export const CUSTOM_INCREMENT_ACTION = createAction(
  '[Counter] Custom Increment',
  props<{ value: number }>()
);
