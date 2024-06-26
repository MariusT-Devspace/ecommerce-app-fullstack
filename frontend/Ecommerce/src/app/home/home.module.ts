import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './home-page/product/product.component'
import { MatButtonModule } from '@angular/material/button';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ProductsListComponent } from './home-page/products-list/products-list.component';

@NgModule({ declarations: [
        HomePageComponent,
        ProductsListComponent,
        ProductComponent
    ],
    exports: [
        HomePageComponent,
        SharedModule
    ], imports: [CommonModule,
        HomeRoutingModule,
        MatButtonModule,
        SharedModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class HomeModule { }
