import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOGIN_START_ACTION, LOGIN_SUCCESS_ACTION } from './auth.actions';
import { exhaustMap, map } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AuthResponseData } from '../../models/auth-response-data.model';
import { SharedState } from '../../shared/store/shared.state';
import { Store } from '@ngrx/store';
import { SHOW_LOADING_ACTION } from '../../shared/store/shared.actions';

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  authService = inject(AuthService);
  store = inject(Store<SharedState>);

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LOGIN_START_ACTION),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            const user = this.authService.formatUser(data as AuthResponseData);
            this.store.dispatch(SHOW_LOADING_ACTION({ status: false }));
            return LOGIN_SUCCESS_ACTION({ user });
          })
        );
      })
    );
  });
}
