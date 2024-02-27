import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from '../auth/services/login.service';
import { Router } from '@angular/router';
import { UserRole } from '../auth/models/token.model';
import { CategoriesService } from '../services/categories.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './mat-navigation.component.html',
  styleUrls: ['./mat-navigation.component.css']
})
export class MatNavigationComponent implements OnInit {

  _loginService: LoginService;
  _categoriesService: CategoriesService;
  UserRole = UserRole;
  categories: Category[] = []

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver, 
    private loginService: LoginService, 
    private router: Router,
    private categoriesService: CategoriesService
    ) {
    this._loginService = loginService;
    this._categoriesService = categoriesService;
  }

  ngOnInit(): void {
    console.log("Nav loaded");
    //this._loginService.isLoggedIn$.next(this._loginService.isLoggedIn);
    console.log("logged in: ", this._loginService.isLoggedIn);
    this.getCategories();
  }

  logOut() {
    this._loginService.logOut().subscribe({
      next: (response) => this._loginService.isLoggedIn = false,
      error: (err: Error) => console.error("Error logging out: ", err),
      complete: () => {
        console.log("Logout complete");
        this.router.navigate(['/login']);
        localStorage.removeItem("user_info");
      }
    });
  }

  navigateToLogIn() {
    this.router.navigate(['/auth/login']);
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (response: Category[]) => this.categories = response,
      error: (err: Error) => console.error("Error retrieving categories", err),
      complete: () => console.log("Categories retrieved successfuly")
    });
  }

}
