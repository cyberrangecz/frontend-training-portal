import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {TrainingDefinitionEditContainerComponent} from '../../components/training-definition/training-definition-edit-container/training-definition-edit-container.component';
import {Observable} from 'rxjs';

@Injectable()
/**
 * Checks if form for editing/creating TD is saved
 */
export class TrainingDefinitionLeaveGuard implements CanDeactivate<TrainingDefinitionEditContainerComponent> {

  canDeactivate(component: TrainingDefinitionEditContainerComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }
}
