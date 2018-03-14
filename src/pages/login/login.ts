import { Component }                 from '@angular/core';
import { IonicPage, MenuController } from 'ionic-angular';
import { FormGroup, FormControl }    from '@angular/forms';

@IonicPage({
  name: 'login',
  segment: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public  activeTab: string  = 'aluno';

  public controls;
  public fields;

  constructor(
    private menu: MenuController,
  ) {}

  ionViewWillEnter() {
    this.disableMenus();
    this.initializeForm();
  }

  private disableMenus() {
    this.menu.enable(false, 'main-navigation');
    this.menu.enable(false, 'notifications');
  }

  private initializeForm() {
    this.controls = new FormGroup({
      user:  new FormControl(),
      senha: new FormControl(),
    });
    this.fields = [
      { placeholder: 'Usuário', controlName: 'user',  type: 'text',     icon: 'person' },
      { placeholder: 'Senha',   controlName: 'senha', type: 'password', icon: 'lock' },
    ];
  }
}
