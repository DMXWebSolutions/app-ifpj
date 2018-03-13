import { NgModule } 	from '@angular/core';
import { IonicModule }  from 'ionic-angular/module';

import { NotificacaoService } 		from '../providers/notificacao.service';
import { MainNavigationComponent } 	from './main-navigation/main-navigation';
import { NotificationsComponent } 	from './notifications/notifications';
import { LoginFormComponent } 		from './login-form/login-form'; 
import { AppHeaderComponent } 		from './app-header/app-header';
import { AvatarComponent } 			from './avatar/avatar';
import { MomentModule } 			from 'angular2-moment';
import   moment 					from 'moment';

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
    	LoginFormComponent,
    	AvatarComponent
	],
	exports: [
		MainNavigationComponent,
		NotificationsComponent,
    	AppHeaderComponent,
   	 	LoginFormComponent,
    	AvatarComponent
	],
	providers: [
		NotificacaoService
	]
})
export class ComponentsModule {}
