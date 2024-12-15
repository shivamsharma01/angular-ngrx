import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { setLoginStartAction, setLoginSuccessAction } from './auth.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AuthResponseData } from '../../models/auth-response-data.model';
import { SharedState } from '../../shared/store/shared.state';
import { Store } from '@ngrx/store';
import {
  setShowErrorMessageAction,
  setShowLoadingAction,
} from '../../shared/store/shared.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  authService = inject(AuthService);
  store = inject(Store<SharedState>);
  router = inject(Router);

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setLoginStartAction),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            const user = this.authService.formatUser(data as AuthResponseData);
            this.store.dispatch(setShowLoadingAction({ status: false }));
            this.store.dispatch(setShowErrorMessageAction({ message: '' }));
            return setLoginSuccessAction({ user });
          }),
          catchError((error) => {
            this.store.dispatch(setShowLoadingAction({ status: false }));
            const errorMsg = this.authService.getErrorMsg(error.error.message);
            return of(setShowErrorMessageAction({ message: errorMsg }));
          })
        );
      })
    );
  });

  redirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(setLoginSuccessAction),
        tap(() => {
          this.router.navigate(['']);
        })
      );
    },
    { dispatch: false }
  );
}
