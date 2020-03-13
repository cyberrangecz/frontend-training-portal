import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {TrainingDefinitionEditOverviewComponent} from '../../components/training-definition/training-definition-edit-overview/training-definition-edit-overview.component';
import {
  CsirtMuConfirmationDialogComponent,
  CsirtMuConfirmationDialogConfig,
  CsirtMuDialogResultEnum
} from 'csirt-mu-common';
import {MatDialog} from '@angular/material/dialog';
import {map} from 'rxjs/operators';

@Injectable()
/**
 * Route guard determining if navigation outside of training definition edit page should proceed
 */
export class TrainingDefinitionCanDeactivate implements CanDeactivate<TrainingDefinitionEditOverviewComponent> {

  constructor(private dialog: MatDialog) {
  }

  canDeactivate(component: TrainingDefinitionEditOverviewComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (component.canDeactivate()) {
      return true;
    }
    const dialogRef = this.dialog.open(CsirtMuConfirmationDialogComponent, {
      data: new CsirtMuConfirmationDialogConfig(
        'Unsaved Changes',
        'There are unsaved changes in training definition, authors or levels. Do you really want to leave without saving?',
        'Cancel',
        'Leave'
      )
    });
    return dialogRef.afterClosed()
      .pipe(
        map(result => result === CsirtMuDialogResultEnum.CONFIRMED)
      );
  }
}
