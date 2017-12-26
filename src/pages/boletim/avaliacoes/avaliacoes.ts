import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

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
  private loading: any;
  public avaliacoes: any;
  public mapavaliacoes: any;

  constructor(
    private navCtrl: NavController,
    private params: NavParams,
    private loadingCtrl: LoadingController,
    private alunoService: AlunoService
  ) { 
    this.mapavaliacoes = {
      '01': '1º Trimestre',
      '02': '2º Trimestre',
      '03': '3º Trimestre',
      '10': 'Recuperação I',
      '11': 'Recuperação II',
    };
  }

  ionViewDidLoad(): void {
    this.showLoading();

    let params = {
      coddisc: this.params.get('coddisc')
    }

    this.alunoService.getAvaliacoes(params).subscribe(
      avaliacoes =>this.avaliacoes = avaliacoes,
      err => console.log(err),
      () => this.loading.dismiss()
    );
  }

  private showLoading(): void {
    this.loading = this.loadingCtrl.create({
      content: 'Carregando...',
      dismissOnPageChange: true
    });

    this.loading.present();
  }

  public go2Notas(codverifi): void {
    this.navCtrl.push('notas', {
      coddisc: this.params.get('coddisc'),
      codverifi: codverifi
    });
  }
}