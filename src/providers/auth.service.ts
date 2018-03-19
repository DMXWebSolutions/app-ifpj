import { Injectable, Injector } from '@angular/core';
import { OneSignal }            from '@ionic-native/onesignal';
import { Events }               from 'ionic-angular';
import { JwtHelperService }     from '@auth0/angular-jwt';
import { Observable }           from 'rxjs/Observable';
import                               'rxjs/add/observable/of';

import { ApiService }           from './api.service';
import { DeviceService }        from './device.service';
import { Usuario }              from '../models/usuario.model';

@Injectable()
export class AuthService extends ApiService {
  protected resourceName: string = '/auth';
  private   user: Usuario;
  
  constructor(
    protected injector: Injector,
    private oneSignal: OneSignal,
    private deviceService: DeviceService,
    private events: Events,
    private jwt: JwtHelperService
  ) {
    super(injector);

    this.initializeService();
  }

  private initializeService() {
    this.user = this.getUserDefaultValues();

    if (this.authenticated()) {
      this.me().subscribe(
        user => {
          this.user = user;
          this.events.publish('login', user)
        },
        err => console.log('Erro ao obter os dados do usuário logado: ' + err.status)
      );
    }

    this.events.subscribe('login', (user) => {
      this.user = user;
    });
  }

  private getUserDefaultValues() {
    return {
      id:      null,
      nome:    null,
      usuario: null,
      tipo:    null
    };
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
    return !this.jwt.isTokenExpired();
  }

  public login(params: any): Observable<any> {
    return this.http.post(`${this.apiRoot}${this.resourceName}`, params)
      .map(
        data => {
          this.setToken(data['token']);
          return data['user'];
        }
      );
  }

  public logout(): Observable<any> {   
    var result: Observable<any>;

    switch (this.user.tipo) {
      case 'aluno':
        result = this.updateOneSignalStatus();
        break;
      case 'professor': 
        result = Observable.of(true);
        break;
    }

    this.user = this.getUserDefaultValues();
    return result;
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

  public me(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiRoot}${this.resourceName}/me`);
  }

  public getUserType(): string {
    return (this.authenticated()) ? this.user.tipo : null;
  }
}
