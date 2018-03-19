import { Component, Input }      from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Events }                from 'ionic-angular';
import { storage }               from 'firebase';

@Component({
  selector: 'avatar',
  templateUrl: 'avatar.html'
})
export class AvatarComponent {
  @Input('change-picture') private changePicture: boolean = true;

  private user:   any;
  public  avatar: string = 'assets/imgs/menu/noavatar.png';

  constructor(
    private camera: Camera,
    private events: Events,
  ) {
    this.initializeComponent();
  }

  private initializeComponent() {
    this.events.subscribe('login', (user) => {
      this.user = user;
      this.selectPicture(user.tipo);
    });
  }

  public handleClick(): boolean {
    if (this.changePicture) {
      this.takePicture();
      return true;
    }

    return false;
  }

  private async selectPicture(userType: string) {
    this.avatar = (userType == 'aluno') ? await this.getPicture() : 'assets/imgs/menu/noavatar.png';
  }

  private async takePicture() {
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

  private async getPicture(): Promise<string> {
    try {
      const imageName   = `${this.user.usuario}`;
      const pictureRef  = storage().ref(`avatar/${imageName}`);
      const url: string = await pictureRef.getDownloadURL();
      return url;
    } catch(e) {
      console.log(e);
    }
  }

}
