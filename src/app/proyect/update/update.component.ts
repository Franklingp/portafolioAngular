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
  private imgData: any;
  private imgChanged: boolean;

  constructor(	private _router: Router,
  				private _proyectService: ProyectService,
  				private _route: ActivatedRoute,
  				private _auth: AuthService	) {
	this.id = null;
	this.proyect = null;
  this.imgData = null;
  this.imgChanged = null;
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
        this.imgData = this.proyect.images;
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
    let img = event.images;

    ///console.log("img: "+img);
    //console.log("proyect.images: "+this.imgData);
    if(typeof(img) !== "string"){
      //console.log(`hubo cambio`);
      this.imgChanged = true; 
      event.images = null;
      event.images = this.imgData;
    }

    console.log(event);
  	this._proyectService.update(event, this.id).subscribe(
  		response => {
  				alert("Se ha actualizado el proyecto con exito");
  				//this._router.navigate(["/proyect/detail", this.proyect._id]);
  			},
  		error => {
  			console.log(<any>error);
  			alert(error.message);
  		}
  	);

    if(this.imgChanged === true){
      this.imgData = new FormData()
      this.imgData.set("image", img[0]);
      this._proyectService.uploadImage(this.imgData, this.proyect._id).subscribe(
        response => { console.log(response) },
        error => {
          console.log(<any>error);
          alert(error.message);
        }
      )
    }

    this._router.navigate(["/proyect/detail", this.proyect._id]);
    
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
