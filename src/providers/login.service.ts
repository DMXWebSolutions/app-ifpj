import { Injectable } from "@angular/core";

import { ApiService } from "./api.service";

@Injectable()
export class LoginService extends ApiService {
    protected resourceName: string = '/auth';

    public login(params) {
        return this.http.post(this.apiRoot + this.resourceName, params);
    }
}