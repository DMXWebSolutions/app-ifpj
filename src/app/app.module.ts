import { 
  ErrorHandler,
  NgModule
}                          from '@angular/core';
import {
  IonicApp,
  IonicErrorHandler,
  IonicModule
}                           from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule }        from '@auth0/angular-jwt';
import { BrowserModule }    from '@angular/platform-browser';
import { SplashScreen }     from '@ionic-native/splash-screen';
import { StatusBar }        from '@ionic-native/status-bar';
import { CacheModule }      from 'ionic-cache';
import { OneSignal }        from '@ionic-native/onesignal';
import { Camera }           from '@ionic-native/camera';

import { MyApp }            from './app.component';
import { ComponentsModule } from '../components/components.module';
import { AuthService }      from '../providers/auth.service';
import { DeviceService }    from '../providers/device.service';
import { AlunoService }     from '../providers/aluno.service';
import { ProfessorService } from '../providers/professor.service';

import { environment }      from '../environments/environment';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    ComponentsModule,
    HttpClientModule,
    BrowserModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [environment.API_DOMAIN]
      }
    }),
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
    OneSignal,
    ProfessorService,
    AlunoService,
    AuthService,
    DeviceService,
    SplashScreen,
    StatusBar,
    Camera
  ]
})
export class AppModule {}
