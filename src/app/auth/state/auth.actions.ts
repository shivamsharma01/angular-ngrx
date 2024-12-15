import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const setLoginStartAction = createAction(
  '[Auth state] set login start',
  props<{ email: string; password: string }>()
);

export const setLoginSuccessAction = createAction(
  '[Auth state] set login success',
  props<{ user: User }>()
);
