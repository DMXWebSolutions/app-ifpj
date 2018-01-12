import { Component } from '@angular/core';
import { CacheService } from 'ionic-cache';

import { AuthService } from '../providers/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public rootPage = (this.auth.authenticated()) ? 'home' : 'login';
  constructor(
    private auth: AuthService,
    private cache: CacheService,
  ) {
    this.initializeCache();
  }

  private initializeCache() {
    this.cache.setDefaultTTL(60 * 60 * 24 * 30 * 3);
    this.cache.setOfflineInvalidate(false);
  }
}

