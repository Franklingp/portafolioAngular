import { NgModule } from '@angular/core';
import { CommonRoutingModule } from './common-routing.module';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [HomeComponent, AboutComponent, ContactComponent],
  imports: [
    CommonRoutingModule
  ],
  exports: [ HomeComponent, AboutComponent, ContactComponent ],
})
export class CommonModule { }
