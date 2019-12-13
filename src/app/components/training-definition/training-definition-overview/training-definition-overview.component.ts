import { TrainingDefinitionStateEnum } from './../../../model/enums/training-definition-state.enum';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { MatDialog } from '@angular/material/dialog';
import {Observable, EMPTY} from 'rxjs';
import {Kypo2Table, TableActionEvent, LoadTableEvent, RequestedPagination} from 'kypo2-table';
import { TrainingDefinitionService } from '../../../services/shared/training-definition.service';
import {takeWhile, take, map, switchMap, tap} from 'rxjs/operators';
import { CloneDialogComponent } from './clone-dialog/clone-dialog.component';
import { ActionConfirmationDialogComponent } from '../../shared/action-confirmation-dialog/action-confirmation-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { StateChangeDialogComponent } from './state-change-dialog/state-change-dialog.component';
import { TrainingDefinitionUploadDialogComponent } from './training-definition-upload-dialog/training-definition-upload-dialog.component';
import {environment} from '../../../../environments/environment';
import {RouteFactory} from '../../../model/routes/route-factory';
import {TrainingDefinition} from '../../../model/training/training-definition';
import {TrainingDefinitionTableCreator} from '../../../model/table/factory/training-definition-table-creator';
import {UploadFileEvent} from '../../../model/events/upload-file-event';

@Component({
  selector: 'kypo2-trainining-definition-overview',
  templateUrl: './training-definition-overview.component.html',
  styleUrls: ['./training-definition-overview.component.css']
})
/**
 * Main component of designer overview. Serves mainly as a wrapper for smaller components
 */
