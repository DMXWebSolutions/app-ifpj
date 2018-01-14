import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CacheModule } from 'ionic-cache';
import { OneSignal } from '@ionic-native/onesignal';

import { MyApp } from './app.component';
import { ComponentsModule } from '../components/components.module';
import { AuthService } from '../providers/auth.service';
import { TokenInterceptor } from '../providers/token.interceptor';
import { DeviceService } from '../providers/device.service';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    ComponentsModule,
    HttpClientModule,
    BrowserModule,
    CacheModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    OneSignal,
    AuthService,
    DeviceService
  ]
})
export class AppModule {}
