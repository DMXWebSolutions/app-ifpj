import { Injectable, Injector }   from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Events }                 from "ionic-angular";

import { ApiService }         from "./api.service";
import { AuthService }        from "./auth.service";
import { NotificacaoService } from "./notificacao.service";

@Injectable()
export class AlunoService extends ApiService {
    protected resourceName: string = '/alunos';
    public ccount: number = 0;
    public notifications: any = null;
    public notiNewsNumber: any = null;
    public notificationPage: number = 1;
    public notificationEnd: boolean = false;

    constructor(
        private events: Events,
        private auth: AuthService,
        private notificacaoService: NotificacaoService,
        injector: Injector
    ) {
        super(injector);
        this.initializeService();
    }

    private initializeService() {
        if(this.auth.authenticated() && this.auth.getUserType() == 'aluno') {
            this.getNotiNewsNumber();
            this.initializeNotificacoes();
        }
        
        this.events.subscribe('aluno:login', (user) => {
            this.getNotiNewsNumber();
            this.initializeNotificacoes();
        });

        this.events.subscribe('notification:read', (notification) => {
            --this.notiNewsNumber;

            this.notificacaoService.update({id: notification.id, lida: true})
                .subscribe(
                    data => true,
                    err => alert('Erro ao atualizar a notificacao - Status: ' + err.status)
                );
        });
    }

    public me(params: any = {}, updateCache: boolean = false): any {
        let url = `${this.apiRoot}${this.resourceName}/me`;
        let request = this.http.get(url);

        return request;
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

    private initializeNotificacoes() {
        this.getNotificacoes().subscribe(
            notificacoes => {
                for (let n of notificacoes.data) {
                    if (n.tipo == 'comunicado') ++this.ccount;
                }
                this.notifications = notificacoes.data;
            },
            err => alert('Erro ao obter a lista de notificacoes: ' + err.status)
        );
    }

    public getNotiNewsNumber(params: any = {}, updateCache: boolean = false): void {
        let url = `${this.apiRoot}${this.resourceName}/notificacoes/count`;
        let request = this.http.get(url, {params: params});

        request.subscribe(
            data => this.notiNewsNumber = data,
            err => alert('Erro ao obter o numero de notificacoes: ' + err.status)
        );
    }

    public getLoginControls(): any {
        return new FormGroup({
            codalun: new FormControl(),
            Cpfresp: new FormControl(),
        });
    }

    public getLoginFields(): any {
        return [
            { placeholder: 'Matricula',          controlName: 'codalun', type: 'text',     icon: 'person' },
            { placeholder: 'CPF do responsável', controlName: 'Cpfresp', type: 'password', icon: 'lock' },
        ];
    }

    public getNavigationPages(): any {
        return [
            { icon: 'ios-home-outline',          title: 'Home',       name: 'home' },
            { icon: 'ios-create-outline',        title: 'Boletim',    name: 'boletim' },
            { icon: 'ios-folder-open-outline',   title: 'Comunicados',name: 'comunicados' },
        ];
    }
}