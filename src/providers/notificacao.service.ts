import { Injectable } from "@angular/core";

import { ApiService } from './api.service';

@Injectable()
export class NotificacaoService extends ApiService {
    protected resourceName: string = '/notificacoes';
}