import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthSlice } from '../auth/state/auth.reducer';
import { Store } from '@ngrx/store';
import { exhaustMap, Observable, take } from 'rxjs';
import { getAuthTokenSelector } from '../auth/state/auth.selector';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private store: Store<AuthSlice>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(getAuthTokenSelector).pipe(
      take(1),
      exhaustMap((token) => {
        if (token) {
          req = req.clone({
            params: req.params.append('auth', token),
          });
        }
        return next.handle(req);
      })
    );
  }
}
