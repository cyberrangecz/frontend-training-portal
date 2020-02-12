import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AdminGroupDetailWrapperComponent} from '../../components/administration/admin-group/admin-group-detail/admin-group-detail-wrapper/admin-group-detail-wrapper.component';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

/**
 * Route guard determining if navigation outside of group edit page should proceed
 */
@Injectable()
export class GroupEditCanDeactivate implements CanDeactivate<AdminGroupDetailWrapperComponent> {

  canDeactivate(component: AdminGroupDetailWrapperComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.groupEditOverviewComponent.canDeactivate();
  }
}
