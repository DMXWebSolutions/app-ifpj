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
  ) {}

  public showPassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  private showToast() {
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

  private showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Entrando...',
      dismissOnPageChange: true
    });

    this.loading.present();
  }

  public login(params) {
    this.showLoading();
    this.loginService.login(params).subscribe(
      data => {
        this.authService.setToken(data['token']);
        this.navCtrl.setRoot('home');
      },
      err => {
        console.log(err);
        this.loading.dismiss();
        this.showToast();
      }
    );
  }

}