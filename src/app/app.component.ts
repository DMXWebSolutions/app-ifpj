import { Component } from '@angular/core';
import { CacheService } from 'ionic-cache';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { initializeApp } from 'firebase';
import { FIREBASE_CONFIG } from './firebase.config';

import { AuthService } from '../providers/auth.service';
import { OneSignal } from '@ionic-native/onesignal';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public rootPage = (this.auth.authenticated()) ? 'home' : 'login';
  constructor(
    private auth: AuthService,
    private cache: CacheService,
    private oneSignal: OneSignal,
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
    this.oneSignal.startInit('17d64313-0cfe-4add-a369-42445e21368c', '1031988098562');
    
    this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
    });

    this.oneSignal.endInit();
  }
}

