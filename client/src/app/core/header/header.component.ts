import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../authentication/service/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	private auth: boolean;

  constructor(	private _auth: AuthService	) {
  	this.auth = null;
  }

  ngOnInit() {
  	this.isAuth();
  }

  //Metodo para comprobar si el usuario esta autenticado
  private isAuth(){
  	this._auth.select$().subscribe(
  		response => {
  			this.auth = response;
  		}
  	)
  }
}
