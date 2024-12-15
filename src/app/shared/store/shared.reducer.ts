import { createFeature, createReducer, on } from '@ngrx/store';
import { initialState, SharedState } from './shared.state';
import { SHOW_LOADING_ACTION } from './shared.actions';

export const SHARED_LOADING_FEATURE_KEY = 'loading';

export interface SHARED_LOADING_SLICE {
  [SHARED_LOADING_FEATURE_KEY]: SharedState;
}

export const sharedFeature = createFeature({
  name: SHARED_LOADING_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(SHOW_LOADING_ACTION, (state, action) => {
      return {
        ...state,
        showLoading: action.status,
      };
    })
  ),
});
