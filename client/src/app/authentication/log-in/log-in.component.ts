import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css', '../sign-up/sign-up.component.css', '../../shared/user-form/user-form.component.css']
})
export class LogInComponent implements OnInit {
	public title: string;
  private logIn: FormGroup;
  public invalidForm: boolean;

  constructor( private fromBuilder: FormBuilder,
               private _authService: AuthService,
               private _http: HttpClient,
               private _router: Router) {
  	this.title = 'Iniciar Sesion';
    this.invalidForm = false;
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
    this._http.post<string>("http://localhost:3700/api/user/singIn", form)
        .subscribe(
          response => {
            let res: any;
            res = response;
            this._authService.dispatch(res.token);
            alert(res.message);
            this._router.navigate(["/home"]);
          }, 
          error => {
            console.log(<any>error);
            if(error.status == 403 || error.status == 404){
              alert('No se ha podido iniciar sesion, email o contraseña invalido');
              this.invalidForm = true;
            }
          });
  }
}
