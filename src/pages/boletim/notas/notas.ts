import { Component } from '@angular/core';
import { IonicPage, NavParams, LoadingController } from 'ionic-angular';

import { AlunoService } from '../../../providers/aluno.service';

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
  public notas: any;

  constructor(
    private params: NavParams,
    private loadingCtrl: LoadingController,
    private alunoService: AlunoService
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

    this.alunoService.getNotas(params).subscribe(
      notas => this.notas = notas,
      err => console.log(err),
      () => this.loading.dismiss()
    );
  }
}
