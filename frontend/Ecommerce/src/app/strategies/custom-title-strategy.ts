import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterStateSnapshot, TitleStrategy } from "@angular/router";
import { TitleManagerService } from "../core/services/title-manager.service";
import { getDeepestRoute } from "../utils/route-helper";

@Injectable({providedIn: 'root'})
export class CustomTitleStrategy extends TitleStrategy {
    private readonly titlePrefix = "Online Store |"
    private readonly defaultTitle = "Online Store"

    constructor(
        private readonly titleService: Title,
        private readonly titleManagerService: TitleManagerService
    ) {
        super();
        titleManagerService.title$.subscribe((title) => {
                this.titleService.setTitle(`${this.titlePrefix} ${title}`)
            }
        )
    }

    override updateTitle(snapshot: RouterStateSnapshot): void {
        const title = this.buildTitle(snapshot);
        if (title !== undefined) {
            this.titleManagerService.setTitle(`${title}`);
        }
    }

    override buildTitle(snapshot: RouterStateSnapshot): string | undefined {
        let route = getDeepestRoute(snapshot.root)
            return route.routeConfig?.title?.toString();
    }

}