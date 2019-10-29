import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TrainingInstanceEditOverviewComponent} from '../../components/training-instance/training-instance-edit-overview/training-instance-edit-overview.component';

export class TrainingInstanceLeaveGuardService implements CanDeactivate<TrainingInstanceEditOverviewComponent> {
  canDeactivate(component: TrainingInstanceEditOverviewComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canDeactivate();
  }
}
