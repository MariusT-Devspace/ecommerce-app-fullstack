import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRole } from './core/auth/models/token.model';
import { HomePageComponent } from './home/home-page/home-page.component'
import { authGuard } from './core/auth/guards/auth.guard';
import { roleGuard } from './core/auth/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
    canActivate: [authGuard('auth/login'), roleGuard(UserRole.User, 'admin')],
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
