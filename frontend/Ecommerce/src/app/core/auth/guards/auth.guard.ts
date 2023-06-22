import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.loginService.isLoggedIn){
        console.log("AuthGuard - is logged in");
        console.log("AuthGuard - isLoggedIn: ", this.loginService.isLoggedIn);
        return true;
      } else {
        console.log("AuthGuard - is not logged in");
        console.log("AuthGuard - isLoggedIn: ", this.loginService.isLoggedIn);
        this.router.navigate(['/login']);
        return false;
      }
  }
  
}
