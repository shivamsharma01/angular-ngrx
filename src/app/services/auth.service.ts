import { Injectable } from '@angular/core';
import { delay, exhaustMap, Observable, of, throwError, timer } from 'rxjs';
import { AuthResponseData } from '../models/auth-response-data.model';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  USED_EMAILS: string[] = ['john@gmail.com', 'shivam@gmail.com'];
  timeoutInterval: any;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Object> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIRBASE_API_KEY}`,
      { email, password, returnSecureToken: true }
    );
  }

  emailExists(email: string): boolean {
    for (let i = 0; i < this.USED_EMAILS.length; i++) {
      if (this.USED_EMAILS[i] === email) return true;
    }
    return false;
  }

  signUp(email: string, password: string): Observable<Object> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIRBASE_API_KEY}`,
      { email, password, returnSecureToken: true }
    );
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
      case 'EMAIL_EXISTS':
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