export class TrainingDefinitionOverviewComponent extends BaseComponent
  implements OnInit {

  readonly INIT_SORT_NAME = 'lastEdited';
  readonly INIT_SORT_DIR = 'desc';

  trainingDefinitions$: Observable<Kypo2Table<TrainingDefinition>>;
  totalLength$: Observable<number>;
  hasError$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private trainingDefinitionService: TrainingDefinitionService) {
    super();
  }

  ngOnInit() {
    this.initTable();
  }

  onLoadEvent(loadEvent: LoadTableEvent) {
    this.trainingDefinitionService.getAll(loadEvent.pagination, loadEvent.filter)
      .pipe(
        takeWhile(_ => this.isAlive)
      )
      .subscribe();
  }

  onControlsAction(action: string) {
    switch (action) {
      case 'create':
        this.newTrainingDefinition();
        break;
      case 'upload':
        this.uploadTrainingDefinition();
        break;
    }
  }

  onTrainingDefinitionTableAction(event: TableActionEvent<TrainingDefinition>) {
    switch (event.action.label) {
      case TrainingDefinitionTableCreator.CLONE_ACTION:
        this.openCloneDialog(event.element);
        break;
      case TrainingDefinitionTableCreator.DOWNLOAD_ACTION:
        this.downloadTrainingDefinition(event.element);
        break;
      case TrainingDefinitionTableCreator.PREVIEW_ACTION:
        this.previewTrainingDefinition(event.element);
        break;
      case TrainingDefinitionTableCreator.EDIT_ACTION:
        this.editTrainingDefinition(event.element);
        break;
      case TrainingDefinitionTableCreator.DELETE_ACTION:
        this.deleteTrainingDefinition(event.element);
        break;
      case TrainingDefinitionTableCreator.RELEASE_ACTION:
        this.changeTrainingDefinitionState(TrainingDefinitionStateEnum.Released, event.element);
        break;
      case TrainingDefinitionTableCreator.UNRELEASE_ACTION:
        this.changeTrainingDefinitionState(TrainingDefinitionStateEnum.Unreleased, event.element);
        break;
      case TrainingDefinitionTableCreator.ARCHIVE_ACTION:
        this.changeTrainingDefinitionState(TrainingDefinitionStateEnum.Archived, event.element);
        break;
    }
  }

  /**
   * Displays dialog window to clone a training definition and creates alert with a result of creation
   */
  openCloneDialog(trainingDefinition: TrainingDefinition) {
    const dialogRef = this.dialog.open(CloneDialogComponent, {
      data: trainingDefinition
    });
    dialogRef
      .afterClosed()
      .pipe(
        takeWhile(() => this.isAlive),
        switchMap(result => result && result.type === 'confirm'
        ? this.trainingDefinitionService.clone(trainingDefinition.id, result.title)
        : EMPTY)
      ).subscribe();
  }

  deleteTrainingDefinition(trainingRow: TrainingDefinition) {
    const dialogRef = this.dialog.open(ActionConfirmationDialogComponent, {
      data: {
        type: 'Training Definition',
        action: 'delete',
        title: trainingRow.title
      }
    });

    dialogRef.afterClosed()
      .pipe(
        takeWhile(() => this.isAlive),
        switchMap(result => result && result.type === 'confirm'
        ? this.trainingDefinitionService.delete(trainingRow.id)
        : EMPTY)
      )
      .subscribe();
  }

  downloadTrainingDefinition(trainingRow: TrainingDefinition) {
    this.trainingDefinitionService.download(trainingRow.id)
      .pipe(
        takeWhile(() => this.isAlive)
      )
      .subscribe();
  }

  /**
   * Navigates to training sub route with parameters indicating editing of an existing training definition
   * @param {number} id id of a training definition which should be edited
   */
  editTrainingDefinition(trainingRow: TrainingDefinition) {
    this.router.navigate([RouteFactory.toTrainingDefinitionEdit(trainingRow.id)]);
  }

  previewTrainingDefinition(trainingRow: TrainingDefinition) {
    this.router.navigate([RouteFactory.toTrainingDefinitionPreview(trainingRow.id)]);
  }

  changeTrainingDefinitionState(newState: TrainingDefinitionStateEnum, trainingRow: TrainingDefinition) {
    const dialogRef = this.dialog.open(StateChangeDialogComponent, {
      data: {
        fromState: trainingRow.state,
        toState: newState
      }
    });

    dialogRef.afterClosed()
      .pipe(
        takeWhile(() => this.isAlive),
        switchMap(result => result && result.type === 'confirm'
          ? this.trainingDefinitionService.changeState(newState, trainingRow.id)
          : EMPTY)
      )
      .subscribe();
  }

  /**
   * Navigates to training sub route with parameters indicating creation of a new training definition
   */
  private newTrainingDefinition() {
    this.router.navigate([RouteFactory.toNewTrainingDefinition()]);
  }

  /**
   * Displays dialog window to upload a file with training definition and creates alert with a result of the upload
   */
  private uploadTrainingDefinition() {
    const dialogRef = this.dialog.open(
      TrainingDefinitionUploadDialogComponent,
      {
        data: {
          title: 'Upload Training Definition',
          type: 'training'
        }
      }
    );

    dialogRef.componentInstance.onUpload
      .pipe(
        take(1),
        switchMap(event => this.controlFileUpload(event))
      ).subscribe(_ => dialogRef.close());
  }

  private controlFileUpload(event: UploadFileEvent): Observable<any> {
    return this.trainingDefinitionService.upload(event.file)
      .pipe(
        tap( _ => event.uploadInProgress.next(false),
          _ => event.uploadInProgress.next(false)
        )
      );
  }

  private initTable() {
    this.totalLength$ = this.trainingDefinitionService.totalLength$;
    this.hasError$ = this.trainingDefinitionService.hasError$;
    this.isLoading$ = this.trainingDefinitionService.isLoading$;
    this.trainingDefinitions$ = this.trainingDefinitionService.trainingDefinitions$
      .pipe(
        map(tds => TrainingDefinitionTableCreator.create(tds))
      );

    const initialPagination = new RequestedPagination(0, environment.defaultPaginationSize, this.INIT_SORT_NAME, this.INIT_SORT_DIR);
    this.onLoadEvent(new LoadTableEvent(initialPagination, null));
  }
}
