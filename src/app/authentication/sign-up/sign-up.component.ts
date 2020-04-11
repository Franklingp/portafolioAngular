import { Component, OnInit} from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
	public title: string;
  public errorForm: string;

  constructor(   private _http: HttpClient,
                 private _authService: AuthService,
                 private _router: Router ) {
  	this.title = "Registrate";
    this.errorForm = "";
  }

  ngOnInit() {
  }

  //Funsion para capturar el los datos del componente hijo del formulario
  public captureForm(event){
    this._http.post("http://localhost:3700/api/user/singUp", event).subscribe(
      response => {
        alert("Se ha registrado exitosamente");
        this._router.navigate(['/log-in']);
      },
      error => {
        console.log(<any>error);
        alert(error.error.message);
        if(error.status == 400){
          this.errorForm = error.error.message;
        }
      }
    );
  }
}
