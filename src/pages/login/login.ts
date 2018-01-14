import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastController, LoadingController, IonicPage, NavController } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';

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
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  public showPassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  public login(params) {
    this.loading = this.loadingCtrl.create({
      content: 'Entrando...',
      dismissOnPageChange: true
    });

    this.loading.present();
    this.authService.login(params).subscribe(
      () => {
        this.navCtrl.setRoot('home');
        this.storeOneSignalId();
      },
      err => {
        this.loading.dismiss();
        this.toast = this.toastCtrl.create({
          message: 'Usuário ou senha incorretos.',
          dismissOnPageChange: true,
          showCloseButton: true,
          closeButtonText: 'Ok',
          cssClass: 'warning',
          duration: 10000,
        });
        this.toast.present();
      }
    );
  }

  private storeOneSignalId() {
    this.oneSignal.getIds().then(
      onesignal => {
        this.deviceService.add({
          'onesignal_id': onesignal.userId,
          'active': true
        }).subscribe(
          data => true,
          err => alert('Erro: ' + err.status),
          () => true
        )
      }
    );
  }

}
