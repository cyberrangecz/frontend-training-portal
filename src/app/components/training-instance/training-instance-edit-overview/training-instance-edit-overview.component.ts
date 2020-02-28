import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map, takeWhile} from 'rxjs/operators';
import {ResourceSavedEvent} from '../../../model/events/resource-saved-event';
import {TrainingInstanceChangeEvent} from '../../../model/events/training-instance-change-event';
import {RouteFactory} from '../../../model/routes/route-factory';
import {TrainingInstance} from '../../../model/training/training-instance';
import {TrainingInstanceEditService} from '../../../services/training-instance/edit/training-instance-edit.service';
import {BaseComponent} from '../../base.component';
import {environment} from '../../../../environments/environment';

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
  saveDisabled$: Observable<boolean>;
  canDeactivateOrganizers = true;
  canDeactivateTIEdit = true;
  defaultPaginationSize = environment.defaultPaginationSize;

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private editService: TrainingInstanceEditService,
              private dialog: MatDialog) {
    super();
    this.trainingInstance$ = this.editService.trainingInstance$;
    this.editMode$ = this.editService.editMode$;
    this.tiTitle$ = this.editService.trainingInstance$.pipe(map(ti => ti.title));
    this.saveDisabled$ = this.editService.saveDisabled$;
    this.activeRoute.data
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe(data => this.editService.set(data.trainingInstance));
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

  /**
   * Calls service to save the edited training instance
   * @param stayOnPage true if user should stay on the same page after saving, false if he or she should be navigated to the overview
   */
  onSave(stayOnPage: boolean = false) {
    this.editService.save()
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe(event => this.onTrainingInstanceSaved(event, stayOnPage));
  }

  private onTrainingInstanceSaved(event: ResourceSavedEvent, stayOnPage: boolean = false) {
    this.canDeactivateTIEdit = true;
    if (event.editMode) {
      return;
    }
    if (!stayOnPage) {
      this.router.navigate([RouteFactory.toTrainingInstanceOverview()]);
    }
    if (stayOnPage && !event.editMode) {
      this.router.navigate([RouteFactory.toTrainingInstanceEdit(event.id)]);
    }
  }
}
