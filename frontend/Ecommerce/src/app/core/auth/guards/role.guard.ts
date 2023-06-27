import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { UserRole } from '../models/token.model';


export function roleGuard(role: UserRole, redirectRoute: string): CanActivateFn  {
  return () => {
      return inject(LoginService).userRole === role
        ? true
        : inject(Router).createUrlTree([redirectRoute]);
  }
  
}
