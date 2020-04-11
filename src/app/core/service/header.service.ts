import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
	public colorClass$ = new BehaviorSubject<string>("home");

  constructor() { }

  //Este servicio actualiza un observable segun donde se encuentre el usuario para actualizar el
  //color y el estilo de el Header

  //Metodo para actualizar el valor
  public dispatch(data: string){
  	this.colorClass$.next(data);
  }

  //Metodo para obtener el valor desde fuera
  public select$= () =>  this.colorClass$.asObservable();
}
