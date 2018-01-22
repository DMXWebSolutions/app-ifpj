import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationsPage } from './notifications';
import { MomentModule } from 'angular2-moment';
import moment from 'moment';

import { ComponentsModule } from '../../components/components.module';
import { AlunoService } from '../../providers/aluno.service';

moment.locale('pt-br');

@NgModule({
  declarations: [
    NotificationsPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationsPage),
    MomentModule,
    ComponentsModule
  ],
  providers: [
    AlunoService
  ]
})
export class NotificationsPageModule {}
