import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular/module';

import { NotificacaoService } from '../providers/notificacao.service';
import { MainNavigationComponent } from './main-navigation/main-navigation';
import { NotificationsComponent } from './notifications/notifications';
import { AppHeaderComponent } from './app-header/app-header';
import { MomentModule } from 'angular2-moment';
import moment from 'moment';
import { LoginFormComponent } from './login-form/login-form';

moment.locale('pt-br');

@NgModule({
	imports: [
		IonicModule,
		MomentModule
	],
	declarations: [
		MainNavigationComponent,
		NotificationsComponent,
    	AppHeaderComponent,
    LoginFormComponent
	],
	exports: [
		MainNavigationComponent,
		NotificationsComponent,
    	AppHeaderComponent,
    LoginFormComponent
	],
	providers: [
		NotificacaoService
	]
})
export class ComponentsModule {}
