import { createAction, props } from '@ngrx/store';

export const LOGIN_START_ACTION = createAction(
  '[Auth] Login Start',
  props<{ email: string; password: string }>()
);

export const LOGIN_SUCCESS_ACTION = createAction('[Auth] Login Success');

export const LOGIN_FAIL_ACTION = createAction('[Auth] Login Fail');
