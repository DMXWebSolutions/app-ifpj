import { Injectable } from "@angular/core";

import { ApiService } from "./api.service";

@Injectable()
export class AlunoService extends ApiService {
    protected resourceName: string = '/alunos';

    public getDisciplinas(params: any = {}, updateCache: boolean = false) {
        let url = `${this.apiRoot}${this.resourceName}/disciplinas`;
        let cacheKey = url;
        let groupKey = `${this.resourceName}/disciplinas`;
        let request = this.http.get(url, params);

        if(!updateCache)
            return this.cache.loadFromObservable(cacheKey, request);
        else
            return this.cache.loadFromDelayedObservable(cacheKey, request, groupKey, this.cacheTtl, 'all');
    }

    public getAvaliacoes(params: any = {}, updateCache: boolean = false) {
        let url = `${this.apiRoot}${this.resourceName}/disciplina/${params.coddisc}/avalicoes`;
        let cacheKey = url;
        let groupKey = `${this.resourceName}/disciplina/avalicoes`;
        let request = this.http.get(url, params);

        if(!updateCache)
            return this.cache.loadFromObservable(cacheKey, request);
        else
            return this.cache.loadFromDelayedObservable(cacheKey, request, groupKey, this.cacheTtl, 'all');
    }

    public getNotas(params: any = {}, updateCache: boolean = false) {
        let url = `${this.apiRoot}${this.resourceName}/disciplina/${params.coddisc}/avalicao/${params.codverifi}/notas`;
        let cacheKey = url;
        let groupKey = `${this.resourceName}/disciplina/avalicao/notas`;
        let request = this.http.get(url);


        if(!updateCache)
            return this.cache.loadFromObservable(cacheKey, request);
        else
            return this.cache.loadFromDelayedObservable(cacheKey, request, groupKey, this.cacheTtl, 'all');
    }

    public getComunicados() {
        return this.http.get(`${this.apiRoot}${this.resourceName}/comunicados`);
    }
}