import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SentinelAuthService, User } from '@sentinel/auth';
import { AgendaContainer } from '@sentinel/layout';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NOTIFICATIONS_PATH } from './paths';
import { LoadingService } from './services/shared/loading.service';
import { NavConfigFactory } from './utils/nav-config-factory';
import { PortalDynamicEnvironment } from 'environments/portal-dynamic-environment';
import packagejson from '../../package.json';
import { NavBuilder } from '@crczp/theme';

/**
 * Main component serving as wrapper for layout and router outlet
 */
@Component({
    selector: 'crczp-app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
    isLoading$: Observable<boolean>;
    activeUser$: Observable<User>;
    title$: Observable<string>;
    subtitle$: Observable<string>;
    agendaContainers$: Observable<AgendaContainer[]>;
    notificationRoute = NOTIFICATIONS_PATH;
    version: string;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private loadingService: LoadingService,
        private auth: SentinelAuthService,
    ) {}

    ngOnInit(): void {
        this.activeUser$ = this.auth.activeUser$;
        this.title$ = this.getTitleFromRouter();
        this.subtitle$ = this.getSubtitleFromRouter();
        this.agendaContainers$ = this.auth.activeUser$.pipe(
            filter((user) => user !== null && user !== undefined),
            map((user) => NavBuilder.buildNav(NavConfigFactory.buildNavConfig(user))),
        );
        this.isLoading$ = this.loadingService.isLoading$; // <-- causes angular error
        this.version = PortalDynamicEnvironment.getConfig().version || packagejson.version;
    }

    ngAfterViewInit(): void {
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe();
    }

    private getTitleFromRouter(): Observable<string> {
        return this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            map(() => {
                let route = this.activatedRoute;
                while (route.firstChild) {
                    route = route.firstChild;
                }
                return route;
            }),
            filter((route) => route.outlet === 'primary'),
            map((route) => route.snapshot),
            map((snapshot) => snapshot.data.title),
        );
    }

    private getSubtitleFromRouter(): Observable<string> {
        return this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            map(() => {
                let route = this.activatedRoute;
                while (route.firstChild) {
                    route = route.firstChild;
                }
                return route;
            }),
            filter((route) => route.outlet === 'primary'),
            map((route) => route.snapshot),
            map((snapshot) => snapshot.data.subtitle),
        );
    }

    onLogin(): void {
        this.auth.login();
    }

    onLogout(): void {
        this.auth.logout();
    }
}
