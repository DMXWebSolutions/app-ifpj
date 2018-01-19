import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { NotificacaoService } from '../../providers/notificacao.service';

@IonicPage({
  name: 'notification-detail',
  segment: 'notification/:id'
})
@Component({
  selector: 'page-notification-detail',
  templateUrl: 'notification-detail.html',
})
export class NotificationDetailPage {
  public notificacao: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private notificationService: NotificacaoService
  ) {
    this.getNotificacao();
  }

  private getNotificacao() {
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

    loading.present();

    this.notificationService.get({
      id: this.navParams.get('id')
    }).subscribe(
      notificacao => {
        this.notificacao = notificacao;

        if(!notificacao.lida) {
          this.notificationService.update({
            id: this.navParams.get('id'),
            lida: true
          }).subscribe(
            data => true,
            err => alert('Erro: ' + err.status)
          );
        }
      },
      err => alert('Erro: ' + err.status),
      () => loading.dismiss()
    );
  }

}
