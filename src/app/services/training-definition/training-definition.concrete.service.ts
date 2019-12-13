import {Filter} from './../../model/utils/filter';
import {TrainingDefinitionStateEnum} from './../../model/enums/training-definition-state.enum';
import {BehaviorSubject, Observable} from 'rxjs';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {TrainingDefinitionFacade} from '../facades/training-definition-facade.service';
import {TrainingDefinitionService} from '../shared/training-definition.service';
import {PaginatedResource} from '../../model/table/other/paginated-resource';
import {RequestedPagination} from '../../model/DTOs/other/requested-pagination';
import {switchMap, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {TrainingDefinition} from '../../model/training/training-definition';
import {Kypo2Pagination} from '../../model/table/other/kypo2-pagination';
import {environment} from '../../../environments/environment';
import {AlertService} from '../shared/alert.service';
import {AlertTypeEnum} from '../../model/enums/alert-type.enum';

@Injectable()
export class TrainingDefinitionConcreteService extends TrainingDefinitionService {
  constructor(
    private trainingDefinitionFacade: TrainingDefinitionFacade,
    private alertService: AlertService,
    private errorHandler: ErrorHandlerService) {
    super();
  }

  private lastPagination: RequestedPagination;
  private lastFilters: string;

  private trainingDefinitionsSubject: BehaviorSubject<PaginatedResource<TrainingDefinition[]>> = new BehaviorSubject(this.initSubject());
  trainingDefinitions$: Observable<PaginatedResource<TrainingDefinition[]>> = this.trainingDefinitionsSubject.asObservable();

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
          trainings => {
            this.trainingDefinitionsSubject.next(trainings);
            this.isLoadingSubject$.next(false);
          },
            err => {
            this.hasErrorSubject$.next(true);
            this.isLoadingSubject$.next(false);
            this.errorHandler.display(err, 'Fetching training definitions');
          })
      );
  }

  create(result: TrainingDefinition): Observable<any> {
    return this.trainingDefinitionFacade.create(result)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Training definition was successfully created'),
            err => this.errorHandler.display(err, 'Creating training definition')),
        switchMap(_ => this.getAll(this.lastPagination, this.lastFilters))
      );
  }

  delete(id: number): Observable<any> {
    return this.trainingDefinitionFacade
      .delete(id)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Training definition was successfully deleted'),
          err => this.errorHandler.display(err, 'Deleting training definition')),
        switchMap(_ => this.getAll(this.lastPagination, this.lastFilters))
      );
  }

  clone(trainingDefId: number, title: string): Observable<any> {
    return this.trainingDefinitionFacade
      .clone(trainingDefId, title)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Training definition was successfully cloned'),
          err => this.errorHandler.display(err, 'Cloning training definition')),
        switchMap(_ => this.getAll(this.lastPagination, this.lastFilters))
      );
  }

  download(trainingDefId: number): Observable<any> {
    return this.trainingDefinitionFacade.download(trainingDefId)
      .pipe(
        tap({error: err => this.errorHandler.display(err, 'Downloading training definition')})
      );
  }

  upload(file: File): Observable<any> {
    return this.trainingDefinitionFacade.upload(file)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Training definition was successfully created'),
          err => this.errorHandler.display(err, 'Creating training definition')),
        switchMap(_ => this.getAll(this.lastPagination, this.lastFilters))
      );
  }

  changeState(newState: TrainingDefinitionStateEnum, trainingDefId: number): Observable<any> {
    return this.trainingDefinitionFacade.changeState(newState, trainingDefId)
      .pipe(
        tap(_ => this.onChangedState(newState, trainingDefId),
          err => this.errorHandler.display(err, 'Changing training definition state'))
      );
  }

  private initSubject(): PaginatedResource<TrainingDefinition[]> {
    return new PaginatedResource([],
      new Kypo2Pagination(0, 0, environment.defaultPaginationSize, 0, 0 ));
  }

  private onChangedState(newState: TrainingDefinitionStateEnum, trainingDefId: number) {
    const lastResources = this.trainingDefinitionsSubject.getValue();
    const changedTd = lastResources.elements.find(td => td.id === trainingDefId);
    const changedIndex = lastResources.elements.findIndex(td => td.id === trainingDefId);
    if (changedTd && changedIndex !== -1) {
      changedTd.state = newState;
      lastResources.elements[changedIndex] = changedTd;
      this.trainingDefinitionsSubject.next(lastResources);
    }
    this.alertService.emitAlert(AlertTypeEnum.Success, `Training definition state was changed to ${newState}`)
  }
}
