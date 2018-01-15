import { Injectable, Injector } from '@angular/core';
import { tokenNotExpired  } from 'angular2-jwt';
import { OneSignal } from '@ionic-native/onesignal';

import { ApiService } from './api.service';
import { DeviceService } from './device.service';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Injectable()
export class AuthService extends ApiService {
  protected resourceName: string = '/auth';
  
  constructor(
    protected injector: Injector,
    private oneSignal: OneSignal,
    private deviceService: DeviceService
  ) {
    super(injector)
  }

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

  public logout(): Observable<any> {
    return Observable.fromPromise(this.oneSignal.getIds())
      .flatMap(oneSignal => {
        return this.deviceService.update({
          'onesignal_id': oneSignal.userId,
          'active': false
        });
      })
      .map(data => {
        this.removeToken();
        return data;
      });
  }

  public me(): any {
    return this.http.get(`${this.apiRoot}/me`);
  }
}
