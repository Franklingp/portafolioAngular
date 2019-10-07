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
  //Ojo con este metodo para mas seguridad deberia comprobar el token
  //que entra en este metodo con el servidor antes de guardarlo
  //Para desloguear basta con introducir 0 en esta Funsion
  public dispatch(res){                      
   	let newToken = res;			//.split(' ')[1];
  	if(!newToken || newToken.length < 1 || newToken == null){
  		this.token = null;
      localStorage.removeItem('token');
  		this.isAuth$.next(false);
  	}else{
  		this.token = newToken;
      localStorage.setItem('token', this.token);
  		this.isAuth$.next(true);
  	}
  }

  //Funsion que retorna el estatus de autentificacion
  public select$ = () => this.isAuth$.asObservable();

  //Funsion para cerrar la sesion de un usuario
  public logOut(){
    this.dispatch(0);
  }

  //Funsion que verifica al principio de la pagina si el usuario esta logueado de antes o no
  public isLog(){
    let token = localStorage.getItem('token');
    if(token == null){
      this.dispatch(0);
    }
    else{
      this.dispatch(token);
    }
  }
}
