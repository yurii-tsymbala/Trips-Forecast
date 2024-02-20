declare var google: any;

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'token';

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, JSON.stringify(token));
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logIn(email: string): void {
    this.setToken(email);
  }

  logOut() {
    localStorage.removeItem(this.tokenKey);
    google.accounts.id.disableAutoSelect();
  }
}
