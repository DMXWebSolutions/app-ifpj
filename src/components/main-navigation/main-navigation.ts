import { Component, Input } from '@angular/core';
import { App, LoadingController, Events } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'main-navigation',
  templateUrl: 'main-navigation.html'
})
export class MainNavigationComponent {
  @Input('content') content: any;

  private loading;
  public pages: Array<{ icon: string, title: string, name: string }>
  public activePage: string = 'home';
  public username: string = 'Instituto Francisca Paula';
  public avatar: string = 'assets/imgs/menu/noavatar.png';

  constructor(
    private appCtrl: App,
    private loadingCtrl: LoadingController,
    private auth: AuthService,
    private events: Events,
    private camera: Camera,
  ) {
    this.pages = [
      { icon: 'ios-home-outline',          title: 'Home',       name: 'home' },
      { icon: 'ios-create-outline',        title: 'Boletim',    name: 'boletim' },
      { icon: 'ios-folder-open-outline',   title: 'Comunicados',name: 'comunicados' },
    ];

    this.events.subscribe('user:logedin', (user, time) => {
      this.username = user.nome;
    });

    this.events.subscribe('avatar:change', (avatar, time) => {
      this.avatar = avatar;
    });
   }

   public openPage(pageName: string) {
    this.appCtrl.getRootNavs()[0].push(pageName);
    this.activePage = pageName;
   }

   public isActive(pageName) {
     return pageName == this.activePage;
   }

   public logout() {
    this.loading = this.loadingCtrl.create({
      content: 'Saindo...',
      dismissOnPageChange: true
    });

    this.loading.present();

    this.auth.logout().subscribe(
      data => {
        this.appCtrl.getRootNavs()[0].push('login');
      },
      err => alert('Erro: ' + err.status),
    );
   }
   
   public getPicture() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(imageData => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.events.publish('avatar:change', base64Image, Date.now());
    });
   }
}
