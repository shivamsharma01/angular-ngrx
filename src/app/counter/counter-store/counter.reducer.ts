import { createFeature, createReducer, on } from '@ngrx/store';
import {
  setChannelNameAction,
  setCustomIncrementAction,
  setDecrementAction,
  setIncrementAction,
  setResetAction,
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
    on(setIncrementAction, (state) => ({ ...state, counter: state.counter + 1 })),
    on(setDecrementAction, (state) => ({ ...state, counter: state.counter - 1 })),
    on(setResetAction, (state) => ({ ...state, counter: 0 })),
    on(setCustomIncrementAction, (state, action) => ({
      ...state,
      counter: state.counter + action.value,
    })),
    on(setChannelNameAction, (state) => ({
      ...state,
      channelName: 'updated',
    }))
  ),
});
