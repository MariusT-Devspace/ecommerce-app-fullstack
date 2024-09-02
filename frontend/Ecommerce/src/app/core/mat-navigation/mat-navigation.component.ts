import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { LoginService } from '../auth/services/login.service';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { UserRole } from '../auth/models/token.model';
import { CategoriesService } from '../services/categories.service';
import { Category } from 'src/app/models/category.model';
import { TitleManagerService } from '../services/title-manager.service';
import { getDeepestRoute } from 'src/app/utils/route-helper';
import { ROUTES } from 'src/app/constants';

@Component({
  selector: 'app-navigation',
  templateUrl: './mat-navigation.component.html',
  styleUrls: ['./mat-navigation.component.sass']
})
export class MatNavigationComponent implements OnInit {
  UserRole = UserRole;
  categories: Category[] = [];
  isLoggedIn: boolean | undefined;
  userRole: UserRole | undefined;
  isCategoryRouteActive: WritableSignal<boolean> = signal(false);
  ROUTES = ROUTES;
  currentRoute?: ActivatedRouteSnapshot;

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
    ) { }

  ngOnInit(): void {
    // Check login status
    //this._loginService.isLoggedIn$.next(this._loginService.isLoggedIn);
    this.isLoggedIn = this.loginService.isLoggedIn;
    console.log("logged in: ", this.isLoggedIn);
    if (this.isLoggedIn)
      this.userRole = this.loginService.userRole
    
    // Set title of current route on first load
    this.currentRoute = getDeepestRoute(this.activatedRoute.snapshot);
    this.isCategoryRouteActive.set(this.currentRoute!.paramMap.has('category'));
    let urlSegments = this.currentRoute!.url;
    let urlSegmentsString: string[] = [];
    urlSegments.forEach(urlSegment => {
      urlSegmentsString.push(urlSegment.path);
    });
    this.setTitle(urlSegmentsString);

    // Set title on route change
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.urlAfterRedirects)).subscribe(
        (url: string) => {
          this.currentRoute = getDeepestRoute(this.activatedRoute.snapshot);
          this.isCategoryRouteActive.set(this.currentRoute.paramMap.has('category'));
          this.setTitle(url.split("/"));
          this.currentRoute = getDeepestRoute(this.activatedRoute.snapshot); 
        }
      )
    this.getCategories();
  }

  private setTitle(urlSegments: string[]) {
    let setTitle = (title: string | undefined) => {
      if (title !== undefined) {
        this.title.set(title);
        this.titleManagerService.setTitle(title);
      }
    }

    if (!this.currentRoute!.routeConfig?.title) {
      if (this.isCategoryRouteActive()) {
        this.categoriesService.getCategory(urlSegments[urlSegments.length - 1])
          .subscribe({
            next: (category: Category) => setTitle(category.name),
            error: (err: Error) => console.error("Could not retrieve category" + err.message),
            complete: () => console.log("Category retrieved")
          });
      } else {
        setTitle(this.getRouteTitle(urlSegments));
      }
    }
  }

  getRouteTitle(urlSegments: string[]): string | undefined {
    let routeKey = urlSegments[urlSegments.length - 1].toString() as keyof typeof this.ROUTES
    return this.ROUTES[routeKey]
            ? this.ROUTES[routeKey].title
            : ""
  }

  logOut() {
    this.loginService.logOut().subscribe({
      next: (response) => this.loginService.isLoggedIn = false,
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