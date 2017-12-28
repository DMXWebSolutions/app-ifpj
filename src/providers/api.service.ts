import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CacheService } from 'ionic-cache';

import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

export abstract class ApiService {
    protected apiRoot: string = environment.API_URL;
    protected resourceName: string;
    protected cacheTtl: number = 60 * 60 * 24 * 30 * 3;

    constructor(
        @Inject(HttpClient) protected http: HttpClient,
        @Inject(CacheService) protected cache: CacheService,
        @Inject(AuthService) protected authService: AuthService,
    ) {}
}