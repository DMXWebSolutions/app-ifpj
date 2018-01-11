import { Injectable } from '@angular/core';

import { ApiService } from '../providers/api.service';

@Injectable()
export class DeviceService extends ApiService {
    protected resourceName: string = '/devices';
}