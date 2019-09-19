import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
	public title: string;

  constructor() {
  	this.title = "Registrate";
  }

  ngOnInit() {
  }

  //Funsion para capturar el los datos del componente hijo del formulario
  public captureForm(event){
  	console.log(event);
  }
}
