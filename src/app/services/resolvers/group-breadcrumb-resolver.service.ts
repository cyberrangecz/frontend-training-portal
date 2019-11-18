import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Kypo2GroupResolverHelperService} from 'kypo2-user-and-group-management';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {EMPTY, Observable, of} from 'rxjs';
import {ADMIN_GROUP_NEW_PATH} from '../../components/administration/admin-group/admin-group-detail/paths';
import {catchError, mergeMap, take} from 'rxjs/operators';

@Injectable()
export class GroupBreadcrumbResolver implements Resolve<string> {

  constructor(private groupResolveHelper: Kypo2GroupResolverHelperService,
              private errorHandler: ErrorHandlerService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
    if (state.url.endsWith(ADMIN_GROUP_NEW_PATH)) {
      return 'Add';
    } else if (route.paramMap.has('groupId')) {
      const id = Number(route.paramMap.get('groupId'));
      return this.groupResolveHelper.getById(id)
        .pipe(
          take(1),
          mergeMap(group => group ? of(group.name) : EMPTY),
          catchError( (err) => {
            this.errorHandler.display(err, 'Group breadcrumbs resolver');
            return EMPTY;
          })
        );
    }
    return EMPTY;
  }
}
