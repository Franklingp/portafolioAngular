import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { SharedRoutingModule } from './shared-routing.module';
import { UserFormComponent } from './user-form/user-form.component';
import { ProyectFormComponent } from './proyect-form/proyect-form.component';

@NgModule({
  declarations: [UserFormComponent, ProyectFormComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
  	UserFormComponent, ProyectFormComponent
  ]
})
export class SharedModule { }
