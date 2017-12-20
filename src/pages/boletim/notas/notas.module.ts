import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { NotasPage } from './notas';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    NotasPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(NotasPage),
  ],
})
export class NotasPageModule {}
