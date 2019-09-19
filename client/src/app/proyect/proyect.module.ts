import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProyectRoutingModule } from './proyect-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ListComponent, DetailComponent, CreateComponent, UpdateComponent],
  imports: [
    CommonModule,
    ProyectRoutingModule,
    SharedModule
  ]
})
export class ProyectModule { }
