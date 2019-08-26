import { Component, OnInit } from '@angular/core';
import {BREADCRUMB_PARAM_SELECTOR, HOME_PATH} from '../../../paths';
import {ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router} from '@angular/router';
import {takeWhile} from 'rxjs/operators';
import {BaseComponent} from '../../base.component';
import {Breadcrumb} from '../../../model/breadcrumb/breadcrumb';

@Component({
  selector: 'kypo2-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent extends BaseComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];
  HOME_PATH = HOME_PATH;

  constructor(private router: Router,
              private activeRoute: ActivatedRoute) {
    super();
    this.subscribeNavigationEvents();
  }

  ngOnInit() {
  }

  private subscribeNavigationEvents() {
    this.router.events
      .pipe(
        takeWhile(_ => this.isAlive)
      )
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.buildBreadcrumbs();
        }
      });
  }

  private buildBreadcrumbs() {
    this.breadcrumbs = [];
    let currentRoute = this.activeRoute.root;
    let url = '';
    while (currentRoute.children.length > 0) {
      currentRoute.children.forEach(route => {
        currentRoute = route;
        if (route.outlet !== PRIMARY_OUTLET) {
          return;
        }
        if (this.hasLabel(route)) {
          const routeURL: string = route.snapshot.url.map(segment => segment.path).join('/');
          url += `/${routeURL}`;

          this.breadcrumbs.push(new Breadcrumb(
            route.routeConfig.data[BREADCRUMB_PARAM_SELECTOR],
            url
          ));
        }
      });
    }
  }

  private hasLabel(route: ActivatedRoute): boolean {
    return route.routeConfig && route.routeConfig.data && route.routeConfig.data[BREADCRUMB_PARAM_SELECTOR];
  }
}
