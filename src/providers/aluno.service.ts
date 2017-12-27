import { Injectable } from "@angular/core";

import { ApiService } from "./api.service";

@Injectable()
export class AlunoService extends ApiService {
    protected resourceName: string = '/alunos';

    public getDisciplinas(params: any = {}) {
        let url = `${this.apiRoot}${this.resourceName}/disciplinas`;
        let cacheKey = url;
        let request = this.http.get(url, params);

        return this.cache.loadFromObservable(cacheKey, request);
    }

    public getAvaliacoes(params: any = {}) {
        let url = `${this.apiRoot}${this.resourceName}/disciplina/${params.coddisc}/avalicoes`;
        let cacheKey = url;
        let request = this.http.get(url, params);

        return this.cache.loadFromObservable(cacheKey, request);
    }

    public getNotas(params) {
        let url = `${this.apiRoot}${this.resourceName}/disciplina/${params.coddisc}/avalicao/${params.codverifi}/notas`;
        let cacheKey = url;
        let request = this.http.get(url);

        return this.cache.loadFromObservable(cacheKey, request);
    }
}