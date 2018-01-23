import { Component, Input } from '@angular/core';
import { Events, App } from 'ionic-angular';

import { AlunoService } from '../../providers/aluno.service';
import { AuthService } from '../../providers/auth.service';
import { NotificacaoService } from '../../providers/notificacao.service';

@Component({
  selector: 'notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsComponent {
  @Input('content') content: any;

  constructor(
    private alunoService: AlunoService,
    private auth: AuthService,
    private notificacaoService: NotificacaoService,
    private events: Events,
    private app: App
  ) {
    this.events.subscribe('notification:read', (notification) => {
      this.notificacaoService.update({
        id: notification.id,
        lida: true
      }).subscribe(
        data => true,
        err => alert('Erro ao atualizar a notificacao: ' + err.status)
      );

    });
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
