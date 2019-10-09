import {ActivatedRoute, Data, PRIMARY_OUTLET} from '@angular/router';
import {combineLatest, Observable, of} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {Breadcrumb} from '../../model/breadcrumb/breadcrumb';
import {BREADCRUMB_PARAM_SELECTOR} from '../../paths';
/**
 *  Creates and displays breadcrumbs from static or dynamic (resolve) route data.
 *  Breadcrumb data must be of type string.
 *  Ignores all non-primary router outlets
 *  To prevent route from creating breadcrumb set breadcrumb in data to null.
 *
 *  EXAMPLE TO IGNORE:
 *  {
 *   path:
 *   loadChildren:
 *   data: { breadcrumb: null }
 *  },
 *
 *  EXAMPLE OF STATIC DATA:
 *  {
 *   path:
 *   loadChildren:
 *   data: { breadcrumb: 'Home' }
 *  },
 *
 * EXAMPLE OF DYNAMIC DATA:
 *  {
 *   path:
 *   loadChildren:
 *   resolve: { breadcrumb: MyBreadcrumbResolver }
 *  },
 */
export class BreadcrumbBuilderService {

  build(activeRoute: ActivatedRoute): Observable<Breadcrumb[]> {
    const result: Observable<Breadcrumb>[] = [];
    let currentRoute = activeRoute.root;
    let url = '';
    while (currentRoute.children.length > 0) {
      currentRoute.children.forEach(route => {
        currentRoute = route;
        const segmentUrl = route.snapshot.url.map(segment => segment.path).join('/');
        url += `/${segmentUrl}`;
        result.push(this.buildBreadcrumb(currentRoute, url));
      });
    }
    return combineLatest(result).pipe(
      take(1),
      map(breadcrumbs =>
        breadcrumbs.filter(breadcrumb => breadcrumb !== null))
    );
  }

  private buildBreadcrumb(route: ActivatedRoute, url: string): Observable<Breadcrumb> {
    if (!this.isPrimaryOutlet(route)) {
      return of(null);
    }
    if (this.hasBreadcrumbData(route.routeConfig.data)) {
      return this.createBreadcrumbFromStaticData(route, url);
    } else {
      return this.createBreadcrumbFromDynamicData(route, url);
    }
  }

  private createBreadcrumbFromStaticData(route: ActivatedRoute, url: string): Observable<Breadcrumb> {
    const label = route.routeConfig.data[BREADCRUMB_PARAM_SELECTOR];
    return label
      ? of(new Breadcrumb(route.routeConfig.data[BREADCRUMB_PARAM_SELECTOR], url))
      : of(null);
  }

  private hasBreadcrumbData(data: Data): boolean {
    return data && data.hasOwnProperty(BREADCRUMB_PARAM_SELECTOR);
  }

  private isPrimaryOutlet(route: ActivatedRoute): boolean {
    return route.outlet === PRIMARY_OUTLET;
  }

  private createBreadcrumbFromDynamicData(route: ActivatedRoute, url: string): Observable<Breadcrumb> {
    return route.data
      .pipe(
        map(routeData => {
          return this.hasBreadcrumbData(routeData)
            ? new Breadcrumb(routeData[BREADCRUMB_PARAM_SELECTOR], url)
            : null;
        }),
      );
  }
}
