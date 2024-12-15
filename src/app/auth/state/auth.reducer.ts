import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthState } from './auth.state';
import { initalState } from '../../posts/posts-store/posts.state';
import { setLoginSuccessAction } from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthSlice {
  [AUTH_FEATURE_KEY]: AuthState;
}

export const authFeature = createFeature({
  name: AUTH_FEATURE_KEY,
  reducer: createReducer(
    initalState,
    on(setLoginSuccessAction, (state, action) => ({
      ...state,
      user: action.user,
    }))
  ),
});
