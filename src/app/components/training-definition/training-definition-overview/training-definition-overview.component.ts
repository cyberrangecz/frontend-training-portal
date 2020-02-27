import {TrainingDefinitionStateEnum} from '../../../model/enums/training-definition-state.enum';
import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../base.component';
import {MatDialog} from '@angular/material/dialog';
import {EMPTY, Observable} from 'rxjs';
import {Kypo2Table, LoadTableEvent, RequestedPagination, TableActionEvent} from 'kypo2-table';
import {TrainingDefinitionService} from '../../../services/training-definition/overview/training-definition.service';
import {map, switchMap, take, takeWhile, tap} from 'rxjs/operators';
import {CloneDialogComponent} from './clone-dialog/clone-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {TrainingDefinitionUploadDialogComponent} from './training-definition-upload-dialog/training-definition-upload-dialog.component';
import {environment} from '../../../../environments/environment';
import {RouteFactory} from '../../../model/routes/route-factory';
import {TrainingDefinition} from '../../../model/training/training-definition';
import {TrainingDefinitionTableCreator} from '../../../model/table/factory/training-definition-table-creator';
import {FileUploadProgressService} from '../../../services/shared/file-upload-progress.service';
import {
  CsirtMuConfirmationDialogComponent,
  CsirtMuConfirmationDialogConfig,
  CsirtMuDialogResultEnum
} from 'csirt-mu-layout';

/**
 * Main smart component of training definition overview
 */
