import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, AbstractControl, Validators, FormGroup } from '@angular/forms';
import { Proyect } from '../../models/proyect';

@Component({
  selector: 'app-proyect-form',
  templateUrl: './proyect-form.component.html',
  styleUrls: ['./proyect-form.component.css']
})
export class ProyectFormComponent implements OnInit {
	private proyectForm: FormGroup;
  private imgData: any;

	@Input() error: string;
	@Input() proyect: Proyect;
	@Output() formData = new EventEmitter();

  constructor(	private _fomrBuilder: FormBuilder	) { }

  ngOnInit() {
  	this.buildForm(this.proyect);
  }

  //Funsion para construir el formulario
  private buildForm(data: Proyect){
  	if(!data){
  		data = {
  			name: "",
  			category: "",
  			description: "",
  			images: "",
  			url: "",
  			git: "",
  			date: "",
  			_id: ""
  		};
  	}
  	this.proyectForm = this._fomrBuilder.group({
  			name: [data.name, [Validators.required]],
  			category: [data.category, [Validators.required]],
  			description: [data.description, [Validators.required]],
  			images: data.images,
  			url: data.url,
  			git: data.git
  	});
  }

  //Funsion para validar los campos del formulario
  private validateControl(formControl: string): string{
  	let control = this.proyectForm.get(formControl);
  	let error: string = "";
  	if(control.errors && control.touched){
  		error = "El campo es requerido";
  	}
  	return error;
  }

  // Funsion para enviar los datos al componente padre
  private onSubmit(form, event){
  	form.name = form.name.toLowerCase();
  	form.description = form.description.toLowerCase();
  	form.category = form.category.toLowerCase();
  	form.url = form.url.toLowerCase();
  	form.git = form.git.toLowerCase();
    form.images = this.imgData;
  	console.log(form);
  	this.formData.emit(form);
  }


  //Funsion para obtener los datos de las imagenes cargadas para la pagina
  private changeImg(imgData){
    console.log(imgData);
    let data = imgData.target.files;
    this.imgData = data;
  }

}
