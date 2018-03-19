import { Component, Input }               from '@angular/core';
import { App, LoadingController, Events } from 'ionic-angular';

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
    private loadingCtrl: LoadingController,
    private professorService: ProfessorService,
    private alunoService: AlunoService,
    private auth: AuthService,
  ) {
    this.initializeComponent();
   }

   private initializeComponent() {
    this.getUserResources();
   }

   private getUserResources() {
    this.events.subscribe('login', (usuario) => {
      this.user = usuario;

      switch(usuario.tipo) {
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
        this.auth.removeToken();
        this.alunoService.resetNotificacoes();
        this.appCtrl.getRootNavs()[0].setRoot('login');
      },
      err => {
        console.log('Erro ao efetuar o logout: ' + err.status);
        this.loading.dismiss();
      },
    );
   }

   public canChangeAvatar(): boolean {
    return (this.auth.getUserType() == 'aluno') ? true : false;
   }
}
