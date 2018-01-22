import { Component } from '@angular/core';
import { AlunoService } from '../../providers/aluno.service';
import { Events } from 'ionic-angular';

import { NotificacaoService } from '../../providers/notificacao.service';

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.html'
})
export class AppHeaderComponent {

  public notiNewsNumber: number;

  constructor(
    private alunoService: AlunoService,
    private notificacaoService: NotificacaoService,
    private events: Events
  ) {
    this.getNewsNumber();

    this.events.subscribe('notification:read', (notification) => {
      this.notificacaoService.update({
        id: notification.id,
        lida: true
      }).subscribe(
        data => --this.notiNewsNumber,
        err => alert('Erro: ' + err.status)
      );

    });
  }

  public getNewsNumber() {
    this.alunoService.getNotiNewsNumber().subscribe(
      count => this.notiNewsNumber = count,
      err => alert('Erro: ' + err.status)
    );
  }
}
