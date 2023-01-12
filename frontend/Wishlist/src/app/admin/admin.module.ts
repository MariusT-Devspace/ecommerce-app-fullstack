import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { ProductsListComponent } from './admin-home-page/products-list/products-list.component';
import { MaterialTableComponent } from './admin-home-page/products-list/material-table/material-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from '../shared/shared.module';
import { AddProductDialogComponent } from './admin-home-page/products-list/add-product-dialog/add-product-dialog.component';


@NgModule({
  declarations: [
    AdminHomePageComponent,
    ProductsListComponent,
    MaterialTableComponent,
    AddProductDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    SharedModule
  ]
})
export class AdminModule { }
