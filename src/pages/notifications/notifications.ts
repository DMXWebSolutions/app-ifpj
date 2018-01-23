import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Events } from 'ionic-angular';

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
  constructor(
    private alunoService: AlunoService,
    private loadingCtrl: LoadingController,
    private events: Events,
    private nav: NavController
  ) {}

  public showDetails(notificacao) {
    if(notificacao.lida == false) {
      this.events.publish('notification:read', notificacao);
      notificacao.lida = true;
    }

    this.nav.push('notification-detail', {
      id: notificacao.id
    });
  }

  public loadMore() {
    this.alunoService.notificationPage += 1;
    return this.alunoService.getNotificacoes({
      page: this.alunoService.notificationPage
    }).flatMap(
      notificacoes => {
        for(let n of notificacoes.data) {
          this.alunoService.notifications.push(n);
        }
        if(notificacoes.current_page === notificacoes.last_page) {
          this.alunoService.notificationEnd = true;
        }
        return Observable.of(notificacoes.data);
      }
    ).toPromise();
  }

}
