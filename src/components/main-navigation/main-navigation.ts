import { Component, Input } from '@angular/core';
import { App, LoadingController, Events } from 'ionic-angular';

import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'main-navigation',
  templateUrl: 'main-navigation.html'
})
export class MainNavigationComponent {
  @Input('content') content: any

  private loading;
  public pages: Array<{ icon: string, title: string, name: string }>
  public activePage: string = 'home';
  public username: string = 'Instituto Francisca Paula';

  constructor(
    private appCtrl: App,
    private loadingCtrl: LoadingController,
    private auth: AuthService,
    private events: Events,
  ) {
    this.pages = [
      { icon: 'ios-home-outline',          title: 'Home',       name: 'home' },
      { icon: 'ios-create-outline',        title: 'Boletim',    name: 'boletim' },
      { icon: 'ios-folder-open-outline',   title: 'Comunicados',name: 'comunicados' },
    ];

    events.subscribe('user:logedin', (user, time) => {
      this.username = user.nome;
      alert('Event fired!');
    });
   }

   public openPage(pageName: string) {
    this.appCtrl.getRootNavs()[0].setRoot(pageName);
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
      },
      err => alert('Erro: ' + err.status),
    );
   }
   
}
