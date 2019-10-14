import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {TrainingDefinitionEditOverviewComponent} from '../../components/training-definition/training-definition-edit-overview/training-definition-edit-overview.component';

@Injectable()
/**
 * Checks if form for editing/creating TD is saved
 */
export class TrainingDefinitionLeaveGuard implements CanDeactivate<TrainingDefinitionEditOverviewComponent> {

  canDeactivate(component: TrainingDefinitionEditOverviewComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }
}
