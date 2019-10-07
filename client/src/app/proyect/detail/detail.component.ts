import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProyectService } from '../service/proyect.service';
import { Proyect } from '../../models/proyect';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
	public id: string;
	public proyect: Proyect;

  constructor(	private _route: ActivatedRoute,
  				private _proyectService: ProyectService  ) { }

  ngOnInit() {
  	this.getId();
  	this.getProyect();
  }

  //Funsion para obtener el id del proyecto por url 
  public getId(){
  	this._route.params.subscribe(
  		param => {
  			this.id = param.id;
  		}
  	);
  }

  //Funsion para obtener el proyecto del servidor
  public getProyect(){
  	this._proyectService.getOne(this.id).subscribe(
  		response => {
  			this.proyect = response.Proyect;
  			console.log(this.proyect);
  		},
  		error => {
  			console.log(<any>error);
  			alert(error.message);
  		}
  	);
  }
}
