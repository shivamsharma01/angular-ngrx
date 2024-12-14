import { createFeature, createReducer, on } from '@ngrx/store';
import {
  CHANNEL_NAME_ACTION,
  CUSTOM_INCREMENT_ACTION,
  DECREMENT_ACTION,
  INCREMENT_ACTION,
  RESET_ACTION,
} from './counter.actions';
import { CounterState, initialState } from './counter.state';

export const COUNTER_FEATURE_KEY = 'counter';

export interface CounterSlice {
  [COUNTER_FEATURE_KEY]: CounterState;
}

export const counterFeature = createFeature({
  name: COUNTER_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(INCREMENT_ACTION, (state) => ({ ...state, counter: state.counter + 1 })),
    on(DECREMENT_ACTION, (state) => ({ ...state, counter: state.counter - 1 })),
    on(RESET_ACTION, (state) => ({ ...state, counter: 0 })),
    on(CUSTOM_INCREMENT_ACTION, (state, action) => ({
      ...state,
      counter: state.counter + action.value,
    })),
    on(CHANNEL_NAME_ACTION, (state) => ({
      ...state,
      channelName: 'updated',
    }))
  ),
});
