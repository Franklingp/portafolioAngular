import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProyectRoutingModule } from './proyect-routing.module';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { ExploreComponent } from './explore/explore.component';


import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DetailComponent, CreateComponent, UpdateComponent, ExploreComponent],
  imports: [
    CommonModule,
    ProyectRoutingModule,
    SharedModule
  ]
})
export class ProyectModule { }
