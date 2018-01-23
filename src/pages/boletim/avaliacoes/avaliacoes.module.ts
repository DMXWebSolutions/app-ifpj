import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AvaliacoesPage } from './avaliacoes';
import { ComponentsModule } from '../../../components/components.module';
import { AlunoService } from '../../../providers/aluno.service';
import { AvaliacaoService } from '../../../providers/avaliacao.service';

@NgModule({
  declarations: [
    AvaliacoesPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AvaliacoesPage),
  ],
  providers: [
    AvaliacaoService
  ]
})
export class AvaliacoesPageModule {}
