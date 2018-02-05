import { Component } from '@angular/core';
import { CacheService } from 'ionic-cache';
import { Platform, App } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { initializeApp } from 'firebase';
import { FIREBASE_CONFIG, environment } from '../environments/environment';

import { AuthService } from '../providers/auth.service';
import { OneSignal } from '@ionic-native/onesignal';
import { AlunoService } from '../providers/aluno.service';
import { NotificacaoService } from '../providers/notificacao.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public rootPage = (this.auth.authenticated()) ? 'home' : 'login';
  constructor(
    private auth: AuthService,
    private cache: CacheService,
    private oneSignal: OneSignal,
    private alunoService: AlunoService,
    private notificacaoService: NotificacaoService,
    private app: App,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      
      
      this.initializeCache();
      this.initializeOneSignal();
      this.initializeFirebase();
    });
  }

  private initializeFirebase() {
    initializeApp(FIREBASE_CONFIG);
  }

  private initializeCache() {
    this.cache.setDefaultTTL(60 * 60 * 24 * 30 * 3);
    this.cache.setOfflineInvalidate(false);
  }

  private initializeOneSignal() {
    this.oneSignal.startInit(environment.onesignalId, environment.googleProjectNumber);

    this.oneSignal.handleNotificationOpened().subscribe((notification) => {
      let id = notification.notification.payload.additionalData.id;
      let notifications = this.alunoService.notifications;
      
      if (!!notifications) {
        let notificationExists = notifications.some((n) => n.id == id);
        if (!notificationExists) {
          this.addNotificationToPanel(id);
        }
      } else {
        this.showAll();
      }
    });
    
    this.oneSignal.endInit();
  }

  private addNotificationToPanel(id: number) {
    this.notificacaoService.get({ id: id }).subscribe(
      notificacao => {
        this.alunoService.notifications.unshift(notificacao);
        ++this.alunoService.notiNewsNumber;
      },
      err => console.log(err),
      () =>  this.showAll()
    );
   }

   private showAll() {
    this.app.getRootNavs()[0].push('notifications');
   }
}

