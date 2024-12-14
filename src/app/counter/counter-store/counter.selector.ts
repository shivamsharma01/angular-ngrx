import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './counter.state';

const counterState = createFeatureSelector<CounterState>('counter');

export const counterSelector = createSelector(counterState, (state) => {
  return state.counter;
});

export const channelNameSelector = createSelector(counterState, (state) => {
  return state.channelName;
});
