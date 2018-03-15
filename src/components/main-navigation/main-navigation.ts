import { Component, Input }               from '@angular/core';
import { App, LoadingController, Events, MenuController } from 'ionic-angular';

import { AuthService }      from '../../providers/auth.service';
import { AlunoService }     from '../../providers/aluno.service';
import { ProfessorService } from '../../providers/professor.service';

@Component({
  selector: 'main-navigation',
  templateUrl: 'main-navigation.html'
})
export class MainNavigationComponent {
  @Input('content') content: any;

  private loading;
  public  pages:      Array<{ icon: string, title: string, name: string }>
  public  activePage: string = 'home';
  public  user:       any;

  constructor(
    private appCtrl: App,
    private events: Events,
    private menu: MenuController,
    private loadingCtrl: LoadingController,
    private professorService: ProfessorService,
    private alunoService: AlunoService,
    private auth: AuthService,
  ) {
    this.initializeComponent();
   }

   private initializeComponent() {
    if (this.auth.authenticated()) {
      this.initializeUserResources();
    } else {
      this.getUserResources();
    }
   }

   private initializeAlunoResources() {
    this.pages = this.alunoService.getNavigationPages();
    this.menu.enable(true, 'main-navigation');
    this.menu.enable(true, 'notifications');
   }

   private initializeProfessorResources() {
    this.pages = this.professorService.getNavigationPages();
    this.menu.enable(true, 'main-navigation');
   }

   private initializeUserResources() {
    this.auth.me().subscribe(
      user => {
        this.user = user;
        this.auth.userType = user.tipo;

        switch(user.tipo) {
          case 'aluno': 
            this.initializeAlunoResources();
            break;
          case 'professor':
            this.initializeProfessorResources();
            break;
        }
      },
      err => alert('Erro ao obter o usuário logado - status ' + err.status)
    );
   }

   private getUserResources() {
    this.events.subscribe('login', (user, userType) => {
      this.user = user;

      switch(userType) {
        case 'aluno':
          this.pages = this.alunoService.getNavigationPages();
          break;
        case 'professor':
          this.pages = this.professorService.getNavigationPages();
          break;
      }
    });
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
        this.alunoService.resetNotificacoes();
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
