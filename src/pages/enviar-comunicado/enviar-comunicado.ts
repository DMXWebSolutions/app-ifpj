import { Component, ViewChild } from '@angular/core';
import { IonicPage, LoadingController } from 'ionic-angular';
import { MessageService }       from 'primeng/components/common/messageservice';

import { NotificacaoService } from '../../providers/notificacao.service';
import { TurmaService }       from '../../providers/turma.service';

@IonicPage({
  name: 'enviar-comunicado',
  segment: 'enviar-comunicado'
})
@Component({
  selector: 'page-enviar-comunicado',
  templateUrl: 'enviar-comunicado.html',
})
export class EnviarComunicadoPage {
  @ViewChild('uploader') uploader;

  public matricula: any  = null;
  public turma:     any  = null;
  public segmento:  any  = null;
  public titulo:    any  = null;
  public conteudo:  any  = null;

  private loading;

  public insertFile:   boolean = false;
  public fileName:     string = 'Selecione um arquivo';
  public fileUrl:      string = null;
  public fileToUpload: File = null;

  public turmas:    Array<any> = [];
  public segmentos: Array<any> = [];

  constructor(
    private turmaService: TurmaService,
    private notificacaoService: NotificacaoService,
    private messageService: MessageService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.turmaService.all().subscribe(
      turmas => {
        for (let turma of turmas) {
          this.turmas.push({
            label: turma.descricao,
            value: turma.codturm
          });
        }
      },
      err => console.log(err),
    );

    this.turmaService.segmentos().subscribe(
      segmentos => {
        for (let segmento of segmentos) {
          this.segmentos.push({
            label: segmento.segmento,
            value: segmento.segmento
          });
        }
      },
      err => console.log(err)
    );
  }

  public submit(formulario) {
    this.loading = this.loadingCtrl.create({
      content: 'Enviando comunicado...'
    });

    this.loading.present();

    if (!!this.fileToUpload) {

      this.notificacaoService.upload(this.fileToUpload).subscribe(
        data => this.fileUrl = data.url,
        err => {
          this.loading.dismiss();
          this.messageService.add({
            severity:'error',
            summary:'Erro ' + err.status + ':',
            detail:'Desculpe, não foi possível realizar o upload do arquivo. Se o problema persistir, contate o suporte.'
          });
        },
        () => {
          setTimeout(() => this.createNotification(formulario), 1000);
        }
      );
    } else {
      this.createNotification(formulario);
    }
  }

  private createNotification(formulario) {
    if (formulario.valid) {
      this.notificacaoService.add(formulario.value).subscribe(
        data => true,
        err => {
          this.loading.dismiss();
          this.messageService.add({
            severity:'error',
            summary:'Erro ' + err.status + ':',
            detail:'Desculpe, não foi possível cadastrar a circular. Se o problema persistir, contate o suporte.'
          });
        },
        () => {
          this.loading.dismiss();
          this.clearForm(formulario);
          this.messageService.add({
            severity:'success',
            summary:'Mensagem enviada!',
            detail:'Dentro de alguns instantes os destinatáros receberão o comunicado.'
          });
        }
      );
    }
  }

  public resetWhenEmpty(model: string) {
    if (!this[model].length) {
      this[model] = null;
    }
  }

  public handleUpload(event) {
    this.fileName = event.files[0].name;

    this.notificacaoService.upload(event.files[0]).subscribe(
      data => this.fileUrl = data.url,
      err => console.log(err),
    );
  }

  private clearForm(form) {
    form.resetForm();
    this.fileToUpload = null;
    this.uploader.clear();
  }

  public setFile(event) {
    this.fileToUpload = event.files[0];
  }

  public removeFile() {
    this.fileToUpload = null;
  }

}
