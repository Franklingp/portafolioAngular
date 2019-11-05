import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { GlobalSettings } from '../../global/global-settings';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
	private headers: HttpHeaders;
	private url: string;

  constructor(	private _http: HttpClient	) { 
  	this.headers = new HttpHeaders().set("Content-Type", "json/application");
  	this.url = GlobalSettings.urlApi+"/contact";
  }

  //Metodo de prueba
  test(): Observable<any>{
  	return this._http.get(this.url+"/test", {headers: this.headers});
  }

  //Metodo para agregar un nuevo comentario
  addMessage(form): Observable<any>{
  	return this._http.post(this.url+"/add", form);
  }

  //Metodo para obtener los comentarios del servidor
  getMessage(id){
 	console.log(id);
  	if(!id){
  		return this._http.get(this.url+"/get", {headers: this.headers});
  	}else{
  		console.log("else");
  		return this._http.get(this.url+"/get/"+id, {headers: this.headers});
  	}
  }
}
