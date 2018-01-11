import { Component } from '@angular/core';
import { CacheService } from 'ionic-cache';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  constructor(
    private cache: CacheService,
  ) {
    this.initializeCache();
  }

  private initializeCache() {
    this.cache.setDefaultTTL(60 * 60 * 24 * 30 * 3);
    this.cache.setOfflineInvalidate(false);
  }
}

