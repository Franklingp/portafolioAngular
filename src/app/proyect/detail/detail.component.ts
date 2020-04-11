import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProyectService } from '../service/proyect.service';
import { Proyect } from '../../models/proyect';
import { AuthService } from '../../authentication/service/auth.service';
import { Router } from '@angular/router';

import { HeaderService } from '../../core/service/header.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
	public id: string;
	public proyect: Proyect;
  private isAuth: boolean;

  constructor(	private _route: ActivatedRoute,
  				      private _proyectService: ProyectService,
                private _authService: AuthService,
                private _router: Router,
                private _header: HeaderService) {
    this.isAuth = null;
  }

  ngOnInit() {
    this._header.dispatch("details");
    this.getAuth();
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

  //Funsion para determinar si un usuario esta logueado
  private getAuth(){
    this._authService.select$().subscribe(
      bool => {
        this.isAuth = bool;
      }
    );
  }

  //Funsion para eliminar un proyecto
  private removeProyect(id){
    let boolean = confirm("Esta seguro que desea eliminar el proyecto "+this.proyect.name+" permanentemente?");
    if(boolean){
      this._proyectService.removeOne(id).subscribe(
        response => {
          alert('Se ha eliminado el proyecto exitosamente');
          this._router.navigate(["/proyect/explore"]);
        },
        error => {
          console.log(<any>error);
          alert(error.message);
        }
      );
    }
  }
}
