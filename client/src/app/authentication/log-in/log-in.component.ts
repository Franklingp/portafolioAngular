import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
	public title: string;
  public logIn: FormGroup;

  constructor( private fromBuilder: FormBuilder) {
  	this.title = 'Iniciar Sesion';
  }

  ngOnInit() {
    this.buildForm();
  }

  //Constructor del formulario con formularios reactivos
  private buildForm(){
    this.logIn = this.fromBuilder.group({
      email: ["" ,[Validators.email, Validators.required]], //email.toLowerCase,  email.toLowerCase(), 
      password: ["", [Validators.required]],
      check: false
    });
  }

  //Funsion para obtener el error en un formulario y avisar al usuario
  public getError(formControl: string): string{
    let error: string = '';
    const control = this.logIn.get(formControl);
    if(control.touched && control.errors != null){
      if(control.errors.email){
        error = "El email debe ser valido";
      }
      if(control.errors.required){
        error = "El campo es requerido";
      }
    }
    return error;
  }

  //Funsion que se ejecuta al hacer submit en el formulario de inicio de Sesion
  public onSubmit(form: any){
    console.log(form);
  }
}
