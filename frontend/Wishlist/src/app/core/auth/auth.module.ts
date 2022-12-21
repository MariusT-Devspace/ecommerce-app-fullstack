import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { LoginPageComponent } from './login-page/login-page.component';



@NgModule({
  declarations: [
    SignUpPageComponent,
    LoginPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
