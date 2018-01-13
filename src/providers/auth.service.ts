import { Injectable } from '@angular/core';
import { tokenNotExpired  } from 'angular2-jwt';

import { ApiService } from './api.service';

@Injectable()
export class AuthService extends ApiService {
  protected resourceName: string = '/auth';
  
  public getToken(): string {
    return localStorage.getItem('token');
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public removeToken(): void {
    localStorage.removeItem('token');
  }

  public authenticated():boolean {
    return tokenNotExpired();
  }

  public login(params) {
    return this.http.post(this.apiRoot + this.resourceName, params).map(data => this.setToken(data['token']));
  }
}
