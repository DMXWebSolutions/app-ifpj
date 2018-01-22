import { Component, Input } from '@angular/core';
import { App, LoadingController, Events } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage } from 'firebase';

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
  public user: any;
  public avatar: any = 'assets/imgs/menu/noavatar.png';

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

    if(this.auth.authenticated()) {
      this.auth.me().subscribe(
        user => {
          this.user = user;
        this.selectPicture();          
        },
        err => alert('Erro ao obter o usuário logado - status ' + err.status)
      );
    } else {
      this.events.subscribe('user:logedin', (user, time) => {
        this.user = user;
        this.selectPicture();
      });
    }
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
        this.appCtrl.getRootNavs()[0].setRoot('login');
        this.events.publish('user:logout', data);
      },
      err => alert('Erro: ' + err.status),
    );
   }
   
    public async takePicture() {
      try {
        const options: CameraOptions = {
          quality: 100,
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          saveToPhotoAlbum: false,
          correctOrientation: true
        };
  
        const result =  await this.camera.getPicture(options);
        const image = `data:image/jpeg;base64,${result}`;
        const imageName = `${this.user.codalun}`;
        const pictures = storage().ref(`avatar/${imageName}`);

        this.avatar = image;

        pictures.putString(image, 'data_url');
      } catch (e) {
        console.log(e);
      }
   }

   public async selectPicture() {
    const imageName = `${this.user.codalun}`;
    const pictureRef = storage().ref(`avatar/${imageName}`);
    const url = await pictureRef.getDownloadURL();

    this.avatar = url;
   }
}
