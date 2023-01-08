import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IAuthenticated } from '../../models/authenticated.model';
import { ILogin } from '../../models/login.model';
import { IToken } from '../../models/token.model';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})
export class LoginPageComponent{

  constructor(private loginService: LoginService, private router: Router) {}

  logIn(requestBody: ILogin){
    console.log("logIn()");
    this.loginService.logIn(requestBody).subscribe(
      {
        next: async (response: IToken) => {
          console.log("logIn() - next");
          // Set token
          console.log("Login data: ", requestBody);
          this.setToken(response.token);
        },
        error: (err: Error) => console.error(`Error logging in: ${err.message}`),
        complete: () => {}
      }
    );
  }

  setToken(token: string) {
    this.loginService.setToken(token).subscribe({
      next: (response: HttpResponse<IAuthenticated>) => {
        this.navigateToHome()
      },
      error: (err: Error) => console.error("Error checking token cookie: ", err.message),
      complete: () => console.log("Token cookie check complete")
    });
  }

  navigateToHome() {
    console.log("navigateToHome()");
    this.loginService.checkTokenCookie().subscribe({
      next: (response: HttpResponse<IAuthenticated>) => {
        console.log("navigateToHome() - next");
        // Check token
        this.loginService.isLoggedIn = response.body?.authenticated;
        const isLoggedIn = response.body?.authenticated;
        console.log("authenticated: ", response.body?.authenticated)
        console.log("isLoggedIn: ", isLoggedIn);
        if (this.loginService.isLoggedIn === true) {
          console.log("You are logged in");
          this.router.navigate(['']);
        }
        else {
          console.log("Could not log in");
        }
      },
      error: (err: Error) => console.error("Error checking token cookie: ", err.message),
      complete: () => console.log("Token cookie check complete")
    });
  }
}
