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
  public formSuccess: boolean;
  public imgSuccess: boolean;

  constructor(	private _proyectService: ProyectService,
                private _auth: AuthService,
                private _router: Router	) {
    this.formSuccess = null;
    this.imgSuccess = null;
  }

  ngOnInit() {
    this.isAuth();
  }

  //Funsion para obtener los datos del fomulario y enviarlos al servidor
  onSubmit(event){
    let idProyect: string = null;
  	//console.log(event);
    if(!this.formSuccess || this.formSuccess == null){
      this._proyectService.addProyect(event).subscribe(
        response => {
          console.log(response);
          idProyect = response.Proyect._id;
          this.formSuccess = true;
          if(event.images !== "http://localhost:3700/images/default.jpg"){
            this.uploadImage(event.images[0], idProyect);
          }
          if(this.formSuccess){
            alert('Se ha agregado el nuevo proyecto exitosamente');
            if(!this.imgSuccess){
              alert("No se ha podido guardar una imagen personalizada para este proyecto por ello se asignara la imagen predefinida");
            }
            this._router.navigate(["/proyect/explore"]);
          }
        }, 
        error => {
          console.log(<any>error);
          if(error.status == 403){
            alert("Debe estar registrado para poder agregar nuevos proyectos");
            this._router.navigate(["/log-in"]);
          }else{
            alert(error.message);
          }
          this.formSuccess = false;
      });
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

  //Seccion donde subo las imagenes al servidor
  private uploadImage(data, id){
    console.log(id);
      if(data){
        let imgData = new FormData();
        imgData.set('image', data);
        this._proyectService.uploadImage(imgData, id).subscribe(
          res => {  
            console.log(res);
            this.imgSuccess = true;
           },
          error => { 
            console.log(<any>error);
            alert(error.message);
            this.imgSuccess = false;
           }
        );
      }
  }

}
