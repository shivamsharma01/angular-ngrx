import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  setAutoLoginAction,
  setLoginStartAction,
  setLoginSuccessAction,
  setLogoutAction,
  setSignUpStartAction,
  setSignUpSuccessAction,
} from './auth.actions';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AuthResponseData } from '../../models/auth-response-data.model';
import { SharedState } from '../../shared/store/shared.state';
import { Store } from '@ngrx/store';
import {
  setShowErrorMessageAction,
  setShowLoadingAction,
} from '../../shared/store/shared.actions';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

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
            this.authService.setUserInLocalStorage(user);
            return setLoginSuccessAction({ user, redirect: true });
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

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setSignUpStartAction),
      exhaustMap((action) => {
        return this.authService.signUp(action.email, action.password).pipe(
          map((data) => {
            const user = this.authService.formatUser(data as AuthResponseData);
            this.store.dispatch(setShowLoadingAction({ status: false }));
            this.store.dispatch(setShowErrorMessageAction({ message: '' }));
            this.authService.setUserInLocalStorage(user);
            return setSignUpSuccessAction({ user, redirect: true });
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
        ofType(setLoginSuccessAction, setSignUpSuccessAction),
        tap((action) => {
          if (action.redirect) {
            this.router.navigate(['']);
          }
        })
      );
    },
    { dispatch: false }
  );

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setAutoLoginAction),
      exhaustMap((action) => {
        const user = this.authService.getUserFromLocalStorage() as User;
        return of(setLoginSuccessAction({ user, redirect: false }));
      })
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(setLogoutAction),
        map((action) => {
          this.authService.logout();
          this.router.navigate(['/auth']);
        })
      );
    },
    { dispatch: false }
  );
}
