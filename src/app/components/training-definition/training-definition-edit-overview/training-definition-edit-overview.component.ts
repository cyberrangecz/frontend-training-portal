import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {of} from 'rxjs/internal/observable/of';
import {map, takeWhile} from 'rxjs/operators';
import {ResourceSavedEvent} from '../../../model/events/resource-saved-event';
import {TrainingDefinitionChangeEvent} from '../../../model/events/training-definition-change-event';
import {AbstractLevel} from '../../../model/level/abstract-level';
import {RouteFactory} from '../../../model/routes/route-factory';
import {TrainingDefinition} from '../../../model/training/training-definition';
import {TrainingDefinitionEditService} from '../../../services/training-definition/training-definition-edit.service';
import {BaseComponent} from '../../base.component';
import {UnsavedChangesDialogComponent} from '../../shared/unsaved-changes-dialog/unsaved-changes-dialog.component';
import {environment} from '../../../../environments/environment';


@Component({
  selector: 'kypo2-training-definition-detail',
  templateUrl: './training-definition-edit-overview.component.html',
  styleUrls: ['./training-definition-edit-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Main component of training definition. Serves mainly as a smart component wrapper and resolves id of a training specified in the URL.
 * Training definition with provided id is retrieved from the server and passed to child component
 */
export class TrainingDefinitionEditOverviewComponent extends BaseComponent implements OnInit {

  trainingDefinition$: Observable<TrainingDefinition>;
  editMode$: Observable<boolean>;
  tdTitle$: Observable<string>;
  levelsCount = -1;
  saveDisabled$: Observable<boolean>;
  unsavedLevels: AbstractLevel[] = [];
  canDeactivateAuthors = true;
  canDeactivateTDEdit = true;
  defaultPaginationSize = environment.defaultPaginationSize;

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
    return this.canDeactivateTDEdit && this.canDeactivateAuthors  && this.unsavedLevels.length === 0;
  }

  /**
   * Determines if all changes in sub components are saved and user can navigate to different component
   * @returns {Observable<boolean>} true if saved all his changes or agreed with leaving without saving them, false otherwise
   */
  canDeactivate(): Observable<boolean> {
    if (!this.canDeactivateTDEdit || !this.canDeactivateAuthors || this.unsavedLevels.length > 0) {
      const dialogRef = this.dialog.open(UnsavedChangesDialogComponent, {
        data: {
          payload: ['Training definition, authors or levels are not saved.'],
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
    this.editService.change($event);
    this.canDeactivateTDEdit = false;
  }

  onSave(stayOnPage: boolean = false) {
    this.editService.save()
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe(event => this.onTrainingDefinitionSaved(event, stayOnPage));
  }

  onUnsavedLevelsChanged(unsavedLevels: AbstractLevel[]) {
    this.unsavedLevels = unsavedLevels;
  }

  onLevelsCountChanged($event: number) {
    this.levelsCount = $event;
  }

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
