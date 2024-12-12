import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './counter.state';

const counterState = createFeatureSelector<CounterState>('counter');

export const counter = createSelector(counterState, (state) => {
  return state.counter;
});

export const channelName = createSelector(counterState, (state) => {
  return state.channelName;
});
