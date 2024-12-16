import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';
import { AUTH_FEATURE_KEY } from './auth.reducer';

const getAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const getIsAuthenticatedSelector = createSelector(
  getAuthState,
  (state) => {
    return state.user ? true : false;
  }
);

export const getAuthTokenSelector = createSelector(getAuthState, (state) => {
  return state.user ? state.user.userToken : null;
});
