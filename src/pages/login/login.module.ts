import { NgModule }            from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicPageModule }     from 'ionic-angular';

import { LoginPage }        from './login';
import { ComponentsModule } from '../../components/components.module';
import { DeviceService }    from '../../providers/device.service';
import { ProfessorService } from '../../providers/professor.service';

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
    DeviceService,
    ProfessorService
  ],
})
export class LoginPageModule {}
