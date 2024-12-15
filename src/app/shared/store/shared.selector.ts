import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from './shared.state';
import { SHARED_LOADING_FEATURE_KEY } from './shared.reducer';

const getSharedState = createFeatureSelector<SharedState>(
  SHARED_LOADING_FEATURE_KEY
);

export const getLoadingSelector = createSelector(getSharedState, (state) => {
  return state.showLoading;
});

export const getErrorMessageSelector = createSelector(
  getSharedState,
  (state) => {
    return state.errorMessage;
  }
);
