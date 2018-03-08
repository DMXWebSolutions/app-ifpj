import { Component } from '@angular/core';

import { AlunoService } from '../../providers/aluno.service';
import { AuthService }  from '../../providers/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.html'
})
export class AppHeaderComponent {

  constructor(
    public  alunoService: AlunoService,
    private auth: AuthService
  ) {}

  public shownotifications() {
    return this.auth.getUserType() == 'aluno' ? true : false;
  }
}
