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
    const rand = () => Math.random().toString(36).substr(2);
    const token = () => rand() + rand();
    this.setToken(token());
  }

  logOut() {
    localStorage.removeItem(this.tokenKey);
    google.accounts.id.disableAutoSelect();
  }
}
