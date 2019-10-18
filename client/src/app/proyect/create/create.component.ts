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
  	});

    let imgData = new FormData();
    imgData.append("uploads[]", event.images[0], event.images[0].name);
    this._proyectService.addProyect(imgData).subscribe(
      res => {  
        console.log(res);
       },
      error => { 
        console.log(error);
       }
    );

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
