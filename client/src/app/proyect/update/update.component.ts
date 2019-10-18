import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ProyectService } from '../service/proyect.service';
import { Proyect } from '../../models/proyect';
import { AuthService } from '../../authentication/service/auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
	private id: string;
	private proyect: Proyect;

  constructor(	private _router: Router,
  				private _proyectService: ProyectService,
  				private _route: ActivatedRoute,
  				private _auth: AuthService	) {
	this.id = null;
	this.proyect = null;
	}

  ngOnInit() {
  	this.isAuth();
  	this.getId();
  	this.getProyect();
  }

  //Funsion para obtener un proyecto actualizado de la base de datos
  private getProyect(){
  	this._proyectService.getOne(this.id).subscribe(
  		response => {
  			this.proyect = response.Proyect;
  		},
  		error => {
  			console.log(<any>error);
  			alert(error.message);
  		}
  	);
  }

  //Funsin para obtener el id de la url 
  private getId(){
  	this._route.params.subscribe(
  		params => { this.id = params.id }
  	);
  }

  //Funsion para actualizar el proyecto 
  onSubmit(event){
  	console.log(event);
  	this._proyectService.update(event, this.id).subscribe(
  		response => {
  				console.log(response);
  				alert("Se ha actualizado el proyecto con exito");
  				this._router.navigate(["/proyect/detail", this.proyect._id]);
  			},
  		error => {
  			console.log(<any>error);
  			alert(error.message);
  		}
  	);
  }

  //Funsion para comprobar si el usuario esta logueado
  private isAuth(){
  	this._auth.select$().subscribe(
  		auth => {
  			if(!auth){
  				alert('Debe estar autenticado para continuar');
  				this._router.navigate(["/log-in"]);
  			}
  		}
  	);
  }
}
