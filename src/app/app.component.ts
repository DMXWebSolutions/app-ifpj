import { Component }     from '@angular/core';
import { CacheService }  from 'ionic-cache';
import { Platform, App } from 'ionic-angular';
import { SplashScreen }  from '@ionic-native/splash-screen';
import { StatusBar }     from '@ionic-native/status-bar';
import { initializeApp } from 'firebase';
import {
  FIREBASE_CONFIG,
  environment
}                         from '../environments/environment';

import { AuthService }        from '../providers/auth.service';
import { OneSignal }          from '@ionic-native/onesignal';
import { AlunoService }       from '../providers/aluno.service';
import { NotificacaoService } from '../providers/notificacao.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public rootPage;

  constructor(
    private auth: AuthService,
    private cache: CacheService,
    private oneSignal: OneSignal,
    private alunoService: AlunoService,
    private notificacaoService: NotificacaoService,
    private app: App,
    private splashScreen: SplashScreen,
    platform: Platform,
    statusBar: StatusBar,
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      
      this.setRootPage();
      this.initializeCache();
      this.initializeOneSignal();
      this.initializeFirebase();
    });
  }

  private setRootPage() {
    if (this.auth.authenticated()) {
      this.auth.me().subscribe(
        usuario => {
          this.rootPage = 'home';
          this.splashScreen.hide();
        },
        err => console.log('Erro ao obter os dados do usuário: ' + err.status)
      );
    } else {
      this.rootPage = 'login';
      this.splashScreen.hide();
    }
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

