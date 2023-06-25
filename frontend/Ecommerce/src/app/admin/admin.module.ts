import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from '../shared/shared.module';
import { ProductsManagementPageComponent } from './admin-home-page/products-management-page/products-management-page.component';
import { AddProductDialogComponent } from './admin-home-page/products-management-page/products-list/add-product-dialog/add-product-dialog.component';
import { ProductsMaterialTableComponent } from './admin-home-page/products-management-page/products-list/material-table/products-material-table.component';
import { ProductsListComponent } from './admin-home-page/products-management-page/products-list/products-list.component';
import { CategoriesListComponent } from './admin-home-page/products-management-page/categories-list/categories-list.component';
import { CategoriesMaterialTableComponent } from './admin-home-page/products-management-page/categories-list/material-table/categories-material-table.component';
import { MoreButtonComponent } from './admin-home-page/products-management-page/more-button/more-button.component';
import { ProductDetailDialogComponent } from './admin-home-page/products-management-page/products-list/product-detail-dialog/product-detail-dialog.component';
import { EditButtonComponent } from './admin-home-page/products-management-page/edit-button/edit-button.component';
import { CategoriesListCardComponent } from './admin-home-page/products-management-page/categories-list-card/categories-list-card.component';


@NgModule({
  declarations: [
    AdminHomePageComponent,
    ProductsListComponent,
    ProductsMaterialTableComponent,
    AddProductDialogComponent,
    ProductsManagementPageComponent,
    CategoriesListComponent,
    CategoriesMaterialTableComponent,
    MoreButtonComponent,
    ProductDetailDialogComponent,
    EditButtonComponent,
    CategoriesListCardComponent
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
