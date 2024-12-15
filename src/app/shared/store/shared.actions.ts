import { createAction, props } from '@ngrx/store';

export const setShowLoadingAction = createAction(
  '[Shared state] set show loading spinner',
  props<{ status: boolean }>()
);

export const setShowErrorMessageAction = createAction(
  '[Shared state] set show error message',
  props<{ message: string }>()
);
