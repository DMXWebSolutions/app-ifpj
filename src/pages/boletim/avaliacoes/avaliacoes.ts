import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AlunoService } from '../../../providers/aluno.service';

@IonicPage({
  name: 'avaliacoes',
  segment: 'avaliacoes'
})
@Component({
  selector: 'page-avaliacoes',
  templateUrl: 'avaliacoes.html',
})
export class AvaliacoesPage {
  public avaliacoes: any;

  constructor(
    private navCtrl: NavController,
    private params: NavParams,
    private alunoService: AlunoService
  ) { }

  ionViewDidEnter(): void {
    let params = {
      coddisc: this.params.get('coddisc')
    }

    this.alunoService.getAvaliacoes(params).subscribe(
      avaliacoes => console.log(avaliacoes),
      err => console.log(err)
    );
  }

  public go2Notas(): void {
    this.navCtrl.push('notas');
  }
}
