import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	private token: string;
	private isAuth$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  //Funsion que actualiza el estatus de autentificacion
  public dispatch(res){
  	let newToken = res;			//.split(' ')[1];
  	if(!newToken || newToken.length < 1 || newToken == null){
  		this.token = null;
  		this.isAuth$.next(false);
  	}else{
  		this.token = newToken;
  		this.isAuth$.next(true);
  	}
  }

  //Funsion que retorna el estatus de autentificacion
  public select$ = () => this.isAuth$.asObservable();
}
