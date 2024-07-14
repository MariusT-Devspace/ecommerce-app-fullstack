import { NgModule } from '@angular/core';
import { RouterModule, Routes, TitleStrategy } from '@angular/router';
import { UserRole } from './core/auth/models/token.model';
import { HomePageComponent } from './home/home-page/home-page.component'
import { authGuard } from './core/auth/guards/auth.guard';
import { roleGuard } from './core/auth/guards/role.guard';
import { MatNavigationComponent } from './core/mat-navigation/mat-navigation.component';
import { ProductsListComponent } from './home/home-page/products-list/products-list.component';
import { CustomTitleStrategy } from './strategies/custom-title-strategy';

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
        path: 'c',
        children: [
          {
            path: ':category',
            component: ProductsListComponent
          }
        ]
      },
      {
        path: '',
        pathMatch: 'full',
        component: HomePageComponent,
        title: 'Home'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: TitleStrategy,
      useClass: CustomTitleStrategy
    }
  ]
})
export class AppRoutingModule { }
