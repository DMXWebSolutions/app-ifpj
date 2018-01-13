import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CacheService } from 'ionic-cache';

import { environment } from '../environments/environment';

export abstract class ApiService {
    protected apiRoot: string = environment.API_URL;
    protected resourceName: string;
    protected cacheTtl: number = 60 * 60 * 24 * 30 * 3;

    constructor(
        @Inject(HttpClient) protected http: HttpClient,
        @Inject(CacheService) protected cache: CacheService,
    ) {}

    public add(params: any = {}) {
        return this.http.post(`${this.apiRoot}${this.resourceName}`, params);
    }

    public all(params: any = {}) {
        return this.http.get(`${this.apiRoot}${this.resourceName}`, params);
    }

    public get(params: any = {}) {
        return this.http.get(`${this.apiRoot}${this.resourceName}/${params.id}`, params);
    }

    public update(params: any = {}) {
        return this.http.put(`${this.apiRoot}${this.resourceName}/${params.id}`, params);
    }

    public delete(params: any = {}) {
        return this.http.delete(`${this.apiRoot}${this.resourceName}/${params.id}`, params);
    }
}