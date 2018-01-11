import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastController, LoadingController, IonicPage, NavController } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';

import { LoginService } from './login.service';
import { AuthService } from '../../providers/auth.service';
import { DeviceService } from '../../providers/device.service';

@IonicPage({
  name: 'login',
  segment: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private passwordVisible: boolean = false;
  private loading;
  private toast;

  loginForm = new FormGroup({
    codalun: new FormControl(),
    Cpfresp: new FormControl(),
  });

  constructor(
    private oneSignal: OneSignal,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private deviceService: DeviceService,
    private loginService: LoginService,
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    this.toast = this.toastCtrl.create({
      message: 'Usuário ou senha incorretos.',
      dismissOnPageChange: true,
      showCloseButton: true,
      closeButtonText: 'Ok',
      cssClass: 'warning',
      duration: 10000,
    });

    this.loading = this.loadingCtrl.create({
      content: 'Entrando...',
      dismissOnPageChange: true
    });
  }

  public showPassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  public login(params) {
    this.loading.present();
    this.loginService.login(params).subscribe(
      data => {
        this.authService.setToken(data['token']);
        this.navCtrl.setRoot('home');
        this.initializeOneSignal();
      },
      err => {
        console.log(err);
        this.loading.dismiss();
        this.toast.present();
      }
    );
  }

  private initializeOneSignal() {
    this.oneSignal.startInit('17d64313-0cfe-4add-a369-42445e21368c', '1031988098562');
    
    this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
    });

    this.oneSignal.getIds().then(
      onesignal => {
        this.deviceService.add({
          'onesignal_id': onesignal.userId,
          'aluno_id': '150192',
          'active': true
        }).subscribe(
          data => alert(data),
          err => alert(err.status + err.error),
          () => alert('complete')
        );
      }
    );

    this.oneSignal.endInit();
  }

}
