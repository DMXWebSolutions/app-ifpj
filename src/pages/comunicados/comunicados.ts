import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'comunicados',
  segment: 'comunicados/:id'
})
@Component({
  selector: 'page-comunicados',
  templateUrl: 'comunicados.html',
})
export class ComunicadosPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComunicadosPage');
  }

}
