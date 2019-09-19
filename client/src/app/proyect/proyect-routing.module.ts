import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [

	{path:"list", component: ListComponent},
	{path:"detail", component: DetailComponent},
	{path:"create", component: CreateComponent},
	{path:"update", component: UpdateComponent},
	{path: '**', component: ListComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectRoutingModule { }
