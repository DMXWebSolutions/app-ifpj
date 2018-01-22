import { Component, Input } from '@angular/core';
import { Events, App } from 'ionic-angular';

import { AlunoService } from '../../providers/aluno.service';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsComponent {
  @Input('content') content: any;

  public notificacoes: any = [];

  constructor(
    private alunoService: AlunoService,
    private auth: AuthService,
    private events: Events,
    private app: App
  ) {
    if(this.auth.authenticated()) {
      this.getNotificacoes();
    } else {
      this.events.subscribe('user:logedin', () => {
        this.getNotificacoes();
      });
    }
   }

   private getNotificacoes() {
    this.alunoService.getNotificacoes().subscribe(
      notificacoes => this.notificacoes = notificacoes.data,
      err => alert('Erro: ' + err.status)
    );
   }

   public showDetails(notificacao) {
     if(notificacao.lida == false) {
       this.events.publish('notification:read', notificacao);
       notificacao.lida = true;
     }

      this.app.getRootNavs()[0].push('notification-detail', {
        id: notificacao.id
      });
   }

   public showAll() {
    this.app.getRootNavs()[0].push('notifications');
   }
}
