import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LevelOverviewComponent} from '../../components/training-definition/level/level-overview/level-overview.component';
import {LEVELS_PATH} from '../../components/training-definition/training-definition-overview/paths';

@Injectable()
/**
 * Guard checking if all changes in levels were saved
 */
export class LevelEditLeaveGuard implements CanDeactivate<LevelOverviewComponent> {

  canDeactivate(component: LevelOverviewComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (nextState.url.includes(LEVELS_PATH)) {
      return true;
    }
    return component.canDeactivate();
  }
}
