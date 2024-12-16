import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const setLoginStartAction = createAction(
  '[Auth state] set login start',
  props<{ email: string; password: string }>()
);

export const setLoginSuccessAction = createAction(
  '[Auth state] set login success',
  props<{ user: User; redirect: boolean }>()
);

export const setSignUpStartAction = createAction(
  '[Auth state] set signup start',
  props<{ email: string; password: string }>()
);

export const setSignUpSuccessAction = createAction(
  '[Auth state] set signup success',
  props<{ user: User; redirect: boolean }>()
);

export const setAutoLoginAction = createAction('[Auth state] set auto login');

export const setLogoutAction = createAction('[Auth state] set auto logout');
