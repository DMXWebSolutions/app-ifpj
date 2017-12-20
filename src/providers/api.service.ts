import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';

import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

export abstract class ApiService {
    protected apiRoot: string = environment.API_URL;
    protected resourceName: string;

    constructor(
        @Inject(HttpClient) protected http: HttpClient,
        @Inject(AuthService) protected authService: AuthService
    ) {}
}