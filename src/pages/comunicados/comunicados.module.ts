import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComunicadosPage } from './comunicados';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ComunicadosPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ComunicadosPage),
  ],
})
export class ComunicadosPageModule {}
