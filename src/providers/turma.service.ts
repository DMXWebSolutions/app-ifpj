import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable()
export class TurmaService extends ApiService {
    protected resourceName: string = '/turmas'

    public segmentos(): any {
        return this.http.get(`${this.apiRoot}${this.resourceName}/segmentos`);
    }
}