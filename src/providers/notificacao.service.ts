import { Injectable } from "@angular/core";

import { ApiService } from './api.service';

@Injectable()
export class NotificacaoService extends ApiService {
    protected resourceName: string = '/notificacoes';

    public upload(file: File): any {
        const formData: FormData = new FormData();
              formData.append('file', file, file.name);

        return this.http.post(`${this.apiRoot}${this.resourceName}/file`, formData);
    }
}