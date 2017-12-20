import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  public getToken(): string {
    return localStorage.getItem('token');
  }

  public storeUser(user): void {
    localStorage.setItem('user', user.nome);
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public removeToken(): void {
    localStorage.removeItem('token');
  }

  public authenticated() {
    return localStorage.getItem('token') ? true : false;
  }
}
