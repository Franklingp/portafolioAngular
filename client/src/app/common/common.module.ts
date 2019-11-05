import { NgModule } from '@angular/core';
import { CommonRoutingModule } from './common-routing.module';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [HomeComponent, AboutComponent],
  imports: [
    CommonRoutingModule
  ],
  exports: [ ],
})
export class CommonModule { }
