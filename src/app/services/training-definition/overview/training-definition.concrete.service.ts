import {KypoFilter} from 'kypo-common';
import {TrainingDefinitionStateEnum} from '../../../model/enums/training-definition-state.enum';
import {EMPTY, from, Observable} from 'rxjs';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {TrainingDefinitionApi} from '../../api/training-definition-api.service';
import {TrainingDefinitionService} from './training-definition.service';
import {KypoPaginatedResource} from 'kypo-common';
import {KypoRequestedPagination} from 'kypo-common';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {TrainingDefinition} from '../../../model/training/training-definition';
import {AlertService} from '../../shared/alert.service';
import {AlertTypeEnum} from '../../../model/enums/alert-type.enum';
import {
  CsirtMuConfirmationDialogComponent,
  CsirtMuConfirmationDialogConfig,
  CsirtMuDialogResultEnum
} from 'csirt-mu-common';
import {MatDialog} from '@angular/material/dialog';
import {CloneDialogComponent} from '../../../components/training-definition/training-definition-overview/clone-dialog/clone-dialog.component';
import {TrainingDefinitionUploadDialogComponent} from '../../../components/training-definition/training-definition-overview/training-definition-upload-dialog/training-definition-upload-dialog.component';
import {FileUploadProgressService} from '../../shared/file-upload-progress.service';
import {Router} from '@angular/router';
import {RouteFactory} from '../../../model/routes/route-factory';
import {environment} from '../../../../environments/environment';

/**
 * Basic implementation of a layer between a component and an API service.
 * Can get training definitions and perform various operations to modify them
 */
@Injectable()
export class TrainingDefinitionConcreteService extends TrainingDefinitionService {
  constructor(
    private api: TrainingDefinitionApi,
    private dialog: MatDialog,
    private router: Router,
    private alertService: AlertService,
    private fileUploadProgressService: FileUploadProgressService,
    private errorHandler: ErrorHandlerService) {
    super(environment.defaultPaginationSize);
  }

  private lastPagination: KypoRequestedPagination;
  private lastFilters: string;

  /**
   * Gets all training definitions with passed pagination and filter and updates related observables or handles an error
   * @param pagination requested pagination
   * @param filter filter to be applied on training definitions (attribute title)
   */
  getAll(pagination: KypoRequestedPagination, filter: string): Observable<KypoPaginatedResource<TrainingDefinition>> {
  this.lastPagination = pagination;
  this.lastFilters = filter;
  const filters = filter ? [new KypoFilter('title', filter)] : [];
  this.hasErrorSubject$.next(false);
  this.isLoadingSubject$.next(true);
  return this.callApiToGetAll(pagination, filters);
  }

  create(): Observable<any> {
    return from(this.router.navigate([RouteFactory.toNewTrainingDefinition()]));
  }

  edit(trainingDefinition: TrainingDefinition): Observable<any> {
    return from(this.router.navigate([RouteFactory.toTrainingDefinitionEdit(trainingDefinition.id)]));
  }

  preview(trainingDefinition: TrainingDefinition): Observable<any> {
    return from(this.router.navigate([RouteFactory.toTrainingDefinitionPreview(trainingDefinition.id)]));
  }

  /**
   * Displays dialog to delete training definition and informs about the result and optionally updates list of training definitions or handles an error
   * @param trainingDefinition training definition to be deleted
   */
  delete(trainingDefinition: TrainingDefinition): Observable<KypoPaginatedResource<TrainingDefinition>> {
    return this.displayDialogToDelete(trainingDefinition)
      .pipe(
        switchMap(result => result === CsirtMuDialogResultEnum.CONFIRMED
        ? this.callApiToDelete(trainingDefinition)
        : EMPTY)
      );
  }

  /**
   * Creates a clone of already existing training definition.
   * Informs about the result and updates list of training definitions or handles an error
   * @param trainingDefinition training definition to clone
   */
  clone(trainingDefinition: TrainingDefinition): Observable<KypoPaginatedResource<TrainingDefinition>> {
    return this.displayCloneDialog(trainingDefinition)
      .pipe(
        switchMap(title => title !== undefined
          ? this.callApiToClone(trainingDefinition, title)
          : EMPTY
        )
      );
  }

  /**
   * Downloads training definition description in JSON file, handles error if download fails
   * @param trainingDefinition training definition to be downloaded
   */
  download(trainingDefinition: TrainingDefinition): Observable<any> {
    return this.api.download(trainingDefinition.id)
      .pipe(
        tap({error: err => this.errorHandler.emit(err, 'Downloading training definition')})
      );
  }

  /**
   * Displays dialog to change state of a selected training definition to a new one.
   * Informs about the result and updates list of training definitions or handles an error
   * @param trainingDefinition training definition whose state shall be changed
   * @param newState new state of a training definition
   */
  changeState(trainingDefinition: TrainingDefinition, newState: TrainingDefinitionStateEnum): Observable<any> {
    return this.displayChangeStateDialog(trainingDefinition, newState)
      .pipe(
        switchMap(result => result === CsirtMuDialogResultEnum.CONFIRMED
          ? this.callApiToChangeState(trainingDefinition, newState)
          : EMPTY)
      );
  }

