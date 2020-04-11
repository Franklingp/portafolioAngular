import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
	private token: string;
	private isAuth: boolean;
	private auth$: Observable<boolean>;

  constructor(	private _authService: AuthService,
                private _router: Router) {
  	//retorrna el booleano en caso de que el usuario este logueado
  	this.auth$ = this._authService.select$();
  	this.auth$.subscribe( bool => this.isAuth = bool );
  }

  	//Interceptor que manda el token en el header cuando un usuario esta logueado
  	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
      //console.log(request);
  		const token = localStorage.getItem('token');
        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'beare: '+token) });
        }

      //if (!request.headers.has('Content-Type') && request.url != "http://localhost:3700/api/proyect/uploadImage"+request) {
      //      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
      //}

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
  		return next.handle(request).pipe(
        catchError( (error: HttpErrorResponse) => {

          if(error.status === 401){
            alert("Por favor inicie sesion para continuar");
            this._authService.dispatch(null);
            this._router.navigate(["/log-in"]);
          }

          return throwError( error );

        })
      );
  	}
}

