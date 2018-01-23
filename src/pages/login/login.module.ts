import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';
import { LoginPage } from './login';
import { DeviceService } from '../../providers/device.service';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    ComponentsModule,
    ReactiveFormsModule,
    IonicPageModule.forChild(LoginPage),
  ],
  providers: [
    DeviceService
  ],
})
export class LoginPageModule {}
