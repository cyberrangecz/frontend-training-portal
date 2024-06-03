import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SentinelAuthService, User } from '@sentinel/auth';
import { SentinelBaseDirective } from '@sentinel/common';
import { AgendaContainer } from '@sentinel/layout';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NOTIFICATIONS_PATH } from './paths';
import { LoadingService } from './services/shared/loading.service';
import { NotificationService } from './services/shared/notification.service';
import { NavBuilder } from './utils/nav-builder';
import { KypoDynamicEnvironment } from 'environments/kypo-dynamic-environment';

/**
 * Main component serving as wrapper for layout and router outlet
 */
@Component({
  selector: 'kypo-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends SentinelBaseDirective implements OnInit, AfterViewInit {
  isLoading$: Observable<boolean>;
  activeUser$: Observable<User>;
  title$: Observable<string>;
  agendaContainers$: Observable<AgendaContainer[]>;
  notificationRoute = NOTIFICATIONS_PATH;
  version = 'v24.06';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private loadingService: LoadingService,
    private elementRef: ElementRef,
    private auth: SentinelAuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.activeUser$ = this.auth.activeUser$;
    this.title$ = this.getTitleFromRouter();
    this.agendaContainers$ = this.auth.activeUser$.pipe(
      filter((user) => user !== null && user !== undefined),
      map((user) => NavBuilder.build(user))
    );
    this.isLoading$ = this.loadingService.isLoading$;
    this.version = KypoDynamicEnvironment.getConfig().version;
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
      map((snapshot) => snapshot.data.title)
    );
  }

  onLogin(): void {
    this.auth.login();
  }

  onLogout(): void {
    this.auth.logout();
  }
}
