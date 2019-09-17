import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {TrainingDefinition} from '../../../model/training/training-definition';
import {map, takeWhile} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {MatDialog} from '@angular/material/dialog';
import {UnsavedChangesDialogComponent} from '../../shared/unsaved-changes-dialog/unsaved-changes-dialog.component';
import {of} from 'rxjs/internal/observable/of';
import {BaseComponent} from '../../base.component';
import {TrainingDefinitionChangeEvent} from '../../../model/events/training-definition-change-event';
import {TrainingDefinitionEditService} from '../../../services/training-definition/training-definition-edit.service';
import {RouteFactory} from '../../../model/routes/route-factory';
import {AbstractLevel} from '../../../model/level/abstract-level';


@Component({
  selector: 'kypo2-training-definition-detail',
  templateUrl: './training-definition-edit-container.component.html',
  styleUrls: ['./training-definition-edit-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Main component of training definition. Servers mainly as a smart component wrapper and resolves id of a training specified in the URL.
 * Training definition with provided id is retrieved from the server and passed to child component
 */
export class TrainingDefinitionEditContainerComponent extends BaseComponent implements OnInit {

  trainingDefinition$: Observable<TrainingDefinition>;
  editMode$: Observable<boolean>;
  tdTitle$: Observable<string>;
  levelsCount = -1;
  saveDisabled$: Observable<boolean>;
  unsavedLevels: AbstractLevel[] = [];

  private canDeactivateTDEdit = true;

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private editService: TrainingDefinitionEditService,
              private dialog: MatDialog) {
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
    return this.canDeactivateTDEdit && this.unsavedLevels.length === 0;
  }

  /**
   * Determines if all changes in sub components are saved and user can navigate to different component
   * @returns {Observable<boolean>} true if saved all his changes or agreed with leaving without saving them, false otherwise
   */
  canDeactivate(): Observable<boolean> {
    if (!this.canDeactivateTDEdit || this.unsavedLevels.length > 0) {
      const dialogRef = this.dialog.open(UnsavedChangesDialogComponent, {
        data: {
          payload: ['Training definition or levels are not saved.'],
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

  onTrainingDefinitionChanged($event: TrainingDefinitionChangeEvent) {
    this.editService.trainingDefinitionChange($event);
    this.canDeactivateTDEdit = false;
  }

  onSave() {
    this.editService.save()
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe(event => {
       this.canDeactivateTDEdit = true;
      if (!event.editMode) {
          this.router.navigate([RouteFactory.toTrainingDefinitionOverview()]);
        }
    });
  }

  onSaveAndEditLevels() {
    this.editService.save()
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe(event => {
      this.canDeactivateTDEdit = true;
      this.router.navigate([RouteFactory.toTrainingDefinitionEdit(event.id)]);
    });
  }

  onUnsavedLevelsChanged(unsavedLevels: AbstractLevel[]) {
    this.unsavedLevels = unsavedLevels;
  }

  onLevelsCountChanged($event: number) {
    this.levelsCount = $event;
  }
}
