import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { AlunoService } from '../../../providers/aluno.service';
import { AvaliacaoService } from '../../../providers/avaliacao.service';

@IonicPage({
  name: 'avaliacoes',
  segment: 'avaliacoes'
})
@Component({
  selector: 'page-avaliacoes',
  templateUrl: 'avaliacoes.html',
})
export class AvaliacoesPage {
  private loading: any;
  public avaliacoes: any;
  public mapavaliacoes: any;

  constructor(
    private navCtrl: NavController,
    private params: NavParams,
    private loadingCtrl: LoadingController,
    private alunoService: AlunoService,
    private avaliacaoService: AvaliacaoService
  ) { 
    this.loading = this.loadingCtrl.create({
      content: 'Carregando...',
    });
  }

  ionViewDidLoad(): void {
    this.loading.present();

    let params = {
      coddisc: this.params.get('coddisc')
    }

    this.alunoService.getAvaliacoes(params).subscribe(
      avaliacoes =>this.avaliacoes = avaliacoes,
      err => console.log(err),
      () => this.loading.dismiss()
    );
  }

  public go2Notas(codverifi): void {
    this.navCtrl.push('notas', {
      coddisc: this.params.get('coddisc'),
      codverifi: codverifi
    });
  }

  public getName(codverifi: string) {
    return this.avaliacaoService.getName(codverifi);
  }
}
