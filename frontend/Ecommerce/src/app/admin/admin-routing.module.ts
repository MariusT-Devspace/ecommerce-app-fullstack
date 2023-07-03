import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRole } from '../core/auth/models/token.model';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ProductsManagementPageComponent } from './admin-page/products-management-page/products-management-page.component';
import { authGuard } from '../core/auth/guards/auth.guard';
import { roleGuard } from '../core/auth/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    canActivate: [authGuard('auth/login'), roleGuard(UserRole.Administrator, '')],
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      },
      {
        path: 'products',
        component: ProductsManagementPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
