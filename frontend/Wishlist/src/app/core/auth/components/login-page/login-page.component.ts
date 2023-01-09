import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IAuthenticated } from '../../models/authenticated.model';
import { ILogin } from '../../models/login.model';
import { IToken, UserRole } from '../../models/token.model';
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
    this.loginService.isLoading$.next(true);
    this.loginService.logIn(requestBody).subscribe(
      {
        next: async (response: IToken) => {
          console.log("logIn() - next");
          // Set token
          console.log("Login data: ", requestBody);
          await this.setToken(response.token);
          const userInfo: IToken = {
            userId: response.userId,
            userName: response.userName,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            expiration: response.expiration,
            validity: response.validity,
            refreshToken: "",
            token: "",
            role: response.role,
            welcomeMessage: response.welcomeMessage
          }
          localStorage.setItem("user_info", JSON.stringify(userInfo));
        },
        error: (err: Error) => {
          console.error(`Error logging in: ${err.message}`);
          this.loginService.isLoading$.next(false);
        },
        complete: () => { }
      }
    );
  }

  async setToken(token: string) {
    this.loginService.setToken(token).subscribe({
      next: (response: HttpResponse<IAuthenticated>) => {
        this.navigateToHome()
      },
      error: (err: Error) => {
        console.error("Error checking token cookie: ", err.message);
        this.loginService.isLoading$.next(false);
      },
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
          this.loginService.userRole = JSON.parse(localStorage.getItem("user_info")!).role as UserRole
          if (this.loginService.userRole == UserRole.Administrator)
            this.router.navigate(['admin']);
          else
            this.router.navigate(['']);
        }
        else {
          console.log("Could not log in");
        }
      },
      error: (err: Error) => console.error("Error checking token cookie: ", err.message),
      complete: () => {
        console.log("Token cookie check complete");
        this.loginService.isLoading$.next(false);
      }
    });
  }
}
