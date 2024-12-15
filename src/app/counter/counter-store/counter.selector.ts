import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './counter.state';
import { COUNTER_FEATURE_KEY } from './counter.reducer';

const getCounterState =
  createFeatureSelector<CounterState>(COUNTER_FEATURE_KEY);

export const getCounterSelector = createSelector(getCounterState, (state) => {
  return state.counter;
});

export const getChannelNameSelector = createSelector(
  getCounterState,
  (state) => {
    return state.channelName;
  }
);
