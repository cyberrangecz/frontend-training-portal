import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {TrainingInstance} from '../../../../model/training/training-instance';
import {BaseComponent} from '../../../base.component';
import {ActivatedRoute, Router} from '@angular/router';
import {TrainingInstanceEditService} from '../../../../services/training-instance/training-instance-edit.service';
import {MatDialog} from '@angular/material/dialog';
import {map, takeWhile} from 'rxjs/operators';
import {UnsavedChangesDialogComponent} from '../../../shared/unsaved-changes-dialog/unsaved-changes-dialog.component';;
import {ResourceSavedEvent} from '../../../../model/events/resource-saved-event';
import {RouteFactory} from '../../../../model/routes/route-factory';
import {TrainingInstanceChangeEvent} from '../../../../model/events/training-instance-change-event';

@Component({
  selector: 'kypo2-training-instance-edit-overview',
  templateUrl: './training-instance-edit-overview.component.html',
  styleUrls: ['./training-instance-edit-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Main component of training definition. Serves mainly as a smart component wrapper and resolves id of a training specified in the URL.
 * Training instance with provided id is retrieved from the server and passed to child component
 */
export class TrainingInstanceEditOverviewComponent extends BaseComponent implements OnInit {

  trainingInstance$: Observable<TrainingInstance>;
  editMode$: Observable<boolean>;
  tiTitle$: Observable<string>;
  saveDisabled$: Observable<boolean>;
  canDeactivateOrganizers = true;

  private canDeactivateTIEdit = true;

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
   * @returns {Observable<boolean>} true if saved all his changes or agreed with leaving without saving them, false otherwise
   */
  canDeactivate(): Observable<boolean> {
    if (!this.canDeactivateTIEdit || !this.canDeactivateOrganizers) {
      const dialogRef = this.dialog.open(UnsavedChangesDialogComponent, {
        data: {
          payload: ['Training instance or organizers are not saved.'],
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

  onOrganizersChanged(hasUnsavedChanges: boolean) {
    this.canDeactivateOrganizers = !hasUnsavedChanges;
  }

  onTrainingInstanceChanged($event: TrainingInstanceChangeEvent) {
    this.editService.change($event);
    this.canDeactivateTIEdit = false;
  }

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
