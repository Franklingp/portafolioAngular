import { Component, OnInit } from '@angular/core';
import { AuthService } from './authentication/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	constructor(	private _authService: AuthService 	){}

	ngOnInit(){
		//La siguiente funsion sirve para verificar si el usuario esta registrado
		//aun su esta entrando nuevo en la pagina o no
		this._authService.isLog();
	}
}
