import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable} from 'rxjs';
import {
  ADMIN_GROUP_EDIT_PATH,
  ADMIN_GROUP_NEW_PATH
} from '../../components/administration/admin-group/admin-group-detail/paths';
import {map} from 'rxjs/operators';
import {Group} from 'kypo2-user-and-group-management/lib/model/group/group.model';
import {GroupResolver} from './group-resolver.service';

/**
 * Router breadcrumb title provider
 */
@Injectable()
export class GroupBreadcrumbResolver implements Resolve<string> {

  constructor(private groupResolver: GroupResolver) {
  }

  /**
   * Retrieves a breadcrumb title based on provided url
   * @param route route snapshot
   * @param state router state snapshot
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
    if (state.url.endsWith(ADMIN_GROUP_NEW_PATH)) {
      return 'Create';
    } else if (route.paramMap.has('groupId')) {
      const resolved =  this.groupResolver.resolve(route, state) as Observable<Group>;
       return resolved.pipe(
          map(group => group ? (this.getBreadcrumbFromGroup(group, state)) : '')
        );
    }
    return EMPTY;
  }

  private getBreadcrumbFromGroup(group: Group, state: RouterStateSnapshot): string {
    return state.url.includes(ADMIN_GROUP_EDIT_PATH)
      ? `Edit ${group.name}`
      : group.name;
  }
}
