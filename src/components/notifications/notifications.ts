import { Component, Input } from '@angular/core';
import { Events } from 'ionic-angular';

import { AlunoService } from '../../providers/aluno.service';

@Component({
  selector: 'notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsComponent {
  @Input('content') content: any;

  public comunicados: any;

  constructor(
    private alunoService: AlunoService,
    private events: Events
  ) {
    this.events.subscribe('user:logedin', () => {
      this.alunoService.getComunicados().subscribe(
        comunicados => this.comunicados = comunicados,
        err => alert('Erro: ' + err.status)
      );
    });
   }

}
