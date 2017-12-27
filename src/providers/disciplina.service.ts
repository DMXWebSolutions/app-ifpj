import { Injectable } from "@angular/core";

import { ApiService } from "./api.service";

@Injectable()
export class DisciplinaService extends ApiService {
    protected resourceName: string = '/disciplinas';

    public read(coddisc: number) {
        let url = `${this.apiRoot}${this.resourceName}/${coddisc}`;
        let cacheKey = url;
        let request = this.http.get(url);

        return this.cache.loadFromObservable(cacheKey, request);
    }
}