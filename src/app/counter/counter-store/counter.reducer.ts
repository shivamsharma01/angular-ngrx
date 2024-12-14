import { createFeature, createReducer, on } from '@ngrx/store';
import {
  channelName,
  customIncrement,
  decrement,
  increment,
  reset,
} from './counter.action';
import { CounterState, initialState } from './counter.state';

export const COUNTER_FEATURE_KEY = 'counter';

export interface CounterSlice {
  [COUNTER_FEATURE_KEY]: CounterState;
}

export const counterFeature = createFeature({
  name: COUNTER_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(increment, (state) => ({ ...state, counter: state.counter + 1 })),
    on(decrement, (state) => ({ ...state, counter: state.counter - 1 })),
    on(reset, (state) => ({ ...state, counter: 0 })),
    on(customIncrement, (state, action) => ({
      ...state,
      counter: state.counter + action.value,
    })),
    on(channelName, (state) => ({
      ...state,
      channelName: 'updated',
    }))
  ),
});
