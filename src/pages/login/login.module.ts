import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';
import { LoginPage } from './login';
import { LoginService } from '../../providers/login.service';
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
    LoginService,
    DeviceService
  ],
})
export class LoginPageModule {}
