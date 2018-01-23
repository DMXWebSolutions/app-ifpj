import { Component } from '@angular/core';
import { AlunoService } from '../../providers/aluno.service';
import { Events } from 'ionic-angular';

import { NotificacaoService } from '../../providers/notificacao.service';

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.html'
})
export class AppHeaderComponent {

  constructor(
    private alunoService: AlunoService,
    private notificacaoService: NotificacaoService,
    private events: Events
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
}
