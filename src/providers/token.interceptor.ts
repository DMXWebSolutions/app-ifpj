import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';
import { environment } from '../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(
		private injector: Injector,
	) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
	  	const auth: 	AuthService = this.injector.get(AuthService);
		const token: 		 string = auth.getToken();
		const requestDomain: string = request.url.split('/')[2];
		const ApiDomain: 	 string = environment.API_URL.split('/')[2];

    if(token && (requestDomain === ApiDomain)) {
			const authRequest = request.clone({
				setHeaders: {
					'Authorization': `Bearer ${token}`
				}
			});

			return next.handle(authRequest);
		} else {
			return next.handle(request);
		}

  }
}