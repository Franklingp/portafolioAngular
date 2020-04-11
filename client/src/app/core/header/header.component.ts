import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../authentication/service/auth.service";
import { HeaderService } from "../service/header.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	private auth: boolean;
  public styleActive: string;

  constructor(	private _auth: AuthService,
                private _HeaderService: HeaderService) {
  	this.auth = null;
  }

  ngOnInit() {
  	this.isAuth();
    this.backgroundColor();
  }

  //Metodo para comprobar si el usuario esta autenticado
  private isAuth(){
  	this._auth.select$().subscribe(
  		response => {
  			this.auth = response;
  		}
  	)
  }

  //Funsion que retorna un string que indica el color del navbar segun donde este la persona
  private backgroundColor(){
    this._HeaderService.select$().subscribe(
      (style: string) => {
        this.styleActive = style;
      }
    );
  }
}
