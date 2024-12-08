import { Action, createReducer, on } from '@ngrx/store';
import {
  channelName,
  customIncrement,
  decrement,
  increment,
  reset,
} from './counter.action';
import { CounterState, initialState } from './counter.state';

const _counterReducer = createReducer(
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
);

export function counterReducer(
  state: CounterState | undefined,
  action: Action
) {
  return _counterReducer(state, action);
}
