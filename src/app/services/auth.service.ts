import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  delay,
  exhaustMap,
  mergeMap,
  Observable,
  of,
  throwError,
  timer,
} from 'rxjs';
import { AuthResponseData } from '../models/auth-response-data.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Object> {
    // mocking a backend
    let message = '';
    const EMAIL = 'shivam@gmail.com';
    const PASSWORD = '123456';
    if (email === EMAIL && password === PASSWORD) {
      return of({
        type: 'success',
        displayName: '',
        email,
        expiresIn: '3600',
        idToken:
          'eyyUIhIUasdGUYBUGIdGBFBYadBYSGFGBFIUcxvHAJFDBHDFGFDweSYHSDGFIUSqeGDIUvzxFGSvIUDHFGKHSDFVuhghjdgfbhsjfvKUYKgUYgUGUgUiuIUyuIuyIyIiyUyIUyIUYIUyIUgGUGY',
        kind: 'identitytoolkit#VerifyPasswordResponse',
        localId: 'P50Md09znb2kf8sw0Wnc',
        refreshToken:
          'AOzxcmnbui_cHwkjeruvisyvbxcvnbwerwuhsvjbvnxxUYhjvbNFDIUfbmniuhBmnGTUSDFviuHFDJvUEYDJ',
        registered: true,
      }).pipe(delay(1000));
    } else if (email !== EMAIL) {
      message = 'EMAIL_NOT_FOUND';
    } else if (password !== PASSWORD) {
      message = 'INVALID_PASSWORD';
    }
    const error = throwError(() => {
      return {
        type: 'error',
        error: {
          code: 400,
          message,
        },
      };
    });
    return timer(1000).pipe(exhaustMap(() => error));
  }

  formatUser(data: AuthResponseData): User {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    return new User(data.email, data.idToken, data.localId, expirationDate);
  }

  getErrorMsg(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email not found';
      case 'INVALID_PASSWORD':
        return 'Invalid Password';
      default:
        return 'An error Occured. Please try again.';
    }
  }
}
