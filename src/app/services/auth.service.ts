import { Injectable } from '@angular/core';
import { delay, exhaustMap, Observable, of, throwError, timer } from 'rxjs';
import { AuthResponseData } from '../models/auth-response-data.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  USED_EMAILS: string[] = ['john@gmail.com', 'shivam@gmail.com'];
  timeoutInterval: any;

  login(email: string, password: string): Observable<Object> {
    // mocking a backend
    let message = '';
    const PASSWORD = '123456';
    const emailExists: boolean = this.emailExists(email);
    if (emailExists && password === PASSWORD) {
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
    } else if (!emailExists) {
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

  emailExists(email: string): boolean {
    for (let i = 0; i < this.USED_EMAILS.length; i++) {
      if (this.USED_EMAILS[i] === email) return true;
    }
    return false;
  }

  signUp(email: string, password: string): Observable<Object> {
    // mocking a backend
    const emailExists: boolean = this.emailExists(email);
    if (emailExists) {
      const error = throwError(() => {
        return {
          type: 'error',
          error: {
            code: 400,
            message: 'EMAIL_ALREADY_IN_USE',
          },
        };
      });
      return timer(1000).pipe(exhaustMap(() => error));
    } else {
      this.USED_EMAILS.push(email);
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
    }
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
        return 'Email not found.';
      case 'INVALID_PASSWORD':
        return 'Invalid Password.';
      case 'EMAIL_ALREADY_IN_USE':
        return 'Email already in use.';
      default:
        return 'An error Occured. Please try again.';
    }
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));
    this.runTimeoutInterval(user);
  }

  runTimeoutInterval(user: User) {
    const currentTime = new Date().getTime();
    const expirationTime = new Date(user.expireDate).getTime();
    const timeInterval = expirationTime - currentTime;
    this.timeoutInterval = setTimeout(() => {}, timeInterval);
  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const user = new User(
        userData.email,
        userData.token,
        userData.localId,
        userData.expirationDate
      );
      this.runTimeoutInterval(user);
      return user;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('userData');
    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }
}
