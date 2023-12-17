import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ProductsManagementPageComponent } from './admin-page/products-management-page/products-management-page.component';
import { UsersPageComponent } from './admin-page/users-page/users-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      {
        path: 'products',
        component: ProductsManagementPageComponent
      },
      {
        path: 'users',
        component: UsersPageComponent
      },
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
