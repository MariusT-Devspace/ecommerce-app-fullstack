import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './product/product.component'
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    HomePageComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    SharedModule
  ],
  exports: [
    HomePageComponent,
    ProductComponent,
    SharedModule
  ]
})
export class HomeModule { }
