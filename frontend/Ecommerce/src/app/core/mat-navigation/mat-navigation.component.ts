import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from '../auth/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './mat-navigation.component.html',
  styleUrls: ['./mat-navigation.component.css']
})
export class MatNavigationComponent implements OnInit {

  _loginService: LoginService;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver, 
    private loginService: LoginService, 
    private router: Router
    ) {
    this._loginService = loginService;
  }

  ngOnInit(): void {
    console.log("Nav loaded");
    //this._loginService.isLoggedIn$.next(this._loginService.isLoggedIn);
    console.log("logged in: ", this._loginService.isLoggedIn);
  }

  logOut() {
    this._loginService.logOut().subscribe({
      next: (response) => this._loginService.isLoggedIn = false,
      error: (err: Error) => console.error("Error logging out: ", err),
      complete: () => {
        console.log("Logout complete");
        this.router.navigate(['/login']);
        localStorage.removeItem("user_info")
      }
    });
  }

}
