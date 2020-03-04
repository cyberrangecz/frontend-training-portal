import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map, takeWhile, tap} from 'rxjs/operators';
import {TrainingInstanceChangeEvent} from '../../../model/events/training-instance-change-event';
import {TrainingInstance} from '../../../model/training/training-instance';
import {TrainingInstanceEditService} from '../../../services/training-instance/edit/training-instance-edit.service';
import {BaseComponent} from '../../base.component';
import {environment} from '../../../../environments/environment';
import {TrainingInstanceEditControls} from './training-instance-edit-controls';
import {KypoControlItem} from 'kypo-controls';

/**
 * Main component of training instance edit/create page. Serves mainly as a smart component wrapper
 */
@Component({
  selector: 'kypo2-training-instance-edit-overview',
  templateUrl: './training-instance-edit-overview.component.html',
  styleUrls: ['./training-instance-edit-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingInstanceEditOverviewComponent extends BaseComponent implements OnInit {

  trainingInstance$: Observable<TrainingInstance>;
  editMode$: Observable<boolean>;
  tiTitle$: Observable<string>;
  canDeactivateOrganizers = true;
  canDeactivateTIEdit = true;
  defaultPaginationSize = environment.defaultPaginationSize;
  controls: KypoControlItem[];

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private editService: TrainingInstanceEditService) {
    super();
    this.trainingInstance$ = this.editService.trainingInstance$;
    this.tiTitle$ = this.editService.trainingInstance$.pipe(map(ti => ti.title));
    this.activeRoute.data
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe(data => this.editService.set(data.trainingInstance));

    this.editMode$ = this.editService.editMode$
      .pipe(
        tap(editMode => this.controls = TrainingInstanceEditControls.create(this.editService, editMode, this.editService.saveDisabled$))
      );

  }

  ngOnInit() {
  }

  /**
   * Shows dialog asking the user if he really wants to leave the page after refresh or navigating to another page
   */
  @HostListener('window:beforeunload')
  canRefreshOrLeave(): boolean {
    return this.canDeactivateTIEdit && this.canDeactivateOrganizers;
  }

  onControlsAction(control: KypoControlItem) {
    control.result$
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe(_ => {
      if (control.id === TrainingInstanceEditControls.SAVE_ACTION_ID || control.id === TrainingInstanceEditControls.SAVE_AND_STAY_ACTION_ID) {
        this.canDeactivateTIEdit = true;
      }
    });
  }

  /**
   * Determines if all changes in sub components are saved and user can navigate to different component
   * @returns true if saved all his changes, false otherwise
   */
  canDeactivate(): boolean {
    return this.canDeactivateTIEdit && this.canDeactivateOrganizers;
  }

  /**
   * Changes canDeactivate state of the component
   * @param hasUnsavedChanges true if organizers component has unsaved changes, false otherwise
   */
  onOrganizersChanged(hasUnsavedChanges: boolean) {
    this.canDeactivateOrganizers = !hasUnsavedChanges;
  }

  /**
   * Updates state of the training instance and changes canDeactivate state of the component
   * @param $event training instance change event, containing latest update of training instance and its validity
   */
  onTrainingInstanceChanged($event: TrainingInstanceChangeEvent) {
    this.editService.change($event);
    this.canDeactivateTIEdit = false;
  }
}