  /**
   * Creates a new training definition by uploading a training definition description JSON file.
   * Informs about the result and updates list of training definitions or handles an error
   */
  upload(): Observable<KypoPaginatedResource<TrainingDefinition>> {
    const dialogRef = this.dialog.open(TrainingDefinitionUploadDialogComponent);
    return dialogRef.componentInstance.onUpload$
      .pipe(
        take(1),
        tap(_ => this.fileUploadProgressService.start()),
        switchMap(file => this.api.upload(file)),
        tap(
          _ =>  {
            this.alertService.emitAlert(AlertTypeEnum.Success, 'Training definition was uploaded');
            this.fileUploadProgressService.finish();
            dialogRef.close();
          },
          err => {
            this.fileUploadProgressService.finish();
            this.errorHandler.emit(err, 'Uploading training definition');
          }
        ),
        switchMap(_ => this.getAll(this.lastPagination, this.lastFilters))
      );
  }

  private callApiToGetAll(pagination: KypoRequestedPagination, filters: KypoFilter[]): Observable<KypoPaginatedResource<TrainingDefinition>> {
    return this.api.getAll(pagination, filters)
      .pipe(
        tap(
          paginatedTrainings => {
            this.resourceSubject$.next(paginatedTrainings);
            this.isLoadingSubject$.next(false);
          },
          err => {
            this.hasErrorSubject$.next(true);
            this.isLoadingSubject$.next(false);
            this.errorHandler.emit(err, 'Fetching training definitions');
          })
      );
  }

  private displayDialogToDelete(trainingDefinition: TrainingDefinition): Observable<CsirtMuDialogResultEnum> {
    const dialogRef = this.dialog.open(CsirtMuConfirmationDialogComponent, {
      data: new CsirtMuConfirmationDialogConfig(
        'Delete Training Definition',
        `Do you want to delete training definition "${trainingDefinition.title}"?`,
        'Cancel',
        'Delete'
      )
    });
    return dialogRef.afterClosed();
  }

  private callApiToDelete(trainingDefinition: TrainingDefinition): Observable<KypoPaginatedResource<TrainingDefinition>> {
    return this.api.delete(trainingDefinition.id)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Training definition was deleted'),
          err => this.errorHandler.emit(err, 'Deleting training definition')),
        switchMap(_ => this.getAll(this.lastPagination, this.lastFilters))
      );
  }

  private displayCloneDialog(trainingDefinition: TrainingDefinition): Observable<string> {
    const dialogRef = this.dialog.open(CloneDialogComponent, {
      data: trainingDefinition
    });
    return dialogRef.afterClosed()
      .pipe(
        map(result => result && result.title ? result.title : undefined)
      );
  }

  private callApiToClone(trainingDefinition: TrainingDefinition, title: string): Observable<KypoPaginatedResource<TrainingDefinition>> {
    return this.api.clone(trainingDefinition.id, title)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Training definition was cloned'),
          err => this.errorHandler.emit(err, 'Cloning training definition')),
        switchMap(_ => this.getAll(this.lastPagination, this.lastFilters))
      );
  }

  private displayChangeStateDialog(trainingDefinition: TrainingDefinition, newState: TrainingDefinitionStateEnum): Observable<CsirtMuDialogResultEnum> {
    const dialogRef = this.dialog.open(CsirtMuConfirmationDialogComponent, {
      data: new CsirtMuConfirmationDialogConfig(
        'Training Definition State Change',
        `Do you want to change state of training definition from "${trainingDefinition.state}" to "${newState}"?`,
        'Cancel',
        'Change'
      )});
    return dialogRef.afterClosed();
  }

  private callApiToChangeState(trainingDefinition: TrainingDefinition, newState: TrainingDefinitionStateEnum): Observable<any> {
    return this.api.changeState(trainingDefinition.id, newState)
      .pipe(
        tap(_ => this.onChangedState(trainingDefinition.id, newState),
          err => this.errorHandler.emit(err, 'Changing training definition state'))
      );
  }

  private onChangedState(trainingDefinitionId: number, newState: TrainingDefinitionStateEnum) {
    const lastResources = this.resourceSubject$.getValue();
    const changedTd = lastResources.elements.find(td => td.id === trainingDefinitionId);
    const changedIndex = lastResources.elements.findIndex(td => td.id === trainingDefinitionId);
    if (changedTd && changedIndex !== -1) {
      changedTd.state = newState;
      lastResources.elements[changedIndex] = changedTd;
      this.resourceSubject$.next(lastResources);
    }
    this.alertService.emitAlert(AlertTypeEnum.Success, `Training definition state was changed to ${newState}`);
  }
}
