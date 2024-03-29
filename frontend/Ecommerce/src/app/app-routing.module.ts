import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRole } from './core/auth/models/token.model';
import { HomePageComponent } from './home/home-page/home-page.component'
import { authGuard } from './core/auth/guards/auth.guard';
import { roleGuard } from './core/auth/guards/role.guard';
import { MatNavigationComponent } from './core/mat-navigation/mat-navigation.component';

const routes: Routes = [
  {
    path: '',
    component: MatNavigationComponent,
    children: [
      {
        path: 'admin',
        canActivate: [authGuard('auth/login'), roleGuard(UserRole.Administrator, '')],
        loadChildren: () =>
          import("./admin/admin.module").then(m =>
            m.AdminModule)
      },
      {
        path: '',
        pathMatch: 'full',
        component: HomePageComponent,
      }
    ]
  }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
