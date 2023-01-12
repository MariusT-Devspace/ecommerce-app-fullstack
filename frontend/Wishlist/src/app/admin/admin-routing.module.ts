import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth/guards/auth.guard';
import { RoleGuard } from '../core/auth/guards/role.guard';
import { UserRole } from '../core/auth/models/token.model';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { ProductsListComponent } from './admin-home-page/products-list/products-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminHomePageComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      role: UserRole.Administrator
    },
    children: [
      {
        path: 'products',
        component: ProductsListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
