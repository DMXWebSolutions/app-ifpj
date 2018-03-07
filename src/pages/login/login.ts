import { Component }                 from '@angular/core';
import { IonicPage, MenuController } from 'ionic-angular';

import { AlunoService }              from '../../providers/aluno.service';
import { ProfessorService }          from '../../providers/professor.service';

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

  public alunoForm;
  public alunoFields;
  public professorForm;
  public professorFields;

  constructor(
    private menu: MenuController,
    private alunoService: AlunoService,
    private professorService: ProfessorService
  ) {}

  ionViewWillEnter() {
    this.disableMenus();
    this.initializeForms();
  }

  private disableMenus() {
    this.menu.enable(false, 'main-navigation');
    this.menu.enable(false, 'notifications');
  }

  private initializeForms() {
    this.alunoForm       = this.alunoService.getLoginControls();
    this.alunoFields     = this.alunoService.getLoginFields();
    this.professorForm   = this.professorService.getLoginControls();
    this.professorFields = this.professorService.getLoginFields();
  }

  public showForm(formToShow: string) {
    this.activeTab = formToShow;
  }

}
