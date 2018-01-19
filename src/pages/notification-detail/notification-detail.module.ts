import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationDetailPage } from './notification-detail';

import { ComponentsModule } from '../../components/components.module';
import { NotificacaoService } from '../../providers/notificacao.service';

@NgModule({
  declarations: [
    NotificationDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationDetailPage),
    ComponentsModule
  ],
  providers: [
    NotificacaoService
  ]
})
export class NotificationDetailPageModule {}
