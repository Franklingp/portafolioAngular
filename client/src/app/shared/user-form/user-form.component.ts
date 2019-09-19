import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
	private  userForm: FormGroup;

	@Input() title: string;
	@Output() formValue = new EventEmitter();


  constructor( private formBuilder: FormBuilder ) { }

  ngOnInit() {
  	this.buildForm();
  }

  //Funsion para crear el formulario reactivo
  private buildForm(){
  	this.userForm = this.formBuilder.group({
  		name:["", [Validators.required]],
  		surname: ["", [Validators.required]],
  		email: ["", [Validators.required, Validators.email]],
  		password:["", [Validators.required]]
  	})
  }

  //Funsion para validar el forulari reactivo
  private getError(formControl: string){
  	let error: string = "";
  	const control = this.userForm.get(formControl);
  	if(control.errors != null && control.touched){
  		if(control.errors.email){
  			error = 'El email introducido debe ser valido';
  		}
  		if(control.errors.required){
  			error = 'El campo es requirido';
  		}
  	}
  	return error
  }

  //Funsion de submit del formulario para mandar el contenido al componente padre
  private onSubmit(form, event){
    form.name = form.name.toLowerCase();
    form.surname = form.surname.toLowerCase();
    form.email = form.email.toLowerCase();
  	this.formValue.emit(form);
  }
}
