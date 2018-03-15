import { Component } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';
import { AlunoService } from '../../providers/aluno.service';
import { ProfessorService } from '../../providers/professor.service';
import { AuthService } from '../../providers/auth.service';

@IonicPage({
  name: 'home',
  segment: 'home'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public pages: any;

  constructor(
    private navCtrl: NavController,
    private events: Events,
    private auth: AuthService,
    private alunoService: AlunoService,
    private professorService: ProfessorService,
  ) {
    this.initializePage();
  }

  private initializePage() {
    if (this.auth.authenticated()) {
      this.initializeUserResources();
    } else {
      this.getUserResources();
    }
  }

  private initializeUserResources() {
    this.auth.me().subscribe(
      user => {
        switch(user.tipo) {
          case 'aluno': 
            this.pages = this.alunoService.getNavigationPages();
            break;
          case 'professor':
            this.pages = this.professorService.getNavigationPages();
            break;
        }
      },
      err => alert('Erro ao obter o usuário logado - status ' + err.status)
    );
  }

  private getUserResources() {
    this.events.subscribe('login', (user, userType) => {
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

  public openPage(pageName) {
    this.navCtrl.push(pageName);
  }
}
