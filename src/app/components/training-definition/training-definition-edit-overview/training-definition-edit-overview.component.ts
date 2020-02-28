import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {map, takeWhile} from 'rxjs/operators';
import {ResourceSavedEvent} from '../../../model/events/resource-saved-event';
import {TrainingDefinitionChangeEvent} from '../../../model/events/training-definition-change-event';
import {Level} from '../../../model/level/level';
import {RouteFactory} from '../../../model/routes/route-factory';
import {TrainingDefinition} from '../../../model/training/training-definition';
import {TrainingDefinitionEditService} from '../../../services/training-definition/edit/training-definition-edit.service';
import {BaseComponent} from '../../base.component';
import {environment} from '../../../../environments/environment';

/**
 * Main smart component of training definition edit/new page.
 */
@Component({
  selector: 'kypo2-training-definition-detail',
  templateUrl: './training-definition-edit-overview.component.html',
  styleUrls: ['./training-definition-edit-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingDefinitionEditOverviewComponent extends BaseComponent implements OnInit {

  trainingDefinition$: Observable<TrainingDefinition>;
  editMode$: Observable<boolean>;
  tdTitle$: Observable<string>;
  levelsCount = -1;
  saveDisabled$: Observable<boolean>;
  unsavedLevels: Level[] = [];
  canDeactivateAuthors = true;
  canDeactivateTDEdit = true;
  defaultPaginationSize = environment.defaultPaginationSize;

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private editService: TrainingDefinitionEditService) {
    super();
    this.trainingDefinition$ = this.editService.trainingDefinition$;
    this.editMode$ = this.editService.editMode$;
    this.tdTitle$ = this.editService.trainingDefinition$.pipe(map(td => td.title));
    this.saveDisabled$ = this.editService.saveDisabled$;
    this.activeRoute.data
      .pipe(
        takeWhile(_ => this.isAlive),
      ).subscribe(data => this.editService.set(data.trainingDefinition));
  }

  ngOnInit() {
  }

  /**
   * Shows dialog asking the user if he really wants to leave the page after refresh or navigating to another page
   */
  @HostListener('window:beforeunload')
  canRefreshOrLeave(): boolean {
    return this.canDeactivateTDEdit && this.canDeactivateAuthors  && this.unsavedLevels.length === 0;
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

  /**
   * Calls service to save training definition state
   * @param stayOnPage true if on successful save, user should remain on the page, false if he or she should be navigated back to overview page
   */
  onSave(stayOnPage: boolean = false) {
    this.editService.save()
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe(event => this.onTrainingDefinitionSaved(event, stayOnPage));
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

  private onTrainingDefinitionSaved(event: ResourceSavedEvent, stayOnPage: boolean = false) {
    this.canDeactivateTDEdit = true;
    if (event.editMode) {
      return;
    }
    if (!stayOnPage) {
      this.router.navigate([RouteFactory.toTrainingDefinitionOverview()]);
    }
    if (stayOnPage && !event.editMode) {
      this.router.navigate([RouteFactory.toTrainingDefinitionEdit(event.id)]);
    }
  }

}
