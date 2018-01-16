import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CacheModule } from 'ionic-cache';
import { OneSignal } from '@ionic-native/onesignal';
import { File} from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

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
    DeviceService,
    SplashScreen,
    StatusBar,
    File,
    FileTransfer,
    FilePath,
    Camera
  ]
})
export class AppModule {}
