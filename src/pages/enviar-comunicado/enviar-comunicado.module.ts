import { NgModule }             from '@angular/core';
import { IonicPageModule }      from 'ionic-angular';
import { EnviarComunicadoPage } from './enviar-comunicado';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    EnviarComunicadoPage,
  ],
  imports: [
    IonicPageModule.forChild(EnviarComunicadoPage),
    ComponentsModule,
  ],
})
export class EnviarComunicadoPageModule {}
