import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/service/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
	private logIn: boolean;

  constructor( private _authService: AuthService)  {
  	this.logIn = null;
  }

  ngOnInit() {
  	this.isLog();
  }

  private isLog(){
  	this._authService.select$().subscribe( bool => { this.logIn = bool; });
  }

  private logOut(){
  	this._authService.logOut();
  	alert("Se ha cerrado sesion exitosamente");
  }
}
