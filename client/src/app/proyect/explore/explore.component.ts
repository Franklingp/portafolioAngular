import { Component, OnInit } from '@angular/core';
import { ProyectService } from '../service/proyect.service';
import { Proyect } from '../../models/proyect';
import { AuthService } from '../../authentication/service/auth.service'; 

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})

export class ExploreComponent implements OnInit {
	public proyects: [Proyect];
	public columns: [any];
  private Auth: boolean;

  constructor(	private _productService: ProyectService,
                private _authService: AuthService	) {
  	this.proyects = [{name: "",
					category: "",
					description: "",
					images: "",
					date: "",
					url: "",
					git: "",
					_id: ""
	   }];
	   this.columns = null;
     this.Auth = null;
  }

  ngOnInit() {
  	this.getProyects();
    this.isAuth();
  }

  //Funsion para obtener el listado de poryectos del servidor
  // Para poder maquetar comodamente la estructura en la vista debo hacer arrays de 2 dimsensiones 
  // donde por cada dimension (columna) tenga 3 elementos (elementos)
  public getProyects(){
  	this._productService.getProyect().subscribe(
  		response => {
  			let aux: [Proyect] = [{name: "",
					category: "",
					description: "",
					images: "",
					date: "",
					url: "",
					git: "",
					_id: ""
			}];
  			this.columns = [""];

  			// Ojo a ver si esto es necesario
  			for(let index in response.Proyect){
  				this.proyects[index] = response.Proyect[index];
  			}

        console.log(this.proyects);

  			let counter = 0;
  			for(let i = 0; i < Math.floor(this.proyects.length / 3) + 1; i++){
  				console.log("padre");
          if(counter == this.proyects.length){
              break;
            }

  				for(let j = 0; j < 3; j++){
  					if(counter == this.proyects.length){
  						break;
  					}
  					aux[j] = this.proyects[counter];
  					counter++;
  					console.log("hijo");
  					console.log(counter);
  				}
  				this.columns[i] = aux;
  				aux = [{name: "",
					category: "",
					description: "",
					images: "",
					date: "",
					url: "",
					git: "",
					_id: ""
				}];;
  			}

  			//console.log(this.proyects);
  			console.log(this.columns);

  		},
  		error => {
  			console.log(<any>error);
  			alert(error.message);
  		}
  	);
  }

  //Metodo que reconoce si el usuario esta autenticado
  private isAuth(){
    this._authService.select$().subscribe(bool => { this.Auth = bool; });
    console.log(this.Auth);
  }

}
