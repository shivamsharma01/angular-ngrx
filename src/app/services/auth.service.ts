import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { AuthResponseData } from '../models/auth-response-data.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Object> {
    // mocking a backend
    if (email === 'shivam@gmail.com' && password === '123456') {
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
    } else {
      return of({
        type: 'error',
        error: {
          code: 400,
          message: 'EMAIL_NOT_FOUND',
        },
      }).pipe(delay(1000));
    }
  }

  formatUser(data: AuthResponseData): User {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    return new User(data.email, data.idToken, data.localId, expirationDate);
  }
}
