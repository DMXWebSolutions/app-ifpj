import { Injectable } from '@angular/core';

import { ApiService } from '../providers/api.service';

@Injectable()
export class DeviceService extends ApiService {
    protected resourceName: string = '/devices';

    public update(params: any = {}) {
        return this.http.put(`${this.apiRoot}${this.resourceName}`, params);
    }
}