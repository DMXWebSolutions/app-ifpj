import {
  Events,
  NavController,
  MenuController,
  ToastController,
  LoadingController,
}                            from 'ionic-angular';
import { Component, Input }  from '@angular/core';
import { FormGroup }         from '@angular/forms';
import { OneSignal }         from '@ionic-native/onesignal';
import { CacheService }      from 'ionic-cache';

import { AuthService }       from '../../providers/auth.service';
import { DeviceService }     from '../../providers/device.service';

@Component({
  selector: 'login-form',
  templateUrl: 'login-form.html'
})
export class LoginFormComponent {
  @Input('userType') userType:  string;
  @Input('controls') formGroup: FormGroup;
  @Input('fields')   fields:    Array<{
      placeholder: string,
      controlName: string,
      type: string,
      icon: string
    }>;

  public passwordVisible: boolean = false;
  public loading: any;

  constructor(
    private events: Events,
    private nav: NavController,
    private menu: MenuController,
    private cache: CacheService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private oneSignal: OneSignal,
    private deviceService: DeviceService,
    private auth: AuthService
  ) {}

  public showPassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  public login(params: any) {
    this.cache.clearAll();

    this.loading = this.loadingCtrl.create({
      content: 'Entrando...',
      dismissOnPageChange: true
    });
    this.loading.present();

    this.auth.login(this.userType, params).subscribe(
      user => this.successLoginCallBack(user),
      err => this.errorLoginCallback(),
    );
  }

  private successLoginCallBack(user: any) {
    this.events.publish('login', user, this.userType);
    this.nav.setRoot('home');
    this.menu.enable(true, 'main-navigation');
    this.menu.enable(true, 'notifications');

    if (this.auth.getUserType() == 'aluno') {
      this.storeOneSignalId();
    }
  }

  private errorLoginCallback() {
    this.loading.dismiss();
    let toast = this.toastCtrl.create({
      message: 'Usuário ou senha incorretos.',
      dismissOnPageChange: true,
      showCloseButton: true,
      closeButtonText: 'Ok',
      cssClass: 'warning',
      duration: 10000,
    });
    toast.present();
  }

  private storeOneSignalId() {
    this.oneSignal.getIds().then(
      onesignal => {
        this.deviceService.add({
          'onesignal_id': onesignal.userId,
          'active': true
        }).subscribe(
          data => true,
          err => alert('Erro ao armazena o id do dispositivo: ' + err.status),
          () => true
        )
      }
    );
  }
}
