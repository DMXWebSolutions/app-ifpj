import { Injectable, Injector } from '@angular/core';
import { Events }               from 'ionic-angular';
import { tokenNotExpired  }     from 'angular2-jwt';
import { OneSignal }            from '@ionic-native/onesignal';
import { Observable }           from 'rxjs/Observable';
import                               'rxjs/add/observable/of';

import { ApiService }           from './api.service';
import { DeviceService }        from './device.service';

@Injectable()
export class AuthService extends ApiService {
  protected resourceName: string = '/auth';
  private   userType: string;
  
  constructor(
    protected injector: Injector,
    private oneSignal: OneSignal,
    private deviceService: DeviceService,
    private events: Events
  ) {
    super(injector);

    this.events.subscribe('login', (user, userType) => {
      this.userType = userType;
      this.events.publish(`${userType}:login`, user);
    });
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

  public login(userType: string, params: any): Observable<any> {
    return this.http.post(`${this.apiRoot}${this.resourceName}/${userType}`, params)
      .map(
        data => {
          this.setToken(data['token']);
          return data['user'];
        }
      );
  }

  public logout(): Observable<any> {
    this.removeToken();

    switch (this.userType) {
      case 'aluno':
        return this.updateOneSignalStatus()
      case 'professor': 
        return Observable.of(true);
    }
      
  }

  private updateOneSignalStatus(): Observable<any> {
    return Observable.fromPromise(this.oneSignal.getIds())
      .flatMap(oneSignal => {
        return this.deviceService.update({
          'onesignal_id': oneSignal.userId,
          'active': false
        });
      })
  }

  public me(): any {
    return this.http.get(`${this.apiRoot}/me`);
  }

  public getUserType(): string {
    return this.userType;
  }
}
