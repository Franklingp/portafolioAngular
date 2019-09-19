import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from './common/common.module';

import { HomeComponent } from './common/home/home.component';
import { AboutComponent } from './common/about/about.component';
import { ContactComponent } from './common/contact/contact.component';

const routes: Routes = [

	{path: "", redirectTo: "home", pathMatch: 'full'},
	{ path: "home", component: HomeComponent },
	{ path: 'about', component: AboutComponent },
	{ path: 'contact', component: ContactComponent },

	// Lazy Loading para el modulo de autenticacion
	{
	    path: '',
	    children: [
	     {
	       path: '',
	       loadChildren: './authentication/authentication.module#AuthenticationModule'
	     }
	    ]
  	},

  	// Lazy Loading para el modulo de proyectos
  	{
  		path: 'proyect',
  		children:[
  			{
  				path: "",
  				loadChildren: './proyect/proyect.module#ProyectModule'
  			}
  		]
  	},

	{ path: '**', component: HomeComponent }
	
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
