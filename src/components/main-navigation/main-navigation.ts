import { Component, Input } from '@angular/core';
import { App } from 'ionic-angular';

@Component({
  selector: 'main-navigation',
  templateUrl: 'main-navigation.html'
})
export class MainNavigationComponent {
  @Input('content') content: any

  public pages: Array<{ icon: string, title: string, name: string }>
  public activePage: string = 'home';

  constructor(private appCtrl: App) {
    this.pages = [
      { icon: 'ios-home-outline',          title: 'Home',       name: 'home' },
      { icon: 'ios-create-outline',        title: 'Boletim',    name: 'boletim' },
      { icon: 'ios-folder-open-outline',   title: 'Comunicados',name: 'comunicados' },
    ];
   }

   public openPage(pageName: string) {
    this.appCtrl.getRootNavs()[0].setRoot(pageName);
    this.activePage = pageName;
   }

   public isActive(pageName) {
     return pageName == this.activePage;
   }
}
