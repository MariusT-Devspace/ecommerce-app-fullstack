import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './core/auth/guards/role.guard';
import { UserRole } from './core/auth/models/token.model';
import { HomePageComponent } from './home/home-page/home-page.component'
import { authGuard } from './core/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
    canActivate: [authGuard('auth/login'), RoleGuard],
    data: {
      role: UserRole.User
    }
  },
  {
    path: 'admin',
    loadChildren: () =>
      import("./admin/admin.module").then(m =>
        m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
