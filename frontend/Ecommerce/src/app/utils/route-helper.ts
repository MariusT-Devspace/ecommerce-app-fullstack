import { ActivatedRouteSnapshot } from "@angular/router";

export function getDeepestRoute(activatedRoute: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    let route = activatedRoute;
    while (route.firstChild != undefined &&
        route.firstChild != null) {
        route = route.firstChild;
    }
    return route;
} 