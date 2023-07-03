import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from '../shared/shared.module';
import { ProductsManagementPageComponent } from './admin-page/products-management-page/products-management-page.component';
import { AddProductDialogComponent } from './admin-page/products-management-page/products-list/add-product-dialog/add-product-dialog.component';
import { ProductsMaterialTableComponent } from './admin-page/products-management-page/products-list/material-table/products-material-table.component';
import { ProductsListComponent } from './admin-page/products-management-page/products-list/products-list.component';
import { CategoriesListComponent } from './admin-page/products-management-page/categories-list/categories-list.component';
import { CategoriesMaterialTableComponent } from './admin-page/products-management-page/categories-list/material-table/categories-material-table.component';
import { MoreButtonComponent } from './admin-page/products-management-page/more-button/more-button.component';
import { ProductDetailDialogComponent } from './admin-page/products-management-page/products-list/product-detail-dialog/product-detail-dialog.component';
import { EditButtonComponent } from './admin-page/products-management-page/edit-button/edit-button.component';
import { CategoriesListCardComponent } from './admin-page/products-management-page/categories-list-card/categories-list-card.component';
import { NewCategoryButtonComponent } from './admin-page/products-management-page/categories-list-card/new-category-button/new-category-button.component';
import { AddImageButtonComponent } from './admin-page/products-management-page/categories-list-card/done-button/add-image-button.component';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AdminPageComponent,
    ProductsListComponent,
    ProductsMaterialTableComponent,
    AddProductDialogComponent,
    ProductsManagementPageComponent,
    CategoriesListComponent,
    CategoriesMaterialTableComponent,
    MoreButtonComponent,
    ProductDetailDialogComponent,
    EditButtonComponent,
    CategoriesListCardComponent,
    NewCategoryButtonComponent,
    AddImageButtonComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    SharedModule,
    MatTooltipModule
  ]
})
export class AdminModule { }
