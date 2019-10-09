import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
	private token: string;
	private isAuth: boolean;
	private auth$: Observable<boolean>;

  constructor(	private _authService: AuthService	) {
  	//retorrna el booleano en caso de que el usuario este logueado
  	this.auth$ = this._authService.select$();
  	this.auth$.subscribe( bool => this.isAuth = bool );
  }

  	//Interceptor que manda el token en el header cuando un usuario esta logueado
  	intercept(request: HttpRequest<any>, next: HttpHandler): Observable <HttpEvent<any>>{
  		const token = localStorage.getItem('token');
        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'beare: '+token) });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
  		return next.handle(request);
  	}
}

