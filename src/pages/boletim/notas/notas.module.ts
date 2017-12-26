import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { NotasPage } from './notas';
import { ComponentsModule } from '../../../components/components.module';
import { AlunoService } from '../../../providers/aluno.service';

@NgModule({
  declarations: [
    NotasPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(NotasPage),
  ],
  providers: [
    AlunoService
  ]
})
export class NotasPageModule {}
