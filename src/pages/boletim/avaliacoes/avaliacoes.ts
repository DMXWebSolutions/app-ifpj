import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'avaliacoes',
  segment: 'avaliacoes'
})
@Component({
  selector: 'page-avaliacoes',
  templateUrl: 'avaliacoes.html',
})
export class AvaliacoesPage {
  public id: number;

  constructor(
    private navCtrl: NavController,
    private params: NavParams
  ) {
    
   }

  public go2Notas() {
    this.navCtrl.push('notas');
  }
}
