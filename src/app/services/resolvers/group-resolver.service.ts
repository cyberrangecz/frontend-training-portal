import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {Kypo2GroupResolverHelperService} from 'kypo2-user-and-group-management';
import {Group} from 'kypo2-user-and-group-management/lib/model/group/group.model';
import {Injectable} from '@angular/core';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, mergeMap, take, tap} from 'rxjs/operators';
import {ADMIN_GROUP_PATH} from '../../paths';
import {ADMIN_GROUP_NEW_PATH} from '../../components/administration/admin-group/admin-group-detail/paths';

/**
 * Router data provider
 */
@Injectable()
export class GroupResolver implements Resolve<Group> {

  constructor(private groupResolveHelper: Kypo2GroupResolverHelperService,
              private router: Router,
              private errorHandler: ErrorHandlerService) {
  }

  /**
   * Retrieves a specific resource based on id provided in url. Navigates to a resource overview if no resource with such id exists.
   * @param route route snapshot
   * @param state router state snapshot
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Group> | Promise<Group> | Group {
    if (state.url.endsWith(`${ADMIN_GROUP_PATH}/${ADMIN_GROUP_NEW_PATH}`)) {
      return null;
    }
    if (route.paramMap.has('groupId')) {
      const id = Number(route.paramMap.get('groupId'));
      return this.groupResolveHelper.getById(id)
        .pipe(
          take(1),
          mergeMap(group => group ? of(group) : this.navigateToNew()),
          catchError(err => {
            this.errorHandler.display(err, 'Group resolver');
            this.navigateToNew();
            return EMPTY;
          })
        );
    }
    return this.navigateToNew();
  }

  private navigateToNew(): Observable<never> {
    this.router.navigate([ADMIN_GROUP_PATH, ADMIN_GROUP_NEW_PATH]);
    return EMPTY;
  }}
