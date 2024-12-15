import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from './shared.state';
import { SHARED_LOADING_FEATURE_KEY } from './shared.reducer';

const showLoadingState = createFeatureSelector<SharedState>(
  SHARED_LOADING_FEATURE_KEY
);

export const showLoadingSelector = createSelector(showLoadingState, (state) => {
  return state.showLoading;
});
