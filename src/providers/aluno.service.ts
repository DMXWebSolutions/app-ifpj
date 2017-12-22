import { Injectable } from "@angular/core";

import { ApiService } from "./api.service";

@Injectable()
export class AlunoService extends ApiService {
    protected resourceName: string = '/alunos';

    public getNotas(params: any = {}) {
        return this.http.get(`${this.apiRoot}${this.resourceName}/notas`, params);
    }

    public getDisciplinas(params: any = {}) {
        return this.http.get(`${this.apiRoot}${this.resourceName}/disciplinas`, params);
    }

    public getAvaliacoes(params: any = {}) {
        return this.http.get(`${this.apiRoot}${this.resourceName}/disciplina/${params.coddisc}/avalicoes`);
    }
}