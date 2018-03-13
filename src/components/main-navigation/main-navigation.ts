import { Component, Input }               from '@angular/core';
import { App, LoadingController, Events } from 'ionic-angular';

import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'main-navigation',
  templateUrl: 'main-navigation.html'
})
export class MainNavigationComponent {
  @Input('content') content: any;

  private loading;
  public pages:        Array<{ icon: string, title: string, name: string }>
  public activePage:   string = 'home';
  public user:         any;
  public avatar:       string  = 'assets/imgs/menu/noavatar.png';

  constructor(
    private appCtrl: App,
    private loadingCtrl: LoadingController,
    private auth: AuthService,
    private events: Events,
  ) {
    this.initializeComponent();
   }

   private initializeComponent() {
    this.pages = [
      { icon: 'ios-home-outline',          title: 'Home',       name: 'home' },
      { icon: 'ios-create-outline',        title: 'Boletim',    name: 'boletim' },
      { icon: 'ios-folder-open-outline',   title: 'Comunicados',name: 'comunicados' },
    ];

    if(this.auth.getUserType() == 'aluno') {
      this.auth.me().subscribe(
        user => this.user = user,
        err => alert('Erro ao obter o usuário logado - status ' + err.status)
      );
    }

    this.events.subscribe('aluno:login', (user) => this.user = user);
   }

   public openPage(pageName: string) {
    if(pageName == 'home') {
      this.appCtrl.getRootNavs()[0].setRoot(pageName);      
    } else {
      this.appCtrl.getRootNavs()[0].push(pageName);
    }

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
      err => {
        console.log(err);
        this.loading.dismiss();
      },
    );
   }

   public canChangeAvatar(): boolean {
    return (this.auth.getUserType() == 'aluno') ? true : false;
   }
}
