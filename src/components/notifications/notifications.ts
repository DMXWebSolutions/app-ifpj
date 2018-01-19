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

  public notificacoes: any;
  private perpage: number = 1;
  private page: number = 1;

  constructor(
    private alunoService: AlunoService,
    private notificacaoService: NotificacaoService,
    private auth: AuthService,
    private events: Events,
    private app: App
  ) {
    if(this.auth.authenticated()) {
      this.getAlunos();
    } else {
      this.events.subscribe('user:logedin', () => {
        this.getAlunos();
      });
    }
   }

   private getAlunos() {
    this.alunoService.getNotificacoes({
      perpage: this.perpage,
      page: this.page
    }).subscribe(
      notificacoes => this.notificacoes = notificacoes,
      err => alert('Erro: ' + err.status)
    );
   }

   public showDetails(notificacao) {
      notificacao.lida = true;

      this.app.getRootNavs()[0].push('notification-detail', {
        id: notificacao.id
      });
   }
}