@Component({
  selector: 'kypo2-trainining-definition-overview',
  templateUrl: './training-definition-overview.component.html',
  styleUrls: ['./training-definition-overview.component.css']
})
export class TrainingDefinitionOverviewComponent extends BaseComponent
  implements OnInit {

  readonly INIT_SORT_NAME = 'lastEdited';
  readonly INIT_SORT_DIR = 'desc';

  trainingDefinitions$: Observable<Kypo2Table<TrainingDefinition>>;
  hasError$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private fileUploadProgressService: FileUploadProgressService,
    private trainingDefinitionService: TrainingDefinitionService) {
    super();
  }

  ngOnInit() {
    this.initTable();
  }

  /**
   * Gets new data for table
   * @param loadEvent event emitted by table component to get new data
   */
  onLoadEvent(loadEvent: LoadTableEvent) {
    this.trainingDefinitionService.getAll(loadEvent.pagination, loadEvent.filter)
      .pipe(
        takeWhile(_ => this.isAlive)
      )
      .subscribe();
  }

  /**
   * Resolves controls action and calls appropriate handler
   * @param action type of action emitted by controls component
   */
  onControlsAction(action: 'create' | 'upload') {
    switch (action) {
      case 'create':
        this.newTrainingDefinition();
        break;
      case 'upload':
        this.uploadTrainingDefinition();
        break;
    }
  }

  /**
   * Resolves type of emitted event and calls appropriate handler
   * @param event action event emitted from table component
   */
  onTrainingDefinitionTableAction(event: TableActionEvent<TrainingDefinition>) {
    switch (event.action.id) {
      case TrainingDefinitionTableCreator.CLONE_ACTION_ID:
        this.openCloneDialog(event.element);
        break;
      case TrainingDefinitionTableCreator.DOWNLOAD_ACTION_ID:
        this.downloadTrainingDefinition(event.element);
        break;
      case TrainingDefinitionTableCreator.PREVIEW_ACTION_ID:
        this.previewTrainingDefinition(event.element);
        break;
      case TrainingDefinitionTableCreator.EDIT_ACTION_ID:
        this.editTrainingDefinition(event.element);
        break;
      case TrainingDefinitionTableCreator.DELETE_ACTION_ID:
        this.deleteTrainingDefinition(event.element);
        break;
      case TrainingDefinitionTableCreator.RELEASE_ACTION_ID:
        this.changeTrainingDefinitionState(TrainingDefinitionStateEnum.Released, event.element);
        break;
      case TrainingDefinitionTableCreator.UNRELEASE_ACTION_ID:
        this.changeTrainingDefinitionState(TrainingDefinitionStateEnum.Unreleased, event.element);
        break;
      case TrainingDefinitionTableCreator.ARCHIVE_ACTION_ID:
        this.changeTrainingDefinitionState(TrainingDefinitionStateEnum.Archived, event.element);
        break;
    }
  }

  /**
   * Displays dialog window to clone a training definition and if confirmed, calls service to clone
   * @param trainingDefinition training definition to clone
   */
  private openCloneDialog(trainingDefinition: TrainingDefinition) {
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

  /**
   * Displays dialog window to confirm deleting training definition, if confirmed, calls service to delete training definition
   * @param trainingDefinition training definition to delete
   */
  private deleteTrainingDefinition(trainingDefinition: TrainingDefinition) {
    const dialogRef = this.dialog.open(CsirtMuConfirmationDialogComponent, {
      data: new CsirtMuConfirmationDialogConfig(
        'Delete Training Definition',
        `Do you want to delete training definition "${trainingDefinition.title}"?`,
        'Cancel',
        'Delete'
      )
    });

    dialogRef.afterClosed()
      .pipe(
        takeWhile(() => this.isAlive),
        switchMap(result => result === CsirtMuDialogResultEnum.CONFIRMED
        ? this.trainingDefinitionService.delete(trainingDefinition.id)
        : EMPTY)
      )
      .subscribe();
  }

  /**
   * Calls service to download selected training definition
   * @param trainingDefinition training definition to download
   */
  private downloadTrainingDefinition(trainingDefinition: TrainingDefinition) {
    this.trainingDefinitionService.download(trainingDefinition.id)
      .pipe(
        takeWhile(() => this.isAlive)
      )
      .subscribe();
  }

  /**
   * Navigates to training definition edit page
   * @param trainingDefinition raining definition to be edited
   */
  private editTrainingDefinition(trainingDefinition: TrainingDefinition) {
    this.router.navigate([RouteFactory.toTrainingDefinitionEdit(trainingDefinition.id)]);
  }

  /**
   * Navigates to training definition preview page
   * @param trainingDefinition training definition to preview
   */
  private previewTrainingDefinition(trainingDefinition: TrainingDefinition) {
    this.router.navigate([RouteFactory.toTrainingDefinitionPreview(trainingDefinition.id)]);
  }

  /**
   * Opens state change confirmation dialog, if confirmed, calls service to change state of the training definition
   * @param newState state to be set
   * @param trainingDefinition training definition which state should be changed
   */
  changeTrainingDefinitionState(newState: TrainingDefinitionStateEnum, trainingDefinition: TrainingDefinition) {
    const dialogRef = this.dialog.open(CsirtMuConfirmationDialogComponent, {
      data: new CsirtMuConfirmationDialogConfig(
        'Training Definition State Change',
      `Do you want to change state of training definition from "${trainingDefinition.state}" to "${newState}"?`,
        'Cancel',
        'Change'
    )});

    dialogRef.afterClosed()
      .pipe(
        takeWhile(() => this.isAlive),
        switchMap(result => result === CsirtMuDialogResultEnum.CONFIRMED
          ? this.trainingDefinitionService.changeState(trainingDefinition.id, newState)
          : EMPTY)
      )
      .subscribe();
  }

  /**
   * Navigates to new training definition page
   */
  private newTrainingDefinition() {
    this.router.navigate([RouteFactory.toNewTrainingDefinition()]);
  }

  /**
   * Opens dialog window to upload training definition, calls service to upload with selected file
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
        tap(_ => this.fileUploadProgressService.start()),
        switchMap(file => this.trainingDefinitionService.upload(file))
      ).subscribe(
        _ =>  {
          this.fileUploadProgressService.finish();
          dialogRef.close();
          },
        _ => this.fileUploadProgressService.finish()
    );
  }

  private initTable() {
    this.hasError$ = this.trainingDefinitionService.hasError$;
    this.isLoading$ = this.trainingDefinitionService.isLoading$;
    this.trainingDefinitions$ = this.trainingDefinitionService.resource$
      .pipe(
        map(tds => TrainingDefinitionTableCreator.create(tds))
      );

    const initialPagination = new RequestedPagination(0, environment.defaultPaginationSize, this.INIT_SORT_NAME, this.INIT_SORT_DIR);
    this.onLoadEvent(new LoadTableEvent(initialPagination, null));
  }
}
