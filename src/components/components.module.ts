import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular/module';


import { AlunoService } from '../providers/aluno.service';
import { MainNavigationComponent } from './main-navigation/main-navigation';
import { NotificationsComponent } from './notifications/notifications';
import { AppHeaderComponent } from './app-header/app-header';

@NgModule({
	imports: [
		IonicModule
	],
	declarations: [
		MainNavigationComponent,
		NotificationsComponent,
    	AppHeaderComponent
	],
	exports: [
		MainNavigationComponent,
		NotificationsComponent,
    	AppHeaderComponent
	],
	providers: [
		AlunoService
	]
})
export class ComponentsModule {}
