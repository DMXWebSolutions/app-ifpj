import { Injectable, Injector } from "@angular/core";
import { Events } from "ionic-angular";

import { ApiService } from "./api.service";
import { AuthService } from "./auth.service";

@Injectable()
export class AlunoService extends ApiService {
    protected resourceName: string = '/alunos';
    public notiNewsNumber: any;

    constructor(
        private events: Events,
        private auth: AuthService,
        injector: Injector
    ) {
        super(injector);

        if(this.auth.authenticated()) {
            this.getNotiNewsNumber();
        } else {
            this.events.subscribe('user:logedin', (user, time) => {
                this.getNotiNewsNumber();
            });
        }

        this.events.subscribe('notification:read', (notification) => {
            --this.notiNewsNumber;
        });
    }

    public me(params: any = {}, updateCache: boolean = false): any {
        let url = `${this.apiRoot}${this.resourceName}/me`;
        let cacheKey = url;
        let groupKey = `${this.resourceName}/me`;
        let request = this.http.get(url);

        if(!updateCache)
            return this.cache.loadFromObservable(cacheKey, request);
        else
            return this.cache.loadFromDelayedObservable(cacheKey, request, groupKey, this.cacheTtl, 'all');

    }

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

    public getNotificacoes(params: any = {}): any {
        return this.http.get(`${this.apiRoot}${this.resourceName}/notificacoes`, { params: params });
    }

    public getNotiNewsNumber(params: any = {}, updateCache: boolean = false): void {
        let url = `${this.apiRoot}${this.resourceName}/notificacoes/count`;
        let request = this.http.get(url, {params: params});

        request.subscribe(
            data => this.notiNewsNumber = data,
            err => alert('Erro ao obter o numero de notificacoes: ' + err.status)
        );
    }
}