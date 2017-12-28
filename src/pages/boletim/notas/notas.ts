import { Component } from '@angular/core';
import { IonicPage, NavParams, LoadingController } from 'ionic-angular';

import { AlunoService } from '../../../providers/aluno.service';
import { DisciplinaService } from '../../../providers/disciplina.service';
import { AvaliacaoService } from '../../../providers/avaliacao.service';

@IonicPage({
  name: 'notas',
  segment: 'notas'
})
@Component({
  selector: 'page-notas',
  templateUrl: 'notas.html',
})
export class NotasPage {

  private loading: any;
  public disciplina: any;
  public notas: any;

  constructor(
    private params: NavParams,
    private loadingCtrl: LoadingController,
    private disciplinaService: DisciplinaService,
    private alunoService: AlunoService,
    private avaliacaoService: AvaliacaoService,
  ) {
    this.loading = this.loadingCtrl.create({
      content: 'Carregando notas...',
    });
  }

  ionViewDidLoad() {
    this.loading.present();

    let params = {
      coddisc: this.params.get('coddisc'),
      codverifi: this.params.get('codverifi')
    };

    this.disciplinaService.read(params.coddisc).subscribe(
      disciplina => this.disciplina = disciplina,
      err => console.log(err)
    );

    this.alunoService.getNotas(params).subscribe(
      notas => this.notas = notas,
      err => console.log(err),
      () => this.loading.dismiss()
    );
  }

  public getAvaliacao(): string {
    return this.avaliacaoService.getName(this.params.get('codverifi'));
  }

  public refreshContent(refresher) {
    let params = {
      coddisc: this.params.get('coddisc'),
      codverifi: this.params.get('codverifi')
    };

    this.alunoService.getNotas(params, true).subscribe(
      notas => this.notas = notas,
      err => console.log(err),
      () => refresher.complete()
    );
  }
}
