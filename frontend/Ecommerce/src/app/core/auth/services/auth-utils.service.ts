import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Authenticated } from '../models/authenticated.model';
import { UserRole } from '../models/token.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthUtilsService {

  constructor(private loginService: LoginService, 
    private router: Router, private activatedRoute: ActivatedRoute) { }

  navigateToHome() {
    console.log("navigateToHome()");
    this.loginService.checkTokenCookie().subscribe({
      next: (response: HttpResponse<Authenticated>) => {
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
            this.router.navigate(['../admin'], {relativeTo: this.activatedRoute});
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
