import { Injector, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CacheService } from 'ionic-cache';

import { environment } from '../environments/environment';

@Injectable()
export abstract class ApiService {
    protected http: HttpClient;
    protected cache: CacheService;

    protected apiRoot: string = environment.API_URL;
    protected resourceName: string;
    protected cacheTtl: number = 60 * 60 * 24 * 30 * 3;

    constructor(
        protected injector: Injector
    ) {
        this.http = this.injector.get(HttpClient);
        this.cache = this.injector.get(CacheService);
    }

    public add(params: any = {}): any {
        return this.http.post(`${this.apiRoot}${this.resourceName}`, params);
    }

    public all(params: any = {}): any {
        return this.http.get(`${this.apiRoot}${this.resourceName}`, params);
    }

    public get(params: any = {}): any {
        return this.http.get(`${this.apiRoot}${this.resourceName}/${params.id}`);
    }

    public update(params: any = {}): any {
        return this.http.put(`${this.apiRoot}${this.resourceName}/${params.id}`, params);
    }

    public delete(params: any = {}): any {
        return this.http.delete(`${this.apiRoot}${this.resourceName}/${params.id}`, params);
    }
}