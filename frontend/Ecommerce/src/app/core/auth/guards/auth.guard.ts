import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export function authGuard(redirectRoute: string): CanActivateFn {
  return () => {
    const loginService = inject(LoginService)
    if (loginService.isLoggedIn){
      console.log("AuthGuard - is logged in");
      console.log("AuthGuard - isLoggedIn: ", loginService.isLoggedIn);
      return true;
    } else {
      console.log("AuthGuard - is not logged in");
      console.log("AuthGuard - isLoggedIn: ", loginService.isLoggedIn);
      return inject(Router).createUrlTree([redirectRoute]);
    }
  }
}



