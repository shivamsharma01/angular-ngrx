import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './counter.state';
import { COUNTER_FEATURE_KEY } from './counter.reducer';

const counterState = createFeatureSelector<CounterState>(COUNTER_FEATURE_KEY);

export const counterSelector = createSelector(counterState, (state) => {
  return state.counter;
});

export const channelNameSelector = createSelector(counterState, (state) => {
  return state.channelName;
});
