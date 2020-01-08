import {Filter} from '../../../model/utils/filter';
import {TrainingDefinitionStateEnum} from '../../../model/enums/training-definition-state.enum';
import {BehaviorSubject, Observable} from 'rxjs';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {TrainingDefinitionApi} from '../../api/training-definition-api.service';
import {TrainingDefinitionService} from './training-definition.service';
import {PaginatedResource} from '../../../model/table/other/paginated-resource';
import {RequestedPagination} from '../../../model/DTOs/other/requested-pagination';
import {switchMap, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {TrainingDefinition} from '../../../model/training/training-definition';
import {Kypo2Pagination} from '../../../model/table/other/kypo2-pagination';
import {environment} from '../../../../environments/environment';
import {AlertService} from '../../shared/alert.service';
import {AlertTypeEnum} from '../../../model/enums/alert-type.enum';

/**
 * Basic implementation of a layer between a component and an API service.
 * Can get training definitions and perform various operations to modify them
 */
@Injectable()
export class TrainingDefinitionConcreteService extends TrainingDefinitionService {
  constructor(
    private trainingDefinitionFacade: TrainingDefinitionApi,
    private alertService: AlertService,
    private errorHandler: ErrorHandlerService) {
    super();
  }

  private lastPagination: RequestedPagination;
  private lastFilters: string;

  private trainingDefinitionsSubject$: BehaviorSubject<PaginatedResource<TrainingDefinition[]>> = new BehaviorSubject(this.initSubject());
  /**
   * List of training definitions with currently selected pagination options
   */
  trainingDefinitions$: Observable<PaginatedResource<TrainingDefinition[]>> = this.trainingDefinitionsSubject$.asObservable();

  /**
   * Gets all training definitions with passed pagination and filter and updates related observables or handles an error
   * @param pagination requested pagination
   * @param filter filter to be applied on training definitions (attribute title)
   */
  getAll(pagination: RequestedPagination, filter: string): Observable<PaginatedResource<TrainingDefinition[]>> {
  this.lastPagination = pagination;
  this.lastFilters = filter;
  const filters = filter ? [new Filter('title', filter)] : [];
  this.hasErrorSubject$.next(false);
  this.isLoadingSubject$.next(true);
    return this.trainingDefinitionFacade
      .getAll(pagination, filters)
      .pipe(
        tap(
          paginatedTrainings => {
            this.trainingDefinitionsSubject$.next(paginatedTrainings);
            this.totalLengthSubject$.next(paginatedTrainings.pagination.totalElements);
            this.isLoadingSubject$.next(false);
          },
            err => {
            this.hasErrorSubject$.next(true);
            this.isLoadingSubject$.next(false);
            this.errorHandler.display(err, 'Fetching training definitions');
          })
      );
  }

  /**
   * Deletes training definition and informs about the result and updates list of training definitions or handles an error
   * @param trainingDefinitionId id of training definition to be deleted
   */
  delete(trainingDefinitionId: number): Observable<any> {
    return this.trainingDefinitionFacade
      .delete(trainingDefinitionId)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Training definition was successfully deleted'),
          err => this.errorHandler.display(err, 'Deleting training definition')),
        switchMap(_ => this.getAll(this.lastPagination, this.lastFilters))
      );
  }

  /**
   * Creates a clone of already existing training definition.
   * Informs about the result and updates list of training definitions or handles an error
   * @param trainingDefinitionId id of a training definition to clone
   * @param title new title of the cloned training definition
   */
  clone(trainingDefinitionId: number, title: string): Observable<any> {
    return this.trainingDefinitionFacade
      .clone(trainingDefinitionId, title)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Training definition was successfully cloned'),
          err => this.errorHandler.display(err, 'Cloning training definition')),
        switchMap(_ => this.getAll(this.lastPagination, this.lastFilters))
      );
  }

  /**
   * Downloads training definition description in JSON file, handles error if download fails
   * @param trainingDefinitionId id of a training definition to be downloaded
   */
  download(trainingDefinitionId: number): Observable<any> {
    return this.trainingDefinitionFacade.download(trainingDefinitionId)
      .pipe(
        tap({error: err => this.errorHandler.display(err, 'Downloading training definition')})
      );
  }

  /**
   * Creates a new training definition by uploading a training definition description JSON file.
   * Informs about the result and updates list of training definitions or handles an error
   * @param file
   */
  upload(file: File): Observable<any> {
    return this.trainingDefinitionFacade.upload(file)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Training definition was successfully created'),
          err => this.errorHandler.display(err, 'Creating training definition')),
        switchMap(_ => this.getAll(this.lastPagination, this.lastFilters))
      );
  }

  /**
   * Changes state of a selected training definition to a new one.
   * Informs about the result and updates list of training definitions or handles an error
   * @param trainingDefinitionId id of the training definition whose state shall be changed
   * @param newState new state of a training definition
   */
  changeState(trainingDefinitionId: number, newState: TrainingDefinitionStateEnum): Observable<any> {
    return this.trainingDefinitionFacade.changeState(trainingDefinitionId, newState)
      .pipe(
        tap(_ => this.onChangedState(trainingDefinitionId, newState),
          err => this.errorHandler.display(err, 'Changing training definition state'))
      );
  }

  private initSubject(): PaginatedResource<TrainingDefinition[]> {
    return new PaginatedResource([],
      new Kypo2Pagination(0, 0, environment.defaultPaginationSize, 0, 0 ));
  }

  private onChangedState(trainingDefinitionId: number, newState: TrainingDefinitionStateEnum) {
    const lastResources = this.trainingDefinitionsSubject$.getValue();
    const changedTd = lastResources.elements.find(td => td.id === trainingDefinitionId);
    const changedIndex = lastResources.elements.findIndex(td => td.id === trainingDefinitionId);
    if (changedTd && changedIndex !== -1) {
      changedTd.state = newState;
      lastResources.elements[changedIndex] = changedTd;
      this.trainingDefinitionsSubject$.next(lastResources);
    }
    this.alertService.emitAlert(AlertTypeEnum.Success, `Training definition state was changed to ${newState}`);
  }
}
