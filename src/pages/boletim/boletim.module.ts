import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { BoletimPage } from './boletim';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    BoletimPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(BoletimPage),
  ],
})
export class BoletimPageModule {}
