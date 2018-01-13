import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
    HttpClient 
} 								from '@angular/common/http';
import { Injectable, Injector }	from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AuthService } from './auth.service';
import { environment } from '../environments/environment';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
    constructor(
        private injector: Injector,
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).catch((errorResponse: HttpErrorResponse) => {
        if(errorResponse.status === 401) {
            const http = this.injector.get(HttpClient);
            const auth = this.injector.get(AuthService);

            return http.post<any>(`${environment.API_URL}/refresh`, {})
            .flatMap(data => {
                auth.setToken(data.token);

                const newRequest = request.clone({
                    setHeaders: {
                        'Authorization': `Bearer ${data.token}`
                    }
                });

                return next.handle(newRequest);
            });
        }
        return Observable.throw(errorResponse);
    });
  }
}