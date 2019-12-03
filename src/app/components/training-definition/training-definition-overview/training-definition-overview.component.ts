import { StringNormalizer } from './../../../model/utils/ignore-diacritics-filter';
import { TrainingDefinitionStateEnum } from './../../../model/enums/training-definition-state.enum';
import { AlertTypeEnum } from './../../../model/enums/alert-type.enum';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '../../../services/shared/alert.service';
import { Observable, BehaviorSubject } from 'rxjs';
import {Kypo2Table, TableActionEvent, LoadTableEvent, RequestedPagination} from 'kypo2-table';
import { TrainingDefinitionService } from '../../../services/shared/training-definition.service';
import { takeWhile, take } from 'rxjs/operators';
import { TrainingDefinitionTableRow } from '../../../model/table-adapters/training-definition-table-row';
import { CloneDialogComponent } from './clone-dialog/clone-dialog.component';
import { ActionConfirmationDialogComponent } from '../../shared/action-confirmation-dialog/action-confirmation-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import {
  TRAINING_DEFINITION_PREVIEW_PATH,
  TRAINING_DEFINITION_EDIT_PATH,
  TRAINING_DEFINITION_NEW_PATH
} from './paths';
import { StateChangeDialogComponent } from './state-change-dialog/state-change-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Filter } from '../../../model/utils/filter';
import { TrainingDefinitionUploadDialogComponent } from './training-definition-upload-dialog/training-definition-upload-dialog.component';
import {environment} from '../../../../environments/environment';

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

  isInErrorState = false;
  private isLoadingSubject = new BehaviorSubject(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();
  trainingDefinitions$: Observable<Kypo2Table<TrainingDefinitionTableRow>>;
  trainingDefinitionsTotalLength = 0;
  private lastLoadEvent: LoadTableEvent;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private alertService: AlertService,
    private trainingDefinitionService: TrainingDefinitionService
  ) {
    super();
  }

  ngOnInit() {
    this.trainingDefinitions$ = this.trainingDefinitionService.trainingDefinitions$;
    const initialPagination = new RequestedPagination(0, environment.defaultPaginationSize, '', '');
    this.lastLoadEvent = new LoadTableEvent(initialPagination, null);
    this.onLoadEvent(this.lastLoadEvent);
  }

  onLoadEvent(loadEvent: LoadTableEvent) {
    this.lastLoadEvent = loadEvent;
    this.fetchData(loadEvent);
  }

  fetchData(event) {
    this.lastLoadEvent = event;
    let trainingDefinitions;
    this.isInErrorState = false;
    const filter = event.filter
      ? [
        new Filter(
          'title',
          event.filter
        )
      ]
      : [];
    if (event.pagination) {
      trainingDefinitions = this.trainingDefinitionService.getAll(
        filter,
        event.pagination
      );
    } else {
      trainingDefinitions = this.trainingDefinitionService.getAll(filter);
    }
    trainingDefinitions.pipe(takeWhile(_ => this.isAlive)).subscribe(
      paginatedDefinitions => {
        this.trainingDefinitionsTotalLength =
          paginatedDefinitions.pagination.totalElements;
      },
      err => (this.isInErrorState = true)
    );
  }

  onTrainingDefinitionTableAction(
    event: TableActionEvent<TrainingDefinitionTableRow>
  ) {
    switch (event.action.label.toLocaleLowerCase()) {
      case 'clone':
        this.openCloneDialog(event.element);
        break;
      case 'download':
        this.downloadTrainingDefinition(event.element);
        break;
      case 'preview':
        this.previewTrainingDefinition(event.element);
        break;
      case 'edit':
        this.editTrainingDefinition(event.element);
        break;
      case 'delete':
        this.deleteTrainingDefinition(event.element);
        break;
      case 'release':
        this.changeTrainingDefinitionState(
          TrainingDefinitionStateEnum.Released,
          event.element
        );
        break;
      case 'unrelease':
        this.changeTrainingDefinitionState(
          TrainingDefinitionStateEnum.Unreleased,
          event.element
        );
        break;
      case 'archive':
        this.changeTrainingDefinitionState(
          TrainingDefinitionStateEnum.Archived,
          event.element
        );
        break;
    }
  }

  /**
   * Displays dialog window to clone a training definition and creates alert with a result of creation
   */
  openCloneDialog(trainingDefinition: TrainingDefinitionTableRow) {
    const dialogRef = this.dialog.open(CloneDialogComponent, {
      data: trainingDefinition
    });
    dialogRef
      .afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => {
        if (result && result.type === 'confirm') {
          this.sendRequestToCloneTrainingDefinition(
            trainingDefinition.id,
            result.title
          );
        }
      });
  }

  /**
   * Removes training definition data object from data source and sends request to delete the sandbox in database
   * @param {TrainingDefinitionTableRow} trainingRow sandbox definition data row which should be deleted
   */
  deleteTrainingDefinition(trainingRow: TrainingDefinitionTableRow) {
    const dialogRef = this.dialog.open(ActionConfirmationDialogComponent, {
      data: {
        type: 'Training Definition',
        action: 'delete',
        title: trainingRow.title
      }
    });
    dialogRef
      .afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => {
        if (result && result.type === 'confirm') {
          this.sendRequestToDeleteTrainingDefinition(trainingRow.id);
        }
      });
  }

  downloadTrainingDefinition(trainingRow: TrainingDefinitionTableRow) {
    const errorStatus = 406;
    this.trainingDefinitionService
      .download(trainingRow.id)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        resp => { },
        err => {
          if (err.status === errorStatus) {
            this.alertService.emitAlert(
              AlertTypeEnum.Error,
              'Training definition could not be downloaded'
            );
          }
        }
      );
  }

  /**
   * Navigates to training sub route with parameters indicating editing of an existing training definition
   * @param {number} id id of a training definition which should be edited
   */
  editTrainingDefinition(trainingRow: TrainingDefinitionTableRow) {
    this.router.navigate([trainingRow.id, TRAINING_DEFINITION_EDIT_PATH], {
      relativeTo: this.activatedRoute
    });
  }

  previewTrainingDefinition(trainingRow: TrainingDefinitionTableRow) {
    this.router.navigate([trainingRow.id, TRAINING_DEFINITION_PREVIEW_PATH], {
      relativeTo: this.activatedRoute
    });
  }

  changeTrainingDefinitionState(
    newState: TrainingDefinitionStateEnum,
    trainingRow: TrainingDefinitionTableRow
  ) {
    const dialogRef = this.dialog.open(StateChangeDialogComponent, {
      data: {
        fromState: trainingRow.state,
        toState: newState
      }
    });

    dialogRef
      .afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result =>
        this.onChangeTrainingStateDialog(newState, trainingRow, result)
      );
  }

  private onChangeTrainingStateDialog(
    newState: TrainingDefinitionStateEnum,
    row: TrainingDefinitionTableRow,
    result
  ) {
    if (result && result.type === 'confirm') {
      this.sendChangeTrainingDefinitionStateRequest(newState, row);
    }
  }

  private sendChangeTrainingDefinitionStateRequest(
    newState: TrainingDefinitionStateEnum,
    row: TrainingDefinitionTableRow
  ) {
    this.isLoadingSubject.next(true);
    this.trainingDefinitionService
      .changeState(newState, row.id)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        resp =>
          this.onTrainingDefinitionStateChangeConfirmedByServer(newState, row),
        err => this.onTrainingDefinitionStateChangeDeniedByServer(row, err)
      );
  }

  private onTrainingDefinitionStateChangeConfirmedByServer(
    newState: TrainingDefinitionStateEnum,
    row: TrainingDefinitionTableRow
  ) {
    this.isLoadingSubject.next(false);
    row.state = newState;
    this.fetchData(this.lastLoadEvent);
  }

  private onTrainingDefinitionStateChangeDeniedByServer(
    row: TrainingDefinitionTableRow,
    err: HttpErrorResponse
  ) {
    this.isLoadingSubject.next(false);
    this.fetchData(this.lastLoadEvent);
  }

  private sendRequestToDeleteTrainingDefinition(trainingDefId: number) {
    this.trainingDefinitionService
      .delete(trainingDefId)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(resp => {
        this.alertService.emitAlert(
          AlertTypeEnum.Success,
          'Training Definition was successfully deleted.'
        );
        this.fetchData(this.lastLoadEvent);
      });
  }

  private sendRequestToCloneTrainingDefinition(id: number, title: string) {
    this.trainingDefinitionService
      .clone(id, title)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(resp => {
        this.alertService.emitAlert(
          AlertTypeEnum.Success,
          'Training was successfully cloned.'
        );
        this.fetchData(this.lastLoadEvent);
      });
  }

  /**
   * Navigates to training sub route with parameters indicating creation of a new training definition
   */
  newTrainingDefinition() {
    this.router.navigate([TRAINING_DEFINITION_NEW_PATH], {
      relativeTo: this.activatedRoute
    });
  }

  /**
   * Displays dialog window to upload a file with training definition and creates alert with a result of the upload
   */
  uploadTrainingDefinition() {
    const dialogRef = this.dialog.open(
      TrainingDefinitionUploadDialogComponent,
      {
        data: {
          title: 'Upload Training Definition',
          type: 'training'
        }
      }
    );

    dialogRef.componentInstance.onUploadLoading.pipe(take(1)).subscribe((data) => {
      if (data) {
        this.trainingDefinitionService
          .upload(data.file)
          .pipe(takeWhile(() => this.isAlive))
          .subscribe(() => {
            data.uploadInProgress.next(false);
            this.alertService.emitAlert(
              AlertTypeEnum.Success,
              'Training definition was successfully uploaded.'
            );
            dialogRef.close();
            this.fetchData(this.lastLoadEvent);
          });
      }
    });
  }

  onActionPanelEvent(event) {
    switch (event) {
      case 'create':
        this.newTrainingDefinition();
        break;
      case 'upload':
        this.uploadTrainingDefinition();
        break;
    }
  }
}
