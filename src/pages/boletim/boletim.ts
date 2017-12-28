import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { AlunoService } from '../../providers/aluno.service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@IonicPage({
  name: 'boletim',
  segment: 'boletim'
})
@Component({
  selector: 'page-boletim',
  templateUrl: 'boletim.html',
})
export class BoletimPage {
  private loading;
  public disciplinas: any;

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alunoService: AlunoService
  ) {
    this.loading = this.loadingCtrl.create({
      content: 'Carregando disciplinas...'
    });
  }

  ionViewDidLoad() {
    this.loading.present();

    this.alunoService.getDisciplinas().subscribe(
      disciplinas => this.disciplinas = disciplinas,
      err => console.log(err),
      () => this.loading.dismiss()
    );
  }

  public refreshContent(refresher) {
    this.alunoService.getDisciplinas({}, true).subscribe(
      disciplinas => this.disciplinas = disciplinas,
      err => console.log(err),
      () => refresher.complete()
    );
  }

  public go2Avaliacoes(coddisc: string) {
    this.navCtrl.push('avaliacoes', {
      coddisc: coddisc
    });
  }

}
