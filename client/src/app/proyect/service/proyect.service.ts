import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GlobalSettings } from '../../global/global-settings';

@Injectable({
  providedIn: 'root'
})
export class ProyectService {
	public url: string;

  constructor(	private _http: HttpClient	) {
  	//this.url = GlobalSettings.urlApi+"proyect";
    this.url = "http://localhost:3700/api/proyect";
  }

  //Funsion para agregar un nuevo proyecto al servidor
  addProyect(proyect): Observable<any>{
  	let headers = new HttpHeaders().set("Content-Type", "application/json");
  	return this._http.post(this.url+'/add', proyect, {headers: headers});
  }

  //Funsion para obtener el listado de proyectos completo del servidor
  getProyect(): Observable<any>{
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.get(this.url+"/get", {headers:headers});
  }

  //Funsion para obtener un solo proyecto en especifico
  getOne(id): Observable<any>{
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.get(this.url+'/get/'+id, {headers: headers});
  }

  //Funsion para eliminar un proyecto de la base de datos
  removeOne(id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url+'/remove/'+id, {headers: headers});
  }

  //Funsion para actualizar un proyecto en la base de datos
  update(proyect, id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url+'/update/'+id, proyect, {headers: headers});
  }

  //Metodo para subir una imagen a la base de datos
  uploadImage(data){
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.post(this.url+'/uploadImage', { file: data, name: 'images'}, {headers: headers});
/*
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const formData = new FormData(); 
    formData.append('images', data, data.name); 
    console.log(formData);
    return this._http.post(this.url+'/uploadImage', formData, {headers: headers});
    */
  }
}
