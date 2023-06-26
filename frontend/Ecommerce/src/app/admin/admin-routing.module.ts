import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../core/auth/guards/role.guard';
import { UserRole } from '../core/auth/models/token.model';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { ProductsManagementPageComponent } from './admin-home-page/products-management-page/products-management-page.component';
import { authGuard } from '../core/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminHomePageComponent,
    canActivate: [authGuard('auth/login'), RoleGuard],
    data: {
      role: UserRole.Administrator
    },
    children: [
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
