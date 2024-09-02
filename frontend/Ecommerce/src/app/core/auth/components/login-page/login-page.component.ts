import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Authenticated } from '../../models/authenticated.model';
import { Login } from '../../models/login.model';
import { Token, UserRole } from '../../models/token.model';
import { AuthUtilsService } from '../../services/auth-utils.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})
export class LoginPageComponent{

  constructor(private loginService: LoginService, private router: Router, private authUtilsService: AuthUtilsService) { 
  }

  logIn(requestBody: Login){
    console.log("logIn()");
    this.loginService.isLoading$.next(true);
    this.loginService.logIn(requestBody).subscribe(
      {
        next: (response: Token) => {
          // Set token
          this.setToken(response);
        },
        error: (err: Error) => {
          console.error(`Error logging in: ${err.message}`);
          this.loginService.isLoading$.next(false);
        },
        complete: () => { }
      }
    );
  }

  async setToken(tokenResponse: Token) {
    console.log("setToken()");
    this.loginService.isLoading$.next(true);
    this.loginService.setToken(tokenResponse.token).subscribe({
      next: (response: HttpResponse<Authenticated>) => {
        console.log("setToken() - next");
        const userInfo: Token = {
          userId: tokenResponse.userId,
          userName: tokenResponse.userName,
          firstName: tokenResponse.firstName,
          lastName: tokenResponse.lastName,
          email: tokenResponse.email,
          expiration: tokenResponse.expiration,
          validity: tokenResponse.validity,
          refreshToken: "",
          token: "",
          role: tokenResponse.role,
          welcomeMessage: tokenResponse.welcomeMessage
        }
        localStorage.setItem("user_info", JSON.stringify(userInfo));
        this.authUtilsService.navigateHome();
      },
      error: (err: Error) => {
        console.error("Error checking token cookie: ", err.message);
        this.loginService.isLoading$.next(false);
      },
      complete: () => console.log("Token cookie check complete")
    });
  }

  
}
