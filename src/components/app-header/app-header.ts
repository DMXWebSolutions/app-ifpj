import { Component } from '@angular/core';
import { AlunoService } from '../../providers/aluno.service';

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.html'
})
export class AppHeaderComponent {

  public notiNewsNumber: number;

  constructor(
    private alunoService: AlunoService
  ) {
    this.getNewsNumber();
  }

  public getNewsNumber() {
    this.alunoService.getNotiNewsNumber().subscribe(
      count => this.notiNewsNumber = count,
      err => alert('Erro: ' + err.status)
    );
  }
}
