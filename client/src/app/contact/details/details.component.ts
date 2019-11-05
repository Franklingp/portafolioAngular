import { Component, OnInit } from '@angular/core';
import { ContactService } from '../service/contact.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
	private message: any;
	private id: string;

  constructor(	private _contactService: ContactService,
  				private _route: ActivatedRoute	) {
  	this.id = null;
  	this.message = null;
  }

  ngOnInit() {
  	this.getId();
  	console.log(this.id);
  	//this.getMessage();
  }

  //Metodo para obtener el id del url de la pagina
  private getId(){
  	this._route.params.subscribe(
  		params => {
  			this.id = params.id
  			this.getOne(this.id);
  		} 
  	);
  }

  //Metodo para obtener el mensaje especifico del id
  private getOne(id){
  	this._contactService.getMessage(id).subscribe(
  		(res: any) => {
  			this.message = res.Message;
  			console.log(this.message);
  		},
  		error => {
  			console.log(<any>error);
  			alert(error.message);
  		}
  	);
  }

}
