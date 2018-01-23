import { Component } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';
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
  constructor(
    private alunoService: AlunoService,
    private nav: NavController,
    private events: Events,
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
      page: this.alunoService.notificationPage,
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
