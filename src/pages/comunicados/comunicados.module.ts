import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComunicadosPage } from './comunicados';
import { MomentModule } from 'angular2-moment';
import moment from 'moment';

moment.locale('pt-br');

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ComunicadosPage,
  ],
  imports: [
    IonicPageModule.forChild(ComunicadosPage),
    ComponentsModule,
    MomentModule
  ],
})
export class ComunicadosPageModule {}
