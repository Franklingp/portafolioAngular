import { Component, OnInit } from '@angular/core';
import { ProyectService } from '../service/proyect.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {

  constructor(	private _privateService: ProyectService,
                private _router: Router	) { }

  ngOnInit() {
  }

  //Funsion para obtener los datos del fomulario y enviarlos al servidor
  onSubmit(event){
  	console.log(event);
  	this._privateService.addProyect(event).subscribe(
  		response => {
  			console.log(response);


            //Aqui debe ir el codigo de guardado para agregar un nuevo proyecto


  		}, 
  		error => {
  			console.log(<any>error);
        if(error.status == 403){
          alert("Debe estar registrado para poder agregar nuevos proyectos");
          this._router.navigate(["/log-in"]);
        }
  	});
  }

}
