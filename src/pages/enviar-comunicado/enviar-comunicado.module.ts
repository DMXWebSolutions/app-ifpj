import { NgModule }             from '@angular/core';
import { IonicPageModule }      from 'ionic-angular';
import { EnviarComunicadoPage } from './enviar-comunicado';
import { ChipsModule }          from 'primeng/chips';
import { MultiSelectModule }    from 'primeng/multiselect';
import { InputTextModule }      from 'primeng/inputtext';
import { InputTextareaModule }  from 'primeng/inputtextarea';
import { ButtonModule }         from 'primeng/button';
import { GrowlModule }          from 'primeng/growl';
import { MessageService }       from 'primeng/components/common/messageservice';
import { FileUploadModule }     from 'primeng/fileupload';
import { ToggleButtonModule }   from 'primeng/togglebutton';
import { TooltipModule }        from 'primeng/tooltip';

import { ComponentsModule } from '../../components/components.module';
import { TurmaService } from '../../providers/turma.service';

@NgModule({
  declarations: [
    EnviarComunicadoPage,
  ],
  imports: [
    IonicPageModule.forChild(EnviarComunicadoPage),
    ComponentsModule,
    ChipsModule,
    MultiSelectModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    GrowlModule,
    FileUploadModule,
    ToggleButtonModule,
    TooltipModule
  ],
  providers: [
    MessageService,
    TurmaService,
  ]
})
export class EnviarComunicadoPageModule {}
