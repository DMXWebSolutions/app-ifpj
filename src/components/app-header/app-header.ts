import { Component } from '@angular/core';

import { AlunoService } from '../../providers/aluno.service';

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.html'
})
export class AppHeaderComponent {

  constructor(
    public  alunoService: AlunoService,
  ) {}
}
