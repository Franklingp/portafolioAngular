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
  private imgUploaded: boolean;

	@Input() error: string;
	@Input() proyect: Proyect;
	@Output() formData = new EventEmitter();

  constructor(	private _fomrBuilder: FormBuilder	) {
    this.imgData = null;
    this.imgUploaded = false;
  }

  ngOnInit() {
    this.checkProyect(this.proyect);
  }

  //Funsion para construir el formulario
  private buildForm(data: Proyect){
  	if(!data){
  		data = {
  			name: "",
  			category: "",
  			description: "",
  			images: null,
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
    //debugger;
    console.log(form);
    console.log(this.imgData);
  	form.name = form.name.toLowerCase();
    form.description = form.description.toLowerCase();
    form.category = form.category.toLowerCase();
    form.url = form.url.toLowerCase();
    form.git = form.git.toLowerCase();

    if(this.imgData !== null){
     form.images = this.imgData;
    }else{
      form.images = "http://localhost:3700/images/default.jpg";
    }
    //console.log(form);
    this.formData.emit(form);
  }


  //Funsion para obtener los datos de las imagenes cargadas para la pagina
  private changeImg(imgData){
    //console.log(imgData);
    if(imgData === null){
      this.imgData = null;
      this.imgUploaded = false;
    }else{
      let data = imgData.target.files;
      if(data.length <= 1){
        let ext = data[0].name.split(".")[1];
        //console.log(ext);
        if(ext != "jpg" && ext != "jpeg" && ext != "gif" && ext != "png"){
          alert("El archivo que ha seleccionado no es una imagen valida");
          data = null;
        }
      }
      this.imgData = data;
    }
    
  }

  //Metodo para comprobar si hay un proyecto pasado por parametro o si
  //es un proyecto nuevo
  private checkProyect(data: Proyect){
    if(!data){
      this.buildForm(this.proyect);
    }else{
      if(data.images !== "http://localhost:3700/images/default.jpg" && data.images !== null){
        this.imgData = data.images;
        this.imgUploaded = true;
        //console.log(this.imgData);
      }
      data.images = null;
      this.buildForm(data);
    }
  }

}
