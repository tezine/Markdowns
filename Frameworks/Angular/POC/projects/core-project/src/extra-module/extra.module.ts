import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraComponent } from './pages/extra/extra.component';
import {ExtraRoutingModule} from "./extra-routing.module";


@NgModule({
  declarations: [ExtraComponent],
  imports: [
    CommonModule,
      ExtraRoutingModule
  ],
  bootstrap:[]
})
export class ExtraModule { }
