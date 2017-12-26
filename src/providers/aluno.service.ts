import { Injectable } from "@angular/core";

import { ApiService } from "./api.service";

@Injectable()
export class AlunoService extends ApiService {
    protected resourceName: string = '/alunos';

    public getDisciplinas(params: any = {}) {
        return this.http.get(`${this.apiRoot}${this.resourceName}/disciplinas`, params);
    }

    public getAvaliacoes(params: any = {}) {
        return this.http.get(`${this.apiRoot}${this.resourceName}/disciplina/${params.coddisc}/avalicoes`);
    }

    public getNotas(params) {
        return this.http.get(`${this.apiRoot}${this.resourceName}/disciplina/${params.coddisc}/avalicao/${params.codverifi}/notas`);
    }
}