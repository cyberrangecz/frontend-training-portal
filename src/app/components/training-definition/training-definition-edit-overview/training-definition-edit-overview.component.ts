import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {map, takeWhile, tap} from 'rxjs/operators';
import {TrainingDefinitionChangeEvent} from '../../../model/events/training-definition-change-event';
import {Level} from '../../../model/level/level';
import {TrainingDefinition} from '../../../model/training/training-definition';
import {TrainingDefinitionEditService} from '../../../services/training-definition/edit/training-definition-edit.service';
import {KypoBaseComponent} from 'kypo-common';
import {environment} from '../../../../environments/environment';
import {TrainingDefinitionEditControls} from './training-definition-edit-controls';
import {KypoControlItem} from 'kypo-controls';

/**
 * Main smart component of training definition edit/new page.
 */
@Component({
  selector: 'kypo2-training-definition-detail',
  templateUrl: './training-definition-edit-overview.component.html',
  styleUrls: ['./training-definition-edit-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingDefinitionEditOverviewComponent extends KypoBaseComponent implements OnInit {

  trainingDefinition$: Observable<TrainingDefinition>;
  editMode$: Observable<boolean>;
  tdTitle$: Observable<string>;
  levelsCount = -1;
  saveDisabled$: Observable<boolean>;
  unsavedLevels: Level[] = [];
  canDeactivateAuthors = true;
  canDeactivateTDEdit = true;
  defaultPaginationSize = environment.defaultPaginationSize;
  controls: KypoControlItem[];

  constructor(private activeRoute: ActivatedRoute,
              private editService: TrainingDefinitionEditService) {
    super();
    this.trainingDefinition$ = this.editService.trainingDefinition$;
    this.tdTitle$ = this.editService.trainingDefinition$.pipe(map(td => td.title));
    this.saveDisabled$ = this.editService.saveDisabled$;
    this.activeRoute.data
      .pipe(
        takeWhile(_ => this.isAlive),
      ).subscribe(data => this.editService.set(data.trainingDefinition));
    this.editMode$ = this.editService.editMode$.pipe(
      tap(isEditMode => this.controls = TrainingDefinitionEditControls.create(this.editService, isEditMode, this.saveDisabled$))
    );
  }

  ngOnInit() {
  }

  /**
   * Shows dialog asking the user if he really wants to leave the page after refresh or navigating to another page
   */
  @HostListener('window:beforeunload')
  canRefreshOrLeave(): boolean {
    return this.canDeactivate();
  }

  /**
   * Determines if all changes in sub components are saved and user can navigate to different page
   */
  canDeactivate(): boolean {
    return this.canDeactivateTDEdit && this.canDeactivateAuthors && this.unsavedLevels.length <= 0;
  }

  /**
   * Passes state of edited training definition to service and changes state of the component (canDeactivate)
   * @param $event training definition change event containing validity and new state
   */
  onTrainingDefinitionChanged($event: TrainingDefinitionChangeEvent) {
    this.editService.change($event);
    this.canDeactivateTDEdit = false;
  }

  onControlsAction(control: KypoControlItem) {
    control.result$
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe(_ => this.canDeactivateTDEdit = true);
  }

  /**
   * Changes state of the component when one of the levels is saved
   * @param unsavedLevels unsaved levels emitted from child component
   */
  onUnsavedLevelsChanged(unsavedLevels: Level[]) {
    this.unsavedLevels = unsavedLevels;
  }

  /**
   * Changes state of the component when level is added or deleted
   * @param count new count of levels
   */
  onLevelsCountChanged(count: number) {
    this.levelsCount = count;
  }

  /**
   * Changes state of the component when authors of the training definition are changed
   * @param hasUnsavedChanges true if the child component has unsaved, false otherwise
   */
  onAuthorsChanged(hasUnsavedChanges: boolean) {
    this.canDeactivateAuthors = !hasUnsavedChanges;
  }
}
