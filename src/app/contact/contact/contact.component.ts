import { Component, OnInit } from '@angular/core';
import { ContactService } from "../service/contact.service";
import { FormBuilder, AbstractControl, Validators, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
	private contactForm: FormGroup;

  constructor(	private _contactService: ContactService,
  				private _formBuilder: FormBuilder,
  				private _router: Router	) { }

  ngOnInit() {
  	this.bluildForm();
  }

  //Metodo para crear el formulario reactivo
  private bluildForm(){
  	const form = {
  		name: "",
  		message: "",
  		email: ""
  	}
  	this.contactForm = this._formBuilder.group({
  		name: [form.name, [Validators.required]],
  		email: [form.email, [Validators.required, Validators.email]],
  		message: [form.name, [Validators.required]]
  	});
  }

  //Catch error in form
  private catchError(control: string): string{
  	let formControl = this.contactForm.get(control);
  	let error: string = null;
  	if(formControl.errors && formControl.touched){
  		 return error = "Debe introducir un valor valido para poder continuar";
  	}
  }

  private onSubmit(form){
  	console.log(form);
  	//debugger;
  	this._contactService.addMessage(form).subscribe(
  		response => {
  			console.log(response);
  			alert("Se ha enviado el mensaje exitosamente, gracias por contactar con nosotros");
  			this._router.navigate(["/"]);
		},
		error => {
			console.log(<any>error);
			alert(error.message);
		}
  	);
  }
}
