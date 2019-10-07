import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExploreComponent } from './explore/explore.component';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [

	{path:"explore", component: ExploreComponent},
	{path:"detail/:id", component: DetailComponent},
	{path:"create", component: CreateComponent},
	{path:"update", component: UpdateComponent},
	{path: '**', component: ExploreComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectRoutingModule { }
