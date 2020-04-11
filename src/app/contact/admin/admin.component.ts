import { Component, OnInit } from '@angular/core';
import { ContactService } from '../service/contact.service';
import { AuthService } from '../../authentication/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
	private messages: any;
	private success: boolean;

  constructor(	private _contactService: ContactService,
                private _auth: AuthService,
                private _router: Router	) {
  	this.success = null;
  }

  ngOnInit() {
    this.isAuth();
  }

  //Metodo para comprobar si el usuario esta logueado
  private isAuth(){
    this._auth.select$().subscribe(
      auth => {
        if(auth === false){
          alert("No esta autenticado");
          this._router.navigate(['log-in']);
        }else{
          this.getMessages();
        }
      }
    )
  }

  //Metodo para obtener todos los mensajes de la base de datos
  private getMessages(){
  	this._contactService.getMessage(null).subscribe(
  		(response: any) => {
  			console.log(response);
  			this.messages = response.Message;
  			this.success = true;
		},
  		error => {
  			console.log(<any>error);
  			alert(error.message);
  		}
  	);
  }
}
