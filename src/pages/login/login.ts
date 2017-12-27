import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastController, LoadingController, IonicPage, NavController } from 'ionic-angular';

import { LoginService } from './login.service';
import { AuthService } from '../../providers/auth.service';

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
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
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
      },
      err => {
        console.log(err);
        this.loading.dismiss();
        this.toast.present();
      }
    );
  }

}
