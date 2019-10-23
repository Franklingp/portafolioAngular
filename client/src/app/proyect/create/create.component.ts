import { Component, OnInit } from '@angular/core';
import { ProyectService } from '../service/proyect.service';
import { Router } from '@angular/router';
import { AuthService } from '../../authentication/service/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {

  constructor(	private _proyectService: ProyectService,
                private _auth: AuthService,
                private _router: Router	) { }

  ngOnInit() {
    this.isAuth();
  }

  //Funsion para obtener los datos del fomulario y enviarlos al servidor
  onSubmit(event){
    let errorResponse: boolean = null;
  	console.log(event);
  	this._proyectService.addProyect(event).subscribe(
  		response => {
  			console.log(response);
        alert('Se ha agregado el nuevo proyecto exitosamente');
        //this._router.navigate(["/proyect/explore"]);
  		}, 
  		error => {
  			console.log(<any>error);
        if(error.status == 403){
          alert("Debe estar registrado para poder agregar nuevos proyectos");
          this._router.navigate(["/log-in"]);
        }
        errorResponse = true;
  	});

    //Seccion donde subo las imagenes al servidor
    console.log(event.images);
    if(event.images){
      let imgData = new FormData();
      imgData.set('image', event.images[0]);
      console.log(imgData.get('image'));
      this._proyectService.uploadImage(imgData).subscribe(
        res => {  
          console.log(res);
         },
        error => { 
          console.log(<any>error);
          errorResponse = true;
         }
      );
    }
    if(errorResponse){
      alert("Ha ocurrido un error al intentar guardar el nuevo proyecto");
    }else{
      this._router.navigate(["/proyect/explore"]);
    }
  }

  //Funsion para comprobar si el usuario esta autenticado o no 
  private isAuth(){
    this._auth.select$().subscribe(
      auth => {
        if(!auth){
          alert("Debe estar autenticado para poder acceder a esta seccion");
          this._router.navigate(['/log-in']);
        }
      });
  }

}
