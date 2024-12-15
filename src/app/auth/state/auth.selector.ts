import { createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.state';
import { AUTH_FEATURE_KEY } from './auth.reducer';

const authState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

// const loginSelector = createSelector(authState, (state) => {
//   return state;
// });
