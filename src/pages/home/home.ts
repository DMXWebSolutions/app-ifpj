import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage({
  name: 'home',
  segment: 'home'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(private navCtrl: NavController) { }

  public openPage(pageName) {
    this.navCtrl.setRoot(pageName, {}, {
      animate: true,
      animation: 'md-transition',
      direction: 'forward',
      duration: 500,
      easing: 'linear'
    });
  }
}
