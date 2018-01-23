import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { NotasPage } from './notas';
import { ComponentsModule } from '../../../components/components.module';
import { DisciplinaService } from '../../../providers/disciplina.service';
import { AvaliacaoService } from '../../../providers/avaliacao.service';

@NgModule({
  declarations: [
    NotasPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(NotasPage),
  ],
  providers: [
    DisciplinaService,
    AvaliacaoService,
  ]
})
export class NotasPageModule {}
