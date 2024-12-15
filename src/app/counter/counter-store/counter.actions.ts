import { createAction, props } from '@ngrx/store';

export const setIncrementAction = createAction('[Counter state] set increment');
export const setDecrementAction = createAction('[Counter state] set decrement');
export const setResetAction = createAction('[Counter state] set reset');
export const setChannelNameAction = createAction(
  '[Counter state] set channel name'
);
export const setCustomIncrementAction = createAction(
  '[Counter state] set custom Increment',
  props<{ value: number }>()
);
