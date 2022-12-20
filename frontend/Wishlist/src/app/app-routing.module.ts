import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/home-page/home-page.component';

const routes: Routes = [
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then(m =>
        m.AdminModule)
  },
  {
    path: "signup",
    loadChildren: () =>
      import("./auth/auth.module").then(m =>
      m.AuthModule)
  },
  {
    path: "login",
    loadChildren: () =>
      import("./auth/auth.module").then(m =>
      m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
