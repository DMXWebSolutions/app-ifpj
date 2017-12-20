import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular/module';

import { MainNavigationComponent } from './main-navigation/main-navigation';
import { AppHeaderComponent } from './app-header/app-header';

@NgModule({
	imports: [
		IonicModule
	],
	declarations: [
		MainNavigationComponent,
    	AppHeaderComponent
	],
	exports: [
		MainNavigationComponent,
    	AppHeaderComponent
	]
})
export class ComponentsModule {}
