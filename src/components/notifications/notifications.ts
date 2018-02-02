import { Component, Input } from '@angular/core';
import { Events, App } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';

import { AlunoService } from '../../providers/aluno.service';
import { NotificacaoService } from '../../providers/notificacao.service';

@Component({
  selector: 'notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsComponent {
  @Input('content') content: any;

  constructor(
    private alunoService: AlunoService,
    private notificacaoService: NotificacaoService,
    private oneSignal: OneSignal,
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

    this.oneSignal.handleNotificationOpened().subscribe((notification) => {
      let id = notification.notification.payload.additionalData.id;
      let notifications = this.alunoService.notifications;
      
      if (!!notifications) {
        let notificationExists = notifications.some((n) => n.id == id);
        if (!notificationExists) {
          this.add(id);
        }
      } else {
        this.showAll();
      }
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

   private add(id: number) {
    this.notificacaoService.get({ id: id }).subscribe(
      notificacao => {
        this.alunoService.notifications.unshift(notificacao);
        ++this.alunoService.notiNewsNumber;
      },
      err => console.log(err),
      () =>  this.showAll()
    );
   }

   public showAll() {
    this.app.getRootNavs()[0].push('notifications');
   }
}
