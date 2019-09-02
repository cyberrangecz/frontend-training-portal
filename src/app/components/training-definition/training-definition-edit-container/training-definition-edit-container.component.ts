import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {TrainingDefinition} from '../../../model/training/training-definition';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {TrainingDefinitionFacade} from '../../../services/facades/training-definition-facade.service';
import {Observable} from 'rxjs/internal/Observable';
import {TrainingDefinitionEditComponent} from './training-definition-edit/training-definition-edit.component';
import { MatDialog } from '@angular/material/dialog';
import {UnsavedChangesDialogComponent} from '../../shared/unsaved-changes-dialog/unsaved-changes-dialog.component';
import {of} from 'rxjs/internal/observable/of';
import {BaseComponent} from '../../base.component';
import {
  LEVELS_PATH,
  TRAINING_DEFINITION_EDIT_PATH,
  TRAINING_DEFINITION_NEW_PATH
} from '../training-definition-overview/paths';
import {TrainingDefinitionSaveEvent} from '../../../model/events/training-definition-save-event';


@Component({
  selector: 'kypo2-training-definition-detail',
  templateUrl: './training-definition-edit-container.component.html',
  styleUrls: ['./training-definition-edit-container.component.css']
})
/**
 * Main component of training definition. Servers mainly as a smart component wrapper and resolves id of a training specified in the URL.
 * Training definition with provided id is retrieved from the server and passed to child component
 */
export class TrainingDefinitionEditContainerComponent extends BaseComponent implements OnInit {

  @ViewChild(TrainingDefinitionEditComponent, { static: true }) trainingConfigurationComponent;

  trainingDefinition$: Observable<TrainingDefinition>;

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private dialog: MatDialog,
              private trainingDefinitionFacade: TrainingDefinitionFacade) {
    super();
    this.trainingDefinition$ = this.fetchTrainingDefinition();

  }

  ngOnInit() {
  }

  onSaved(event: TrainingDefinitionSaveEvent) {
    if (event.editMode && event.continueToLevels) {
      this.router.navigate([LEVELS_PATH], { relativeTo: this.activeRoute });
    } else if (event.editMode) {
      this.router.navigate(['./../../../'], { relativeTo: this.activeRoute });
    } else {
      this.router.navigate(['./../../', event.id, TRAINING_DEFINITION_EDIT_PATH, LEVELS_PATH], { relativeTo: this.activeRoute });
    }
  }

  /**
   * Shows dialog asking the user if he really wants to leave the page after refresh or navigating to another page
   */
  @HostListener('window:beforeunload')
  canRefreshOrLeave(): boolean {
    return this.trainingConfigurationComponent.canDeactivate();
  }

  /**
   * Determines if all changes in sub components are saved and user can navigate to different component
   * @returns {Observable<boolean>} true if saved all his changes or agreed with leaving without saving them, false otherwise
   */
  canDeactivate(): Observable<boolean> {
    const canDeactivate = this.trainingConfigurationComponent.canDeactivate();
    if (!canDeactivate) {
      const dialogRef = this.dialog.open(UnsavedChangesDialogComponent, {
        data: {
          payload: ['Training definition is not saved.'],
          saveOption: false
        },
      });
      return dialogRef.afterClosed()
        .pipe(
          map(result => result && result.type === 'confirm')
        );
    }
    return of(true);
  }


  private fetchTrainingDefinition(): Observable<TrainingDefinition> {
    if (this.router.routerState.snapshot.url.endsWith(TRAINING_DEFINITION_NEW_PATH)) {
      return of(null);
    }
    const trainingDefId = Number(this.activeRoute.snapshot.paramMap.get('id'));
    return this.trainingDefinitionFacade.getTrainingDefinitionById(trainingDefId);
  }
}
