import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { LoginService } from '../auth/services/login.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UserRole } from '../auth/models/token.model';
import { CategoriesService } from '../services/categories.service';
import { Category } from 'src/app/models/category.model';
import { TitleManagerService } from '../services/title-manager.service';
import { getDeepestRoute } from 'src/app/utils/route-helper';

@Component({
  selector: 'app-navigation',
  templateUrl: './mat-navigation.component.html',
  styleUrls: ['./mat-navigation.component.css']
})
export class MatNavigationComponent implements OnInit {

  _loginService: LoginService;
  _categoriesService: CategoriesService;
  _activatedRoute: ActivatedRoute;
  _titleManagerService: TitleManagerService;
  UserRole = UserRole;
  categories: Category[] = [];


  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  title: WritableSignal<string> = signal('');

  constructor(
    private breakpointObserver: BreakpointObserver, 
    private loginService: LoginService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService,
    private titleManagerService: TitleManagerService
    ) {
    this._loginService = loginService;
    this._categoriesService = categoriesService;
    this._activatedRoute = activatedRoute;
    this._titleManagerService = titleManagerService;
  }

  ngOnInit(): void {
    console.log("Nav loaded");
    //this._loginService.isLoggedIn$.next(this._loginService.isLoggedIn);
    console.log("logged in: ", this._loginService.isLoggedIn);

    // Set title of current route on first load
    if (this._activatedRoute.snapshot.firstChild !== null &&
      this._activatedRoute.snapshot.firstChild !== undefined) {
        let route = getDeepestRoute(
          this._activatedRoute.snapshot.firstChild
        );
        if (!route.routeConfig?.title)
          this.setTitle(route.url.toString());
      }
      

    // Set title on route change
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.urlAfterRedirects)).subscribe(
        (url: string) => {
          this.setTitle(url.split("/")[url.split("/").length - 1]);
        }
      )
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

  setTitle(title: string) {
    const titleUppercase = title.slice(0, 1).toUpperCase() + title.slice(1);
    this.title.set(titleUppercase);
    this._titleManagerService.setTitle(titleUppercase);
  }
}

