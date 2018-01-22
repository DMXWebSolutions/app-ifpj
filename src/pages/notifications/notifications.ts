import { Component } from '@angular/core';
import { IonicPage, App, LoadingController } from 'ionic-angular';

import { AlunoService } from '../../providers/aluno.service';
import { Observable } from 'rxjs/Observable';

@IonicPage({
  name: "notifications",
  segment: "notifications"
})
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  public notificacoes: any;
  public page: number = 1;
  public end: boolean = false;

  constructor(
    private alunoService: AlunoService,
    private loadingCtrl: LoadingController,
    private app: App
  ) {
      this.getNotificacoes();
   }

  private getNotificacoes() {
    let loading = this.loadingCtrl.create({
      content: 'Carregando notificações...'
    });

    loading.present();

    this.alunoService.getNotificacoes({
      page: this.page
    }).subscribe(
      notificacoes => this.notificacoes = notificacoes.data,
      err => alert('Erro: ' + err.status),
      () => loading.dismiss()
    );
   }

   public showDetails(notificacao) {
      notificacao.lida = true;

      this.app.getRootNavs()[0].push('notification-detail', {
        id: notificacao.id
      });
   }

   public loadMore() {
     this.page += 1;
     return this.alunoService.getNotificacoes({
        page: this.page
      }).flatMap(
        notificacoes => {
          for(let n of notificacoes.data) {
            this.notificacoes.push(n);
          }
          if(notificacoes.current_page === notificacoes.last_page) {
            this.end = true;
          }
          return Observable.of(notificacoes.data);
        }
      ).toPromise();
   }

}
