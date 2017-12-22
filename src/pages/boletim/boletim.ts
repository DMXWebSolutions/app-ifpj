import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { AvaliacoesPage } from './avaliacoes/avaliacoes';
import { AlunoService } from '../../providers/aluno.service';

@IonicPage({
  name: 'boletim',
  segment: 'boletim'
})
@Component({
  selector: 'page-boletim',
  templateUrl: 'boletim.html',
})
export class BoletimPage {
  public disciplinas: any;

  constructor(
    private navCtrl: NavController,
    private alunoService: AlunoService
  ) {}

  public go2Avaliacoes(coddisc: string) {
    this.navCtrl.push('avaliacoes', {
      coddisc: coddisc
    });
  }

  ionViewDidEnter() {
    this.alunoService.getDisciplinas().subscribe(
      disciplinas => this.disciplinas = disciplinas
    );
  }

}
