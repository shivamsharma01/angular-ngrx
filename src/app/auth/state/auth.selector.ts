import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

const authState = createFeatureSelector<AuthState>('auth');

const loginSelector = createSelector(authState, (state) => {
  return state;
});
