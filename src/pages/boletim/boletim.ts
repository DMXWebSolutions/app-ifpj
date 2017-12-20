import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { AvaliacoesPage } from './avaliacoes/avaliacoes';

@IonicPage({
  name: 'boletim',
  segment: 'boletim'
})
@Component({
  selector: 'page-boletim',
  templateUrl: 'boletim.html',
})
export class BoletimPage {

  constructor(private navCtrl: NavController) { }

  public go2Avaliacoes() {
    this.navCtrl.push('avaliacoes');
  }

}
