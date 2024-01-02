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
import { ProductsMaterialTableComponent } from './admin-page/products-management-page/products-list/products-material-table/products-material-table.component';
import { ProductsListComponent } from './admin-page/products-management-page/products-list/products-list.component';
import { ProductDetailDialogComponent } from './admin-page/products-management-page/products-list/product-detail-dialog/product-detail-dialog.component';
import { CategoriesListComponent } from './admin-page/products-management-page/categories-list/categories-list.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmDeleteCategoryDialogComponent } from './admin-page/products-management-page/categories-list/confirm-delete-category-dialog/confirm-delete-category-dialog.component';
import { UsersPageComponent } from './admin-page/users-page/users-page.component';
import { UsersListComponent } from './admin-page/users-page/users-list/users-list.component';
import { UsersMaterialTableComponent } from './admin-page/users-page/users-list/users-material-table/users-material-table.component';
import { UserDetailDialogComponent } from './admin-page/users-page/users-list/user-detail-dialog/user-detail-dialog.component';


@NgModule({
  declarations: [
    AdminPageComponent,
    ProductsListComponent,
    ProductsMaterialTableComponent,
    AddProductDialogComponent,
    ProductsManagementPageComponent,
    CategoriesListComponent,
    ProductDetailDialogComponent,
    ConfirmDeleteCategoryDialogComponent,
    UsersPageComponent,
    UsersListComponent,
    UsersMaterialTableComponent,
    UserDetailDialogComponent
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
