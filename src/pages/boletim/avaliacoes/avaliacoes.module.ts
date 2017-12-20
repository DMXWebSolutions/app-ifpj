import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AvaliacoesPage } from './avaliacoes';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    AvaliacoesPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AvaliacoesPage),
  ],
})
export class AvaliacoesPageModule {}
