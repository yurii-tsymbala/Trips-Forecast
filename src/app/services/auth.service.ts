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

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logIn(email: string): void {
    this.setToken(email);
  }

  logOut(): void {
    localStorage.removeItem(this.tokenKey);
    google.accounts.id.disableAutoSelect();
  }
}
