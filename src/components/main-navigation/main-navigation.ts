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
    if (this.auth.authenticated()) {
      this.initializeUserResources();
    } else {
      this.getUserResources();
    }
   }

   private initializeAlunoResources() {
    this.pages = this.alunoService.getNavigationPages();
    this.auth.me().subscribe(
      user => this.user = user,
      err => alert('Erro ao obter o usuário logado - status ' + err.status)
    );
   }

   private initializeProfessorResources() {
    this.pages = this.professorService.getNavigationPages();
    console.log(this.pages);
   }

   private initializeUserResources() {
    switch(this.auth.getUserType()) {
      case 'aluno': 
        console.log('aluno');
        this.initializeAlunoResources();
        break;
      case 'professor':
        console.log('professor');
        this.initializeProfessorResources();
        break;
      default:
        console.log('Ops! Something wrong.');
        break;
    }
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
        default:
          console.log('Ops!');
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
