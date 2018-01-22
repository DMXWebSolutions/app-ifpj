import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { AlunoService } from '../../providers/aluno.service';

@IonicPage({
  name: 'comunicados',
  segment: 'comunicados'
})
@Component({
  selector: 'page-comunicados',
  templateUrl: 'comunicados.html',
})
export class ComunicadosPage {
  public comunicados: any;
  public page: number = 1;
  public end: boolean = false;

  constructor(
    private alunoService: AlunoService,
    private loadingCtrl: LoadingController,
    private nav: NavController
  ) {
    this.getComunicados();
  }

  private getComunicados() {
    let loading = this.loadingCtrl.create({
      content: 'Carregando comunicados...'
    });

    loading.present();

    this.alunoService.getNotificacoes({
      page: this.page,
      tipo: 'comunicado'
    }).subscribe(
      comunicados => this.comunicados = comunicados.data,
      err => alert('Erro: ' + err.status),
      () => loading.dismiss()
    );
   }

   public showDetails(notificacao) {
    notificacao.lida = true;

    this.nav.push('notification-detail', {
      id: notificacao.id
    });
 }

 public loadMore() {
   this.page += 1;
   return this.alunoService.getNotificacoes({
      page: this.page,
      tipo: 'comunicado'
    }).flatMap(
      notificacoes => {
        for(let n of notificacoes.data) {
          this.comunicados.push(n);
        }
        if(notificacoes.current_page === notificacoes.last_page) {
          this.end = true;
        }
        return Observable.of(notificacoes.data);
      }
    ).toPromise();
 }

}
